import { createStore } from "redux";
import assign from "lodash/assign";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";

class StoreClass {
	constructor(options) {
		this.initState = cloneDeep(options.initState);
		this._store = createStore(this.update.bind(this), options.initState);
	}

	get getStore() {
		return this._store.getState();
	}

	update(state, action) {
		switch (action.type) {
			case "UPDATE":
				return action.value;
			case "ASSIGN":
				return StoreClass.assignation(state, action.value);
			case "MERGE":
				return StoreClass.merging(state, action.value);
			default:
				return state;
		}
	}

	static assignation(state, action) {
		return assign(state, action);
	}

	static merging(state, action) {
		return merge(state, action);
	}

	set(newState) {
		this._store.dispatch({ type: "UPDATE", value: newState });
	}

	assign(newState) {
		if (typeof this.getStore !== typeof newState) {
			global.console.warn(
				`You are tried assign diffrent type : ${typeof this
					.getStore} with ${typeof newState}. Check options for assign() call in class: '${this
					.constructor.name}'`
			);
		}
		this._store.dispatch({ type: "ASSIGN", value: newState });
	}

	merge(newState) {
		if (typeof this.getStore !== typeof newState) {
			global.console.warn(
				`You are tried merge diffrent type : ${typeof this
					.getStore} with ${typeof newState}. Check options for assign() call in class: '${this
					.constructor.name}'`
			);
		}
		this._store.dispatch({ type: "MERGE", value: newState });
	}

	reset() {
		this.set(this.initState);
	}

	subscribe(func) {
		const unsub = this._store.subscribe(func);

		return function unsubscribe() {
			unsub();
		};
	}
}

export default StoreClass;
