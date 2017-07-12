import { createStore } from "redux";

class StoreClass {
	constructor(options) {
		this._store = createStore(this.update.bind(this), options.initState);
	}

	get getStore() {
		return this._store.getState();
	}

	update(state, action) {
		switch (action.type) {
			case "UPDATE":
				state = action.value;
				break;
			default:
				return state;
		}

		return state;
	}

	set(value) {
		this._store.dispatch({ type: "UPDATE", value: value });
	}

	reset() {
		this._store.dispatch({ type: "RESET" });
	}

	subscribe(func) {
		let unsub = this._store.subscribe(func);

		return function unsubscribe() {
			unsub();
		};
	}
}

export default StoreClass;
