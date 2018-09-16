import { ControllerClass } from "./../lib/controller";
import { Cell } from "./../lib/cell";

const _KEY = "key";
const _VALUE = "value";
const _DUMMY = (): void => {
	/* ... */
};

const model = new Cell<string>(_KEY, _VALUE, _DUMMY);

class Controller extends ControllerClass<string, Cell<string>> {
	protected cb: (data: string) => void;

	public get getModel(): Cell<string> {
		return this.model as Cell<string>;
	}

	public get getState(): string {
		return this.state;
	}

	public pubSkip(): void {
		this.skip();
	}

	public pubInit(): void {
		this.init();
	}

	public setCb(cb: (data: string) => void): void {
		this.cb = cb;
	}

	protected stateDidUpdate(): void {
		this.cb.call(null, this.state);
	}
}

describe("Controller case", (): void => {
	let controller: Controller;

	it("controller init", (): void => {
		controller = new Controller(model);
		expect(controller.getModel).toEqual(model);
		expect(controller.getState).toEqual(_VALUE);
	});

	it("controller update", (done: () => void): void => {
		const newData = "newData";

		const cb = (data: string): void => {
			expect(data).toEqual(newData);
			done();
		};

		controller.setCb(cb);
		model.set(newData);
	});

	it("controller skip", (done: () => void): void => {
		const beforeSkip = "newData";
		const afterSkip = "newData";

		const cb = (data: string): void => {
			expect(data).toEqual(afterSkip);
			done();
		};

		controller.setCb(cb);
		controller.pubSkip();
		model.set(beforeSkip);
		expect(controller.getState).toEqual(beforeSkip);
		controller.pubInit();
		model.set(afterSkip);
	});
});
