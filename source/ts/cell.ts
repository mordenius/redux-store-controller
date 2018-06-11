import { ICell, CellData, EmitterListener } from "../../index";
import { Emitter } from "./emitter";

/**
 * Cell with data of Node object structure
 */
export class Cell extends Emitter implements ICell {
	/**
	 * Value of Cell data
	 */
	private data: CellData;

	/**
	 *
	 * @param data Initialize data of Cell
	 */
	constructor(data: CellData, parentListener: EmitterListener) {
		super();
		this.data = data instanceof Array ? data.slice() : data;
		this.subscribe(parentListener);
	}

	/**
	 * Change value of Cell data
	 * @param data New data value
	 */
	public set(data: CellData): void {
		const prev = this.getData();
		this.data = data instanceof Array ? data.slice() : data;
		this.emit(this.getData(), prev);
	}

	/**
	 * Get value of Cell data
	 */
	public get(): CellData {
		return this.getData();
	}

	private getData(): CellData {
		return this.data instanceof Array ? this.data.slice() : this.data;
	}
}
