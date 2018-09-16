import { INodeData, CellData, ICell, INode, EmitterListener, Data } from "./interfaces";
import { Emitter } from "./emitter";
import { Cell } from "./cell";
import { Branch } from "./branch";

export class Node extends Emitter<INodeData> implements INode {
	/**
	 *
	 */
	private readonly data: INodeData = {};

	/**
	 *
	 */
	private readonly branch: Branch = new Branch();

	/**
	 *
	 * @param data
	 * @param parentListener
	 */

	private readonly parentListener: EmitterListener<INodeData>;
	private parentUnsubscribe: () => void;

	constructor(data: INodeData, parentListener: EmitterListener<INodeData>) {
		super();
		this.parentListener = parentListener;
		this.parentUnsubscribe = this.subscribe(parentListener.bind(null));
		this.create(data);
	}

	/**
	 *
	 * @param data
	 */
	public set(data: INodeData, parent: boolean = false): void {
		if (parent) this.parentUnsubscribe();
		const prev = this.data; // Clone here !!!!
		this.create(data);
		this.emit(this.data, prev);
		if (parent) this.parentUnsubscribe = this.subscribe(this.parentListener.bind(null));
	}

	/**
	 *
	 */
	public get(): INodeData {
		return this.data;
	}

	/**
	 *
	 * @param str
	 */
	public getChild<Child extends ICell<Data> | INode>(str: string | string[]): Child | undefined {
		const path: string[] = str instanceof Array ? str : [str];
		return this.branch.getChild(path);
	}

	/**
	 *
	 * @param data
	 */
	private create(data: INodeData): void {
		for (const key in data) {
			const value = data[key];
			this.data[key] = value;

			const child = this.getChild(key);

			if (child === undefined)
				if (typeof value === "object" && !(value instanceof Array) && value)
					this.branch.addNode(key, value as INodeData, this.getListener(key));
				else this.branch.addCell(key, value as CellData<Data>, this.getListener(key));
			else if (child instanceof Cell) child.set(value as CellData<Data>, true);
			else if (child instanceof Node) child.set(value as INodeData, true);
		}

		this.removeRudiments(data);
	}

	/**
	 *
	 * @param data
	 */
	private removeRudiments(data: INodeData): void {
		for (const key in this.data) {
			if (typeof data[key] !== "undefined") continue;
			this.data[key] = undefined;
			this.branch.removechild(key);
		}
	}

	/**
	 *
	 * @param key
	 */
	private getListener<Set extends INodeData | CellData<Data>>(key: string): EmitterListener<Set> {
		return (newValue?: Set, prevValue?: Set): void => {
			this.data[key] = newValue;
			this.emit(this.data, prevValue as INodeData); // - !!!!!!!!!!!!!
		};
	}
}
