import { INode, NodeData } from "../../index";
import { Emitter } from "./emitter";

/**
 * Cell with data of Node object structure
 */
export class Cell extends Emitter implements INode {
	/**
	 * Value of Cell data
	 */
	private data: NodeData;

	/**
	 * 
	 * @param data Initialize data of Cell
	 */
	constructor(data: NodeData) {
		super();
		this.data = data;
	}

	/**
	 * Change value of Cell data
	 * @param data New data value
	 */
	public set(data: NodeData): void {
		const prev = this.data;
		this.data = data;
		this.emit(this.data, prev);
	}

	/**
	 * Get value of Cell data
	 */
	public get(): NodeData {
		return this.data;
	}
}
