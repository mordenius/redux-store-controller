export type EmitterListener<T> = (data: T, previoslyData?: T) => void;

export type AvailableDataTypes = string | number | boolean | Function | undefined | null;
export type Data = AvailableDataTypes | AvailableDataTypes[];
export type CellData<Type extends Data> = Type;

export interface INodeData {
	[key: string]: CellData<Data> | INodeData;
}

export type ProviderData = INodeData;

export interface IEmitter<Set extends CellData<Data> | INodeData> {
	listenerCount: number;
	subscribe(listener: EmitterListener<Set>): () => void;
	emit(data: Set, prevData?: Set): void;
}

export interface INodeCell<Type extends CellData<Data> | INodeData> extends IEmitter<Type> {
	set(data: Type): void;
	get(): Type;
}

export interface ICell<Type extends Data> extends INodeCell<CellData<Type>> {
	name: string;
}

export interface INode extends INodeCell<INodeData> {
	getChild<Child extends ICell<Data> | INode>(path: string | string[]): Child | undefined;
}

export interface IBranch {
	getChild<Child extends ICell<Data> | INode>(path: string[]): Child | undefined;
	addNode(key: string, data: INodeData, listener: EmitterListener<INodeData>): void;
	addCell(key: string, data: CellData<Data>, listener: EmitterListener<CellData<Data>>): void;
	removechild(key: string): void;
}

export type IProvider = INode;
