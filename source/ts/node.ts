import {
	NodeData,
	CellData,
	INode,
	ICell,
	IBranch,
	EmitterListener
} from "./../../index";
import { Emitter } from "./emitter";
import { Cell } from "./cell";
import { Branch } from "./branch";

export class Node extends Emitter implements INode {
	/**
	 *
	 */
	private readonly data: NodeData = {};

	/**
	 *
	 */
	private readonly branch: IBranch = new Branch();

	/**
	 *
	 * @param data
	 * @param parentListener
	 */

	private readonly parentListener: EmitterListener;
	private parentUnsubscribe: () => void;

	constructor(data: NodeData, parentListener: EmitterListener) {
		super();
		this.parentListener = parentListener;
		this.parentUnsubscribe = this.subscribe(parentListener);
		this.create(data);
	}

	/**
	 *
	 * @param data
	 */
	public set(data: NodeData, parent: boolean = false): void {
		if (parent) this.parentUnsubscribe();
		const prev = this.data; // Clone here !!!!
		this.create(data);
		this.emit(this.data, prev);
		if (parent) this.parentUnsubscribe = this.subscribe(this.parentListener);
	}

	/**
	 *
	 */
	public get(): NodeData {
		return this.data;
	}

	/**
	 *
	 * @param str
	 */
	public getChild(str: string | string[]): ICell | INode | undefined {
		const path: string[] = str instanceof Array ? str : [str];
		return this.branch.getChild(path);
	}

	/**
	 *
	 * @param data
	 */
	private create(data: NodeData): void {
		for (const key in data) {
			const value: NodeData | CellData = data[key];
			this.data[key] = value;

			const child = this.getChild(key);

			if (child === undefined)
				if (typeof value === "object" && !(value instanceof Array) && !(value === null))
					this.branch.addNode(key, value, this.getListener(key));
				else this.branch.addCell(key, value, this.getListener(key));
			else if (child instanceof Cell) child.set(value as CellData, true);
			else if (child instanceof Node) child.set(value as NodeData, true);
		}

		this.removeRudiments(data);
	}

	/**
	 *
	 * @param data
	 */
	private removeRudiments(data: NodeData): void {
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
	private getListener(key: string): EmitterListener {
		return (newValue: NodeData, prevValue?: NodeData): void => {
			this.data[key] = newValue;
			this.emit(this.data, prevValue); // - !!!!!!!!!!!!!
		};
	}
}
