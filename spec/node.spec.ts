import { Node } from "./../source/ts/node";
import { EmitterListener, NodeData } from "./../index";

describe("Node case", () => {
	it("Simple node", () => {
		const firstData: string = "init_data";
		const nextData: string = "new_data";

		const node = new Node(firstData);
		expect(node.get()).toEqual(firstData);

		node.set(nextData);
		expect(node.get()).toEqual(nextData);
	});

	it("Subscription", (next: () => void) => {
		const firstData: string = "init_data";
		const nextData: string = "new_data";

		const listener: EmitterListener = (
			data: NodeData,
			prev: NodeData
		): void => {
			expect(data).toEqual(nextData);
			expect(prev).toEqual(firstData);
			next();
		};

		const node = new Node(firstData);
		node.subscribe(listener);

		expect(node.listenerCount).toEqual(1);

		node.set(nextData);
		expect(node.get()).toEqual(nextData);
	});
});
