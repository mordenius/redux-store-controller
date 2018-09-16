import { IEmitter, EmitterListener, INodeData, CellData, Data } from "./interfaces";

/**
 * Callback listeners controller
 */
export class Emitter<Set extends INodeData | CellData<Data>> implements IEmitter<Set> {
	/**
	 * Collections of listeners
	 */
	private readonly listeners: Map<number, EmitterListener<Set>> = new Map();
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
	public subscribe(listener: EmitterListener<Set>): () => void {
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
	public emit(data: Set, prevData?: Set): void {
		this.listeners.forEach(
			(value: EmitterListener<Set>): void => {
				value.call(null, data, prevData);
			}
		);
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
