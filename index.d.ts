declare type EmitterListener = (data: NodeData, previoslyData?: NodeData) => void;
declare type CellData = string | number | boolean | any[] | Function | undefined | null;
declare type NodeData = { [key: string]: CellData | NodeData };
declare type ProviderData = NodeData;

export interface IEmitter {
	listenerCount: number;
	subscribe(listener: EmitterListener): () => void;
	emit(data: NodeData, prevData?: NodeData): void;
}

export interface ICell extends IEmitter {
	name: string;
	set(data: CellData): void;
	get(): CellData;
}

export interface INode extends IEmitter {
	getChild(path: string | string[]): INode | ICell | undefined;
	set(data: NodeData): void;
	get(): NodeData;
}

export interface IBranch {
	getChild(path: string[]): INode | ICell | undefined;
	addNode(key: string, data: NodeData, listener: EmitterListener): void;
	addCell(key: string, data: CellData, listener: EmitterListener): void;
	removechild(key: string): void;
}

export interface IProvider extends INode {}

declare class Emitter implements IEmitter {
	listenerCount: number;
	subscribe(listener: EmitterListener): () => void;
	emit(data: NodeData, prevData?: NodeData): void;
}

declare class Cell extends Emitter implements ICell {
	name: string;
	set(data: CellData): void;
	get(): CellData;
}

declare class Node extends Emitter implements INode {
	getChild(path: string | string[]): INode | ICell | undefined;
	set(data: NodeData): void;
	get(): NodeData;
}

declare class Branch implements IBranch {
	getChild(path: string[]): INode | ICell | undefined;
	addNode(key: string, data: NodeData, listener: EmitterListener): void;
	addCell(key: string, data: CellData, listener: EmitterListener): void;
	removechild(key: string): void;
}

declare class Provide extends Node implements IProvider {}
