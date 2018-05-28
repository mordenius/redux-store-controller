
export type NodeData = string | number | boolean | any[];

export interface INode extends IEmitter {
	set(data: NodeData): void;
}

export type EmitterListener = (data: NodeData, previoslyData?: NodeData) => void;

export interface IEmitter {
	listenerCount: number;
	subscribe(listener: EmitterListener): void;
	emit(data: NodeData, prevData: NodeData): void;
}

