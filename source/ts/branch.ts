import { IBranch, INodeData, Data, CellData, EmitterListener, ICell, INode } from "./interfaces";
import { Cell } from "./cell";
import { Node } from "./node";

export class Branch implements IBranch {
	/**
	 *
	 */
	private readonly nodes: Map<string, INode> = new Map();

	/**
	 *
	 */
	private readonly cells: Map<string, ICell<Data>> = new Map();

	/**
	 *
	 * @param path
	 */
	public getChild<Child extends ICell<Data> | INode>(path: string[]): Child | undefined {
		let index = 0;
		let child = this.nodes.get(path[index]) || this.cells.get(path[index]);

		while (++index < path.length && child !== undefined && child instanceof Node)
			child = child.getChild(path[index]) as Child;

		return child as Child;
	}

	/**
	 *
	 * @param key
	 * @param data
	 * @param listener
	 */
	public addNode(key: string, data: INodeData, listener: EmitterListener<INodeData>): void {
		this.nodes.set(key, new Node(data, listener));
	}

	/**
	 *
	 * @param key
	 * @param data
	 * @param listener
	 */
	public addCell(key: string, data: CellData<Data>, listener: EmitterListener<CellData<Data>>): void {
		this.cells.set(key, new Cell<CellData<Data>>(key, data, listener));
	}

	/**
	 *
	 * @param key
	 */
	public removechild(key: string): void {
		this.cells.delete(key);
		this.nodes.delete(key);
	}
}
