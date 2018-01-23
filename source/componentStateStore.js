import map from "lodash/map";
import each from "lodash/each";
import { Component } from "react";
import Stores from "./storeClass";

export default class ComponentStateStore extends Component {
	state = {};
	unsubscribe = [];

	constructor(options) {
		super(options.props);
		this.checkOptions(options);
		this.stores = options.stores;

		this.subscribe(options.rules);
	}

	checkOptions(options) {
		if(options.stores instanceof Stores) this.stores = options.stores;
		else {
			const message = `You are tried subscribe on not exist store: ${options.stores} \r\n Check options for super() call in component: '${this
				.constructor.name}'`
			global.console.error(message);
			throw new Error(message)
		}
	}

	subscribe(rules) {
		this.unsubscribe = map(rules, rule =>
			this.subscribeField(rule.field)
		);
	}

	subscribeField(field) {
		this.initStateField(field);
		return this.stores.watch(field, value => {
			this.updateField(field, value);
		});
	}

	updateField(field, value) {
		const ob = {};
		ob[field] = value;
		this.setState(ob);
	}

	initStateField(field) {
		this.state[field] = this.stores.getField(field) || null;
	}

	componentWillUnmount() {
		each(this.unsubscribe, rule => {
			rule();
		});
	}
}
