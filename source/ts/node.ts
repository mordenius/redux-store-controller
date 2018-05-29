import { INode, NodeData } from "../../index";
import { Emitter } from "./emitter";

/**
 * Node of data object structure
 */
export class Node extends Emitter implements INode {
	/**
	 * Value of Node data
	 */
	private data: NodeData;

	/**
	 * 
	 * @param data Initialize data of Node
	 */
	constructor(data: NodeData) {
		super();
		this.data = data;
	}

	/**
	 * Change value of Node data
	 * @param data New data value
	 */
	public set(data: NodeData): void {
		const prev = this.data;
		this.data = data;
		this.emit(this.data, prev);
	}

	/**
	 * Get value of Node data
	 */
	public get(): NodeData {
		return this.data;
	}
}
