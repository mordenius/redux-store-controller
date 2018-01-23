import map from "lodash/map";
import each from "lodash/each";
import Stores from "./storeClass";

export default class ControllerStateStore {
	state = {};
	unsubscribe = [];

	constructor(options) {
		this.checkOptions(options);
		this.stores = options.stores;

		this.subscribe(options.rules);
	}

	// eslint-disable-next-line
	stateDidUpdate() {}

	checkOptions(options) {
		if (options.stores instanceof Stores) this.stores = options.stores;
		else {
			const message = `You are tried subscribe on not exist store: ${
				options.stores
			} \r\n Check options for super() call in component: '${
				this.constructor.name
			}'`;
			global.console.error(message);
			throw new Error(message);
		}
	}

	subscribe(rules) {
		this.unsubscribe = map(rules, rule => this.subscribeField(rule.field));
	}

	subscribeField(field) {
		this.initStateField(field);
		return this.stores.watch(field, value => {
			this.updateField(field, value);
		});
	}

	updateField(field, value) {
		this.state[field] = value;
		this.stateDidUpdate();
	}

	initStateField(field) {
		this.state[field] = this.stores.getField(field) || null;
	}

	unsubscribe() {
		each(this.unsubscribe, rule => {
			rule();
		});
	}
}
