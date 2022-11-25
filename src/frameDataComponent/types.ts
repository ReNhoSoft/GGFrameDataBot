export namespace FDTypes {
    export class Game {
        name: string;
        code: string;
        details;
        characters: Map<string, Character>;
        constructor(name: string, code: string = "") {
            this.name = name;
            this.code = code;
            this.characters = new Map<string, Character>();
        }

        scanCharacters(input: string, limit: number = 5) {
            let charNames = Array.from(this.characters.keys());
            let result = new Array<string>();
            for (let i = 0; result.length < limit && i < charNames.length; i++) {
                if (charNames[i].includes(input)) {
                    result.push(charNames[i]);
                }
            }
            return result;
        }
    }

    export class Character {
        game: Game;
        name: string;
        code: string;
        moveList: Map<string, Move> = new Map<string, Move>();
        constructor(game: Game, name: string, code: string) {
            this.game = game;
            this.name = name;
            this.code = code;
        }

        scanMovelist(input: string, limit: number = 5) {
            let searchString = input.toLowerCase();
            let moveNames = Array.from(this.moveList.keys());

            let result = new Array<string>();
            for (let i = 0; result.length < limit && i < moveNames.length; i++) {
                if (moveNames[i].toLowerCase().includes(searchString) 
                    || this.moveList.get(moveNames[i]).properties.get("input")?.toLowerCase().includes(searchString)
                    || this.moveList.get(moveNames[i]).properties.get("aliases")?.toLowerCase().includes(searchString)) {
                    result.push(moveNames[i]);
                }
            }
            return result;
        }
    }

    export class Move {
        character: Character;
        name: string;
        code: string;
        properties: Map<string, string> = new Map<string, string>();
        constructor(character: Character, name: string, code:string, properties?: Map<string, string>) {
            this.character = character;
            this.name = name;
            this.properties = properties;
            this.code = code ? code : name;
        }
    }

    export class MoveProperty {
        constructor(public name:string,public  value: string) {
        }
    }
}