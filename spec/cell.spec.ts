import { Cell } from "./../source/ts/cell";
import { EmitterListener, NodeData } from "./../index";

describe("Cell case", () => {
	it("Simple cell", () => {
		const firstData: string = "init_data";
		const nextData: string = "new_data";

		const cell = new Cell(firstData);
		expect(cell.get()).toEqual(firstData);

		cell.set(nextData);
		expect(cell.get()).toEqual(nextData);
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

		const cell = new Cell(firstData);
		cell.subscribe(listener);

		expect(cell.listenerCount).toEqual(1);

		cell.set(nextData);
		expect(cell.get()).toEqual(nextData);
	});
});
