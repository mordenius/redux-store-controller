
export type CellData = string | number | boolean | any[] | Function;

export interface ICell {
	set(data: CellData): void;
	get(): CellData;
}

export type NodeData = string | number | boolean | any[] | NodeData;

export interface INode extends IEmitter {
	set(data: NodeData): void;
}

export type EmitterListener = (data: NodeData, previoslyData?: NodeData) => void;

export interface IEmitter {
	listenerCount: number;
	subscribe(listener: EmitterListener): void;
	emit(data: NodeData, prevData: NodeData): void;
}

export type ProviderData = { [key: string ]: NodeData };

export interface IProvider {

}
