import { Ability } from "./types/Ability";
import { Item } from "./types/Item";
import { Move } from "./types/Move";
import { Pokemon } from "./types/Pokemon";
import { Trainer } from "./types/Trainer";

export function isNull(o: Pokemon | Move | Trainer | Ability | Item | undefined): boolean {
    return !o || o.name === "";
}

export function negativeMod(n: number, m: number) {
    return ((n % m) + m) % m;
}

export class NTreeNode<T> {
    private parent: NTreeNode<T> | null;
    private children: NTreeNode<T>[];
    private data: T;

    constructor(data: T) {
        this.parent = null;
        this.children = [];
        this.data = data;
    }

    getData(): T {
        return this.data;
    }

    isRoot(): boolean {
        return this.parent == null;
    }

    isLeaf(): boolean {
        return this.children.length == 0
    }

    getParent(): NTreeNode<T> | null {
        return this.parent
    }

    hasChildren(): boolean {
        return this.children.length > 0;
    }

    addChild(data: T): NTreeNode<T> {
        const node = new NTreeNode<T>(data);
        node.parent = this;

        this.children.push(node);
        return node;
    }

    depthFirst(fn: (depth: number, node: NTreeNode<T>) => void, depth: number = 0) {
        fn(depth, this);
        this.children.forEach(x => x.depthFirst(fn, depth + 1));
    }

    findDepthFirst(fn: (node: NTreeNode<T>) => boolean): NTreeNode<T> | null {
        if (fn(this)) {
            return this;
        }

        for (const child of this.children) {
            const result = child.findDepthFirst(fn);
            if (result != null) {
                return result;
            }
        }

        return null;
    }

    ascendParents(fn: (node: NTreeNode<T>) => void) {
        let node: NTreeNode<T> | null = this;
        while (node != null) {
            fn(node)
            node = node.parent;
        }
    }

    asBreadthFist(): NTreeNode<T>[][] {
        const levels: NTreeNode<T>[][] = [];
        this.depthFirst((depth, node) => {
            while (levels.length <= depth) {
                levels.push([]);
            }

            levels[depth].push(node)
        })

        return levels;
    }
}
