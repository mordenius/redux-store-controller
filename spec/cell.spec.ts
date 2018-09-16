import { Cell } from "./../lib/cell";
import { EmitterListener } from "./../lib/interfaces";

const firstData: string = "init_data";
const nextData: string = "new_data";

const parentListenerDummy = (): void => {
	/* - */
};

const listenerHelper = <Type>(next: () => void): EmitterListener<Type> => (
	data: Type,
	prev: Type
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
			const listener = listenerHelper<string>(next);
			const cell = new Cell("name", firstData, listener);

			expect(cell.listenerCount).toEqual(1);

			cell.set(nextData);
			expect(cell.get()).toEqual(nextData);
		});

		it("Multiple subscription", (next: () => void) => {
			const listener = listenerHelper(next);

			const cell = new Cell("name", firstData, parentListenerDummy);
			cell.subscribe(listener);

			// tslint:disable-next-line:no-magic-numbers
			expect(cell.listenerCount).toEqual(2);

			cell.set(nextData);
			expect(cell.get()).toEqual(nextData);
		});
	});

	describe("Types support", (): void => {
		it("Arrays", (): void => {
			const first = ["string1", "string2"];
			const second = ["string3"];

			const cell = new Cell("name", first, parentListenerDummy);

			cell.set(second);
			expect(cell.get()).toEqual(second);
		});

		it("Arrays with diff types", (): void => {
			const first = ["string1", "string2"];
			const second = [true, 1];

			const cell = new Cell("name", first, parentListenerDummy);

			cell.set(second); // Argument of type '(number | boolean)[]' is not assignable to parameter of type 'string[]'.
			expect(cell.get()).toEqual(second);
		});

		it("Special types", (): void => {
			const first = null;
			const second = undefined;
			const third = 1;

			const cell = new Cell<number>("name", first, parentListenerDummy);

			cell.set(second);
			expect(cell.get()).toEqual(second);

			cell.set(third);
			expect(cell.get()).toEqual(third);
		});
	});
});
