import map from "lodash/map";
import isArray from "lodash/isArray";
import has from "lodash/has";
import size from "lodash/size";
import keys from "lodash/keys";
import cloneDeep from "lodash/cloneDeep";
import { Component } from "react";

class ComponentStateStore extends Component {
	constructor(options) {
		super(options.props);
		this.childName = options.name;
		this.storesRules =
			typeof options.storesRules === "undefined"
				? this.checkStoresRules()
				: options.storesRules;
		this.method = this.checkReunionMethod(options.reunionMethod);

		this.state = {};
		this.unsubscribe = [];

		this.initState();
	}

	checkStoresRules() {
		return this.props.stores.subscriptionMap.getStoreRules({
			childName: this.childName || this.constructor.name,
			type: "component"
		});
	}

	checkReunionMethod(reunionMethod){
		return this.props.stores.subscriptionMap.checkReunionMethod({
			method: reunionMethod,
			childName: this.childName || this.constructor.name,
			type: "component"
		})
	}

	initState() {
		const data = {};

		map(this.storesRules, rules => {
			if (
				typeof rules.store === "undefined" ||
				typeof this.props.stores[rules.store] === "undefined"
			)
				global.console.warn(
					`You are tried subscribe on not exist store: ${rules.store} \r\n Check options for super() call in component: '${this
						.constructor.name}'`
				);
			else {
				this.subscribe({ store: rules.store });

				if (typeof rules.fields === "undefined") {
					map(this.props.stores[rules.store].getStore, (value, field) => {
						data[field] = value;
					});
				} else {
					map(rules.fields, field => {
						data[field] = this.props.stores[rules.store].getStore[field];
					});
				}
			}
		});

		this.setNewState(data);
	}

	subscribe(options) {
		this.unsubscribe[options.store] = this.props.stores[
			options.store
		].subscribe(() => {
			this.getNewState({ store: options.store });
		});
	}

	getNewState(options) {
		const ns = this.props.stores[options.store].getStore;
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

	setNewState(newState) {
		if (this.updater.isMounted() === false) this.state = newState;
		else this.setState(newState);
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

	componentWillUnmount() {
		map(this.storesRules, rules => {
			this.unsubscribe[rules.store]();
		});
	}
}

export default ComponentStateStore;
