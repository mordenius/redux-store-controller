import { INode, NodeData } from "../../index";
import { Emitter } from "./emitter";

export class Node extends Emitter implements INode {
	private data: NodeData;

	constructor(data: NodeData) {
		super();
		this.data = data;
	}

	public set(data: NodeData): void {
		const prev = this.data;
		this.data = data;
		this.emit(this.data, prev);
	}
}
