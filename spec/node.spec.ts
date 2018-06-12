import { Node } from "./../source/ts/node";
import { Cell } from "./../source/ts/cell";
import { NodeData, CellData, ICell } from "..";

const _DATA = {
	bol: true,
	str: "string",
	num: 23,
	inner: {
		bol: false,
		num: 42
	}
};

describe("Node case", (): void => {
	it("Simple node", () => {
		const node = new Node(_DATA, (): void => { /* -- */ });
		expect(node.get().bol).toBeTruthy();
	});

	describe("Subscription", (): void => {
		it("Direct subscription", (next: () => void): void => {
			const node = new Node(_DATA, (): void => { /* -- */ });

			node.subscribe((data: NodeData) => {
				expect(data.bol).toBeFalsy();
				next();
			});

			expect(node.get().bol).toBeTruthy();
			node.set({ bol: false });
		});

		it("Child Cell subscribe", (next: () => void): void => {
			const node = new Node(_DATA, (): void => { /* -- */ });
			const cell = node.getChild("bol") as ICell;

			expect(cell.get()).toBeTruthy();

			cell.subscribe((data: NodeData): void => {
				expect(data).toBeFalsy();
				next();
			});

			cell.set(false);
		});

		it("Node subscribe with direct Cell change", (next: () => void): void => {
			const node = new Node(_DATA, (): void => { /* -- */ });
			const cell = node.getChild("bol") as ICell;

			node.subscribe((data: NodeData) => {
				expect(data.bol).toBeFalsy();
				next();
			});

			expect(node.get().bol).toBeTruthy();
			cell.set(false);
		});
	});

	describe("Modify Node data", (): void => {
		it("Remove field from object", (): void => {
			const node = new Node(_DATA, (): void => { /* -- */ });

			let data = node.get();
			expect(data.bol).toBeTruthy();
			expect(data.num).toEqual(_DATA.num);
			expect(node.getChild("num")).toBeInstanceOf(Cell);
			node.set({ bol: false });

			data = node.get();
			expect(data.bol).toBeFalsy();
			expect(data.num).toBeUndefined();

			expect(node.getChild("num")).toBeUndefined();
		});
	});
});
