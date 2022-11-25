import { FDTypes } from "./types.js";
import * as fs from "fs"
import { IFrameDataConfig } from "./frameDataConfigInterface.js";

export class FDLoaderJson {
    static readConfigFile(configDataPath:string ): Map<string, FDTypes.Game>{
        let config = <IFrameDataConfig>JSON.parse(fs.readFileSync(configDataPath + "FDConfig.json", {encoding:"utf-8"}));
        let result = new Map<string, FDTypes.Game>();
        config.games.forEach((g) => {
            let game = new FDTypes.Game(g.name, g.code);
            g.characters.forEach((c) => {
                game.characters.set(c.code, new FDTypes.Character(game, c.name, c.code));
            });
            result.set(g.code, game);
        });
        return result;
    }

    static loadGamesFromConfig(dataPath: string) {
        let games = this.readConfigFile(dataPath);
        games.forEach(game => {
            game.characters.forEach(character => {
                character.moveList = this.loadMoveList(character, dataPath + game.code + "/" + character.code + ".json");
            });
        });
        return games;
    }   

    static loadMoveList(character:FDTypes.Character, filePath: string): Map<string, FDTypes.Move> {
        let result = new Map<string, FDTypes.Move>();
        var moveListJSON = JSON.parse(fs.readFileSync(filePath, "utf8"));
        let moves = Object.keys(moveListJSON);
        for( var i = 0; i < moves.length; i++ ) {
            let moveJSON = moveListJSON[moves[i]];
            let moveProperties = new Map<string, string>();
            let properties = Object.keys(moveJSON);
            for(var j = 0; j < properties.length; j++)
            {
                let propValue = moveJSON[properties[j]];
                propValue = (propValue == null || propValue == '') ? "N/A" : propValue;
                moveProperties.set(properties[j], propValue);
            }
            let move = new FDTypes.Move(character, moveJSON["name"], moveJSON["code"], moveProperties);
            result.set(move.name, move);
        }
        return result;
    }
}