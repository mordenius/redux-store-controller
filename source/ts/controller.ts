// tslint:disable:max-classes-per-file
import { INodeData, CellData, Data, EmitterListener, INodeCell } from "./interfaces";

export abstract class ControllerClass<T extends CellData<Data> | INodeData, M extends INodeCell<T>> {
	protected readonly model: M;
	protected state: T;
	protected skip: undefined | (() => void);

	constructor(model: M) {
		this.model = model;
		this.state = this.model.get();
		this.init();
	}

	public init(): void {
		const listener: EmitterListener<T> = (newState: T): void => {
			this.state = newState;
			this.stateDidUpdate();
		};

		this.skip = this.model.subscribe(listener);
	}

	public setState(data: T): void {
		this.state = data;
	}

	public update(data: T): void {
		this.setState(data);
		this.stateDidUpdate.call(this);
	}

	protected abstract stateDidUpdate(): void;
}
