import { IProvider, ProviderData, CellData, INodeData, EmitterListener, Data } from "./interfaces";
import { Node } from "./node";

const defaultListener = (): void => {
	/* */
};

export class Provider extends Node implements IProvider {
	/**
	 *
	 */
	public readonly origin: INodeData = {};

	/**
	 *
	 * @param data
	 * @param listener
	 */
	constructor(data: ProviderData, listener?: EmitterListener<ProviderData>) {
		super(data, listener ? listener : defaultListener);
		this.origin = this.init(data);
	}

	/**
	 *
	 * @param data
	 */
	private init(data: INodeData): INodeData {
		const origin: INodeData = {};

		for (const key in data) {
			const value: INodeData | CellData<Data> = data[key];
			origin[key] = typeof value === "object" && !Array.isArray(value) && value ? this.init(value as INodeData) : value;
		}

		return origin;
	}
}
