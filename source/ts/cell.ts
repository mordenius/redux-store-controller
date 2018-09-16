import { Data, ICell, CellData, EmitterListener } from "./interfaces";
import { Emitter } from "./emitter";

/**
 * Cell with data of Node object structure
 */
export class Cell<Type extends Data> extends Emitter<CellData<Type>> implements ICell<Type> {
	public readonly name: string;
	/**
	 * Value of Cell data
	 */
	private data: CellData<Type>;

	private readonly parentListener: EmitterListener<CellData<Type>>;
	private parentUnsubscribe: () => void;

	/**
	 *
	 * @param data Initialize data of Cell
	 */
	constructor(name: string, data: Type, parentListener: EmitterListener<CellData<Type>>) {
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
	public set(data: Type, parent: boolean = false): void {
		if (parent) this.parentUnsubscribe();
		const prev = this.getData();
		this.data = data instanceof Array ? data.slice() : data;
		this.emit(this.getData(), prev);
		if (parent) this.parentUnsubscribe = this.subscribe(this.parentListener);
	}

	/**
	 * Get value of Cell data
	 */
	public get(): CellData<Type> {
		return this.getData();
	}

	private getData(): CellData<Type> {
		return this.data instanceof Array ? this.data.slice() : this.data;
	}
}
