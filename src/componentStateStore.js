import _ from "lodash";
import { Component } from "react";

class ComponentStateStore extends Component {
	constructor(options) {
		super(options.props);
		this.storesRules = options.stores;
		this.method = ComponentStateStore.checkReunionMethod({
			method: options.reunionMethod
		});

		this.state = {};
		this.unsubscribe = [];

		this.initState();
	}

	static checkReunionMethod(options) {
		if (typeof options.method !== "string") return "assign";
		const valid = ["assign", "merge", "hard"];
		return _.includes(valid, options.method) ? options.method : "assign";
	}

	initState() {
		const data = {};

		_.map(this.storesRules, rules => {
			if (
				typeof rules.store === "undefined" ||
				typeof this.props.stores[rules.store] === "undefined"
			)
				global.console.log(
					`You are tried subscribe on not exist store: ${rules.store} \r\n Check options for super() call in component: '${this
						.constructor.name}'`
				);
			else {
				this.subscribe({ store: rules.store });

				_.map(rules.fields, field => {
					data[field] = this.props.stores[rules.store].getStore[field];
				});
			}
		});

		this.state = data;
	}

	subscribe(options) {
		this.unsubscribe[options.store] = this.props.stores[
			options.store
		].subscribe(() => {
			this.getNewState({ store: options.store });
		});
	}

	getNewState(options) {
		const rule = this.storesRules.filter(el => el.store === options.store)[0];
		const f =
			_.isArray(rule.fields) === false || _.size(rule.fields) < 1
				? "all"
				: rule.fields;
		const ns = this.props.stores[options.store].getStore;

		this.mergeFields({ fields: f, newState: ns });
	}

	mergeFields(options) {
		if (options.fields === "all") this.setState(options.newState);
		else this.mergeRuleFields(options);
	}

	mergeRuleFields(options) {
		const data = {};

		_.map(options.fields, field => {
			if (_.has(options.newState, field)) {
				if (
					typeof options.newState[field] !== "undefined" &&
					options.newState[field] !== this.state[options.fields]
				) {
					data[field] = options.newState[field];
				}
			}
		});

		this.setState(data);
	}

	componentWillUnmount() {
		_.map(this.storesRules, rules => {
			this.unsubscribe[rules.store]();
		});
	}
}

export default ComponentStateStore;
