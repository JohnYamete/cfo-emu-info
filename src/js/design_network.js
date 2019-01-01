import {COLORS, CURRENT_COLOR, CURRENT_BORDER_COLOR} from './defines';

export default class DesignNetwork {
    constructor(nameToMecha) {
        this._nameToMecha = nameToMecha;
        this._maxDepth = 0;
        this._showC = false;
        this._showB = false;
        this._network = null;
        this.reset();
    }

    reset() {
        this._edges = {};
        this._nodes = {};
        this._done = {};
        this._nextId = 1;
    }

    setContainer(container) {
        this._container = container;
    }

    configure({maxDepth, showC, showB}) {
        this._maxDepth = maxDepth;
        this._showC = showC;
        this._showB = showB;
    }

    draw(rootMechaName) {
        const rootMecha = this._nameToMecha[rootMechaName];
        this.addNode(rootMecha, {
            color: {
                background: CURRENT_COLOR,
                border: CURRENT_BORDER_COLOR,
            },
        });

        this._dfs(rootMechaName, null, false, 0);

        const data = {
            nodes: new vis.DataSet(Object.values(this._nodes)),
            edges: new vis.DataSet(Object.values(this._edges))
        };
        const options = {};
        this._network = new vis.Network(this._container, data, options);
    }

    _dfs(mechaName, fromId, isChild, depth) {
        if (depth > this._maxDepth) return;
        const mecha = this._nameToMecha[mechaName];
        const {rank} = mecha;

        if (!this._showC && rank.includes('C')) return;
        if (!this._showB && rank.includes('B')) return;

        const node = this.addNode(mecha);
        const {id} = node;

        if (fromId) {
            if (isChild) this.addEdge(id, fromId);
            if (!isChild) this.addEdge(fromId, id);
        }

        if (this._done[id]) return;
        this._done[id] = true;

        mecha.children.forEach(children => {
            this._dfs(children.name, id, true, depth + 1);
        });
        mecha.parents.forEach(parent => {
            this._dfs(parent.name, id, false, depth + 1);
        });
    }

    addEdge(from, to, opts = {}) {
        this._edges[`${from}_${to}`] = {from, to, arrows: 'to', ...opts};
    }

    addNode(mecha, opts = {}) {
        let node = this._nodes[mecha.name];
        if (node) return node;

        const {name, rank} = mecha;
        node = {
            id: this._getNextId(),
            label: name,
            color: COLORS.find(c => rank.includes(c.rank)).color,
            ...opts
        };

        this._nodes[name] = node;

        return node;
    }

    _getNextId() {
        return this._nextId++;
    }
}
