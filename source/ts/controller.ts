import { Node, NodeData, Cell, CellData } from "./../../index";

export abstract class ControllerClass {
	protected readonly model: Node | Cell;
	protected state: NodeData | CellData;
	protected skip: undefined | (() => void);

	constructor(model: Node | Cell) {
		this.model = model;
		this.state = this.model.get();
		this.init();
	}

	public init(): void {
		this.skip = this.model.subscribe(
			(newState: NodeData | CellData): void => {
				this.state = newState;
				this.stateDidUpdate();
			}
		);
	}

	public setState(data: NodeData | CellData): void {
		this.state = data;
	}

	public update(data: NodeData | CellData): void {
		this.setState(data);
		this.stateDidUpdate.call(this);
	}

	protected abstract stateDidUpdate(): void;
}
