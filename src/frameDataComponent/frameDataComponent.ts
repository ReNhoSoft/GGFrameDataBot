import { FDLoaderJson } from "./frameDataLoader.js";
import { FDTypes } from "./types.js"
export class FrameDataComponent {
    private frameData: Map<string, FDTypes.Game>;
    constructor() {
        this.frameData = FDLoaderJson.loadGamesFromConfig("./data/");
    }

    getGame(game:string): FDTypes.Game {
        return this.frameData.get(game);
    }
    getCharacter(game: string, character:string): FDTypes.Character {
        return this.getGame(game)?.characters.get(character);
    }
    getMove(game:string, character:string, moveName: string): FDTypes.Move {
        return this.getCharacter(game, character)?.moveList.get(moveName);
    }
}

/**
 * Component used to load and store frame data. 
 * The requests are only loaded in memory once
 * they've been requested, and not before 
 * (lazy loading)
 */
export class LazyFrameDataComponent {
    private frameData: Map<string, FDTypes.Game>;

    getGame(game:string) {
        if(!this.frameData) {
            //this.frameData = FrameDataLoader.discoverGames();
        }
        if(!this.frameData.has(game)) {
            return null;
        }
        
        return this.frameData.get(game);
    }
}