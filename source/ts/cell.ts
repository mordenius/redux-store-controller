import { ICell, CellData, EmitterListener } from "../../index";
import { Emitter } from "./emitter";

/**
 * Cell with data of Node object structure
 */
export class Cell extends Emitter implements ICell {
	public readonly name: string;
	/**
	 * Value of Cell data
	 */
	private data: CellData;

	private readonly parentListener: EmitterListener;
	private parentUnsubscribe: () => void;

	/**
	 *
	 * @param data Initialize data of Cell
	 */
	constructor(name: string, data: CellData, parentListener: EmitterListener) {
		super();
		this.name = name;
		this.data = data instanceof Array ? data.slice() : data;
		this.parentListener = parentListener;
		this.parentUnsubscribe = this.subscribe(parentListener);
	}

	/**
	 * Change value of Cell data
	 * @param data New data value
	 */
	public set(data: CellData, parent: boolean = false): void {
		if (parent) this.parentUnsubscribe();
		const prev = this.getData();
		this.data = data instanceof Array ? data.slice() : data;
		this.emit(this.getData(), prev);
		if (parent) this.parentUnsubscribe = this.subscribe(this.parentListener);
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
