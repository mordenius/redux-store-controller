import { Cell } from "./cell";
import { IProvider, ProviderData, INode, NodeData } from "../../index";

export class Provider implements IProvider {

	public readonly origin: ProviderData = {};
	public readonly tree: ProviderData = {};

	constructor(data: ProviderData) {
		const result = this.init(data);
		this.origin = result[0];
		this.tree = result[1];
	}

	private init(data: ProviderData): [ProviderData, ProviderData] {
		const origin: ProviderData = {};
		const tree: ProviderData = {};

		for (const key in data) {
			if (typeof data[key] === "object") {
				// const item = this.init(data[key]);
				// origin[key] = item[0];
				// tree[key] = new Cell(item[1]);
			} else {
				origin[key] = data[key];
				tree[key] = new Cell(data[key]);
			}
		}

		return [origin, tree];
	}
}
