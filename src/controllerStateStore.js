import map from "lodash/map";
import assign from "lodash/assign";
import merge from "lodash/merge";
import isArray from "lodash/isArray";
import cloneDeep from "lodash/cloneDeep";
import size from "lodash/size";
import has from "lodash/has";
import keys from "lodash/keys";
import SubscriptionMapController from "./subscriptionMapController";

class ControllerStateStore {
	constructor(options) {
		this.stores = options.stores;
		this.storesRules =
			typeof options.storesRules === "undefined"
				? this.checkStoresRules()
				: options.storesRules;
		this.method = SubscriptionMapController.checkReunionMethod({
			method: options.reunionMethod,
			stores: this.stores,
			childName: this.constructor.name
		});

		this.state = {};
		this.initialized = false;
		this.unsubscribe = [];

		this.initState();
	}

	checkStoresRules() {
		return SubscriptionMapController.checkStoresRules({
			stores: this.stores,
			childName: this.constructor.name
		});
	}

	initState() {
		const data = {};

		map(this.storesRules, rules => {
			if (
				typeof rules.store === "undefined" ||
				typeof this.stores[rules.store] === "undefined"
			)
				global.console.warn(
					`You are tried subscribe on not exist store: ${rules.store}. Check options for super() call in class: '${this
						.constructor.name}'`
				);
			else {
				this.subscribe({ store: rules.store });

				if (typeof rules.fields === "undefined") {
					map(this.stores[rules.store].getStore, (value, field) => {
						data[field] = value;
					});
				} else {
					map(rules.fields, field => {
						data[field] = this.stores[rules.store].getStore[field];
					});
				}
			}
		});

		this.setState(data);
	}

	setState(newState) {
		switch (this.method) {
			case "assign":
			default:
				this.state = assign(this.state, newState);
				break;
			case "merge":
				this.state = merge(this.state, newState);
				break;
			case "hard":
				this.state = cloneDeep(newState);
				break;
		}

		if (this.initialized === false) {
			this.initialized = true;
			this.stateDidInit();
		} else this.stateDidUpdate();
	}

	subscribe(options) {
		this.unsubscribe[options.store] = this.stores[
			options.store
		].subscribe(() => {
			this.getNewState(options);
		});
	}

	getNewState(options) {
		const ns = this.stores[options.store].getStore;
		const rule = this.storesRules.filter(el => el.store === options.store)[0];

		const f =
			isArray(rule.fields) === false || size(rule.fields) < 1
				? keys(ns)
				: rule.fields;

		this.mergeFields({ fields: f, newState: ns });
	}

	mergeFields(options) {
		const data = {};

		map(options.fields, field => {
			if (has(options.newState, field)) {
				if (options.newState[field] !== this.state[field]) {
					data[field] = options.newState[field];
				}

				if (typeof this.state[field] === "object") {
					data[field] = cloneDeep(options.newState[field]);
				}
			} else {
				data[field] = undefined;
			}
		});

		if (size(data) > 0) this.setState(data);
	}

	// eslint-disable-next-line
	stateDidInit() {
		return "State did init.";
	}

	// eslint-disable-next-line
	stateDidUpdate() {
		return "State did update";
	}

	unmount(options = null) {
		const list = isArray(options) ? options : this.storesRules;
		map(list, rules => {
			if (
				typeof rules.store === "undefined" ||
				typeof this.unsubscribe[rules.store] === "undefined"
			)
				global.console.warn(
					`You are tried unsubscribe store which was not subscribed: ${rules.store}. Check super.unmount() call in class: '${this
						.constructor.name}'`
				);
			else this.unsubscribe[rules.store]();
		});
	}
}

export default ControllerStateStore;
