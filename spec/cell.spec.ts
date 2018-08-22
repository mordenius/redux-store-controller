import { Cell } from "./../source/ts/cell";
import { EmitterListener, NodeData, CellData } from "./../index";

const firstData: string = "init_data";
const nextData: string = "new_data";

const parentListenerDummy = (): void => {
	/* - */
};

const listenerHelper = (next: () => void): EmitterListener => (
	data: NodeData | CellData,
	prev: NodeData | CellData
): void => {
	expect(data).toEqual(nextData);
	expect(prev).toEqual(firstData);
	next();
};

describe("Cell case", () => {
	it("Simple cell", () => {
		const cell = new Cell("name", firstData, parentListenerDummy);
		expect(cell.get()).toEqual(firstData);

		cell.set(nextData);
		expect(cell.get()).toEqual(nextData);
	});

	describe("Subscription", () => {
		it("Parent subscription", (next: () => void) => {
			const listener = listenerHelper(next);
			const cell = new Cell("name", firstData, listener);

			expect(cell.listenerCount).toEqual(1);

			cell.set(nextData);
			expect(cell.get()).toEqual(nextData);
		});

		it("Multiple subscription", (next: () => void) => {
			const listener = listenerHelper(next);

			const cell = new Cell("name", firstData, parentListenerDummy);
			cell.subscribe(listener);

			expect(cell.listenerCount).toEqual(2);

			cell.set(nextData);
			expect(cell.get()).toEqual(nextData);
		});
	});
});
