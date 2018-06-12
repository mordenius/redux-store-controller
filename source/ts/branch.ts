import {
	IBranch,
	INode,
	ICell,
	NodeData,
	CellData,
	EmitterListener
} from "./../../index";
import { Cell } from "./cell";
import { Node } from "./node";

export class Branch implements IBranch {
	private nodes: Map<string, INode> = new Map();
	private cells: Map<string, ICell> = new Map();

	public getChild(path: string[]): INode | ICell | undefined {
		let index = 0;
		let child: INode | ICell | undefined =
			this.nodes.get(path[index]) || this.cells.get(path[index]);

		while (index < path.length && child !== undefined && child instanceof Node) {
			++index;
			child = child.getChild(path[index]);
		}

		return child;
	}

	public addNode(key: string, data: NodeData, listener: EmitterListener): void {
		this.nodes.set(key, new Node(data, listener));
	}

	public addCell(key: string, data: CellData, listener: EmitterListener): void {
		this.cells.set(key, new Cell(data, listener));
	}

	public removechild(key: string): void {
		this.cells.delete(key);
		this.nodes.delete(key);
	}
}
