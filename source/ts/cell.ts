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
		this.data = data;
		this.subscribe(parentListener);
	}

	/**
	 * Change value of Cell data
	 * @param data New data value
	 */
	public set(data: CellData): void {
		const prev = this.data;
		this.data = data;
		this.emit(this.data, prev);
	}

	/**
	 * Get value of Cell data
	 */
	public get(): CellData {
		return this.data;
	}
}
