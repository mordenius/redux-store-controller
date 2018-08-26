import { IProvider, ProviderData, CellData, NodeData, EmitterListener } from "../../index";
import { Node } from "./node";

const defaultListener = (): void => {
	/* */
};

export class Provider extends Node implements IProvider {
	/**
	 *
	 */
	public readonly origin: NodeData = {};

	/**
	 *
	 * @param data
	 * @param listener
	 */
	constructor(data: ProviderData, listener?: EmitterListener) {
		super(data, listener ? listener : defaultListener);
		this.origin = this.init(data);
	}

	/**
	 *
	 * @param data
	 */
	private init(data: NodeData): NodeData {
		const origin: NodeData = {};

		for (const key in data) {
			const value: NodeData | CellData = data[key];
			origin[key] = typeof value === "object" && !Array.isArray(value) && value ? this.init(value) : value;
		}

		return origin;
	}
}
