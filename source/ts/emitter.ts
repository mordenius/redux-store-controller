import { IEmitter, EmitterListener, NodeData } from "../../index";

export class Emitter implements IEmitter {
	private listeners: Map<number, EmitterListener> = new Map();
	private cnt: number = 0;
	private index: number = 0;

	public get listenerCount(): number {
		return this.cnt;
	}

	public subscribe(listener: EmitterListener): Function {
		const index: number = this.index;
		this.listeners.set(index, listener);
		this.cnt += 1;
		this.index += 1;

		return this.unsubscribe.bind(this, index);
	}

	public emit(data: NodeData, prevData: NodeData): void {
		this.listeners.forEach((value: EmitterListener): void => {
			value.call(null, data, prevData);
		});
	}

	private unsubscribe(index: number): void {
		this.listeners.delete(index);
		this.cnt -= 1;
	}
}
