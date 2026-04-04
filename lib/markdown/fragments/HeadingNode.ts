export class HeadingNode {
    id: string;

    tier: number;

     
    prev?: HeadingNode;

     
    next: HeadingNode[] = [];

    clear() {
        this.prev = undefined;
        this.next = [];
    }

    addNext(next: HeadingNode) {
        this.next.push(next.addParent(this));

        return next;
    }

    parent() {
        if (!this.prev)
            throw new Error('Undefined parent');

        return this.prev;
    }

    addParent(parent: HeadingNode) {
        this.prev = parent;

        return this;
    }

    constructor(id: string, tier: number, prev?: HeadingNode) {
        this.id = id;
        this.tier = tier;
        this.prev = prev;
    }
}
