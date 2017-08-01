import _ from "lodash";

class ComposnentStateStore {
	constructor(options) {
		this.stores = options.stores;
		this.storesRules = options.storesRules;
		this.method = ComposnentStateStore.checkReunionMethod({ method: options.reunionMethod });

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
				typeof this.stores[rules.store] === "undefined"
			)
				global.console.log(
					`You are tried subscribe on not exist store: ${rules.store} \r\n Check options for super() call in class: '${this
						.constructor.name}'`
				);
			else {
				this.subscribe({ store: rules.store });

				_.map(rules.fields, field => {
					data[field] = this.stores[rules.store].getStore[field];
				});
			}
		});

		this.setState(data);
	}

	setState(newState) {
		switch (this.method) {
			case "assign":
			default:
				this.state = _.assign(newState);
				break;
			case "merge":
				this.state = _.merge(newState);
				break;
			case "hard":
				this.state = _.clone(newState);
				break;
		}

		this.stateDidUpdate();
	}

	subscribe(options) {
		this.unsubscribe[options.store] = this.stores[options.store].subscribe(() => {
			this.getNewState(options);
		});
	}

	getNewState(options) {
		const rule = this.storesRules.filter(el => el.store === options.store)[0];
		const f =
			_.isArray(rule.fields) === false || _.size(rule.fields) < 1
				? "all"
				: rule.fields;
		const ns = this.stores[options.store].getStore;

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

	// eslint-disable-next-line
	stateDidUpdate() {

	}

	unmount(options = null) {
		const list = _.isArray(options) ? options : this.storesRules;
		_.map(list, rules => {
			if (
				typeof rules.store === "undefined" ||
				typeof this.storesRules[rules.store] === "undefined"
			)
				global.console.log(
					`You are tried unsubscribe store which was not subscribed: ${rules.store} \r\n Check super.unmount() call in class: '${this
						.constructor.name}'`
				);
			else this.unsubscribe[rules.store]();
		});
	}
}

export default ComposnentStateStore;
