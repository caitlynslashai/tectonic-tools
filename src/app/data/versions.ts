import currentVersion from "public/data/currentversion.json";
import versions from "public/data/versions.json";

export const version = currentVersion.version;

type IndexMap = Record<string, number>;

export interface VersionMap {
    indices: {
        pokemon: IndexMap;
        ability: IndexMap;
        item: IndexMap;
        move: IndexMap;
        types: IndexMap;
    };
    keys: {
        pokemon: string[];
        ability: string[];
        item: string[];
        move: string[];
        types: string[];
    };
}

export const versionMaps = versions as Record<string, VersionMap>;
