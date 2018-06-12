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
	private data: NodeData = {};
	private readonly branch: IBranch = new Branch();

	constructor(data: NodeData, parentListener: EmitterListener) {
		super();
		this.subscribe(parentListener);
		this.create(data);
	}

	public set(data: NodeData): void {
		const prev = this.data; // Clone here !!!!
		this.create(data);
		this.emit(this.data, prev);
	}

	public get(): NodeData {
		return this.data;
	}

	public getChild(str: string | string[]): ICell | INode | undefined {
		const path: string[] = str instanceof Array ? str : [str];
		return this.branch.getChild(path);
	}

	private create(data: NodeData): void {
		for (const key in data) {
			const value: NodeData | CellData = data[key];
			this.data[key] = value;

			const child = this.getChild(key);

			if (child === undefined) {
				if (typeof value === "object" && !(value instanceof Array))
					this.branch.addNode(key, value, this.getListener(key));
				else this.branch.addCell(key, value, this.getListener(key));
			} else if (child instanceof Cell) child.set(value as CellData);
			else if (child instanceof Node) child.set(value as NodeData);
		}

		this.removeRudiments(data);
	}

	private removeRudiments(data: NodeData): void {
		for (const key in this.data) {
			if (data[key] !== undefined) continue;
			delete this.data[key];
			this.branch.removechild(key);
		}
	}

	private getListener(key: string): EmitterListener {
		return (newValue: NodeData, prevValue?: NodeData): void => {
			this.data[key] = newValue;
			this.emit(this.data, prevValue); // - !!!!!!!!!!!!!
		};
	}
}
