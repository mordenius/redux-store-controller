import { IEmitter, EmitterListener, NodeData, CellData } from "../../index";

/**
 * Callback listeners controller
 */
export class Emitter implements IEmitter {
	/**
	 * Collections of listeners
	 */
	private readonly listeners: Map<number, EmitterListener> = new Map();
	/**
	 * Count of listeners
	 */
	private cnt: number = 0;
	/**
	 * Index, under which the next listener will be added to the collection
	 */
	private index: number = 0;

	/**
	 * Public getter for receive count of active listeners
	 */
	public get listenerCount(): number {
		return this.cnt;
	}

	/**
	 * Subscription of listener
	 * @param listener Callback listener
	 */
	public subscribe(listener: EmitterListener): () => void {
		const index: number = this.index;
		this.listeners.set(index, listener);
		this.cnt += 1;
		this.index += 1;

		return this.unsubscribe.bind(this, index) as () => void;
	}

	/**
	 * Calling listeners with value transfer
	 * @param data Current value
	 * @param prevData Previously value
	 */
	public emit(data: NodeData | CellData, prevData?: NodeData | CellData): void {
		this.listeners.forEach((value: EmitterListener): void => {
			value.call(null, data, prevData);
		});
	}

	/**
	 *  Unsubscribe of listener
	 * @param index - Listener index in collection of listeners
	 */
	private unsubscribe(index: number): void {
		this.listeners.delete(index);
		this.cnt -= 1;
	}
}
