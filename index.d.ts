
export type CellData = string | number | boolean | any[] | Function;

export interface ICell extends IEmitter {
	set(data: CellData): void;
	get(): CellData;
}

export type NodeData = { [key: string]: CellData | NodeData };

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

export type EmitterListener = (data: NodeData, previoslyData?: NodeData) => void;

export interface IEmitter {
	listenerCount: number;
	subscribe(listener: EmitterListener): void;
	emit(data: NodeData, prevData?: NodeData): void;
}

export type ProviderData = NodeData;

export interface IProvider extends INode {
	
}
