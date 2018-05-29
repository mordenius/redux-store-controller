import { Emitter } from "./../source/ts/emitter";
import { EmitterListener, NodeData } from "./../index";

describe("Emitter case", () => {
	let emitter: Emitter;

	beforeEach(() => {
		emitter = new Emitter();
	});

	it("Single listener", (next: () => void) => {
		const control: string = "control_string";
		const listener: EmitterListener = (
			data: NodeData,
			prevData: NodeData
		): void => {
			expect(data).toEqual(control);
			expect(prevData).toEqual("");
			next();
		};

		emitter.subscribe(listener);
		emitter.emit(control, "");
	});

	it("Multiple listeners", (next: () => void) => {
		const control: boolean = true;

		const listener: EmitterListener = (data: NodeData): void => {
			expect(data).toBeTruthy();
			if (listeners.length !== 2) return;

			expect(listeners.length).toEqual(emitter.listenerCount);
			next();
		};

		const listeners: EmitterListener[] = [listener, listener];

		listeners.forEach((listen: EmitterListener) => {
			emitter.subscribe(listen);
		});
		emitter.emit(control, false);
	});

	it("Unsubscription", (next: () => void) => {
		const control: string = "control_string";
		let unsubscribe: Function;

		const listener: EmitterListener = (
			data: NodeData,
			prevData: NodeData
		): void => {
			expect(data).toEqual(control);
			expect(prevData).toEqual("");
			expect(emitter.listenerCount).toEqual(1);

			unsubscribe();

			expect(emitter.listenerCount).toEqual(0);
			next();
		};

		unsubscribe = emitter.subscribe(listener);
		expect(emitter.listenerCount).toEqual(1);
		emitter.emit(control, "");
	});
});
