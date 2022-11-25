export interface IFrameDataConfig {
    games: Array<IFDGameConfig>;
}

export interface IFDGameConfig {
    name: string;
    code: string;
    characters: Array<IFDCharacterConfig>;
}

export interface IFDCharacterConfig {
    name: string;
    code: string;
}