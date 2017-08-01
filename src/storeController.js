import _ from "lodash";
import StoreClass from "./storeClass";

class StoreController {
	constructor(options) {
		this.storeList = options.storeList;
		this.initStores();
	}

	initStores() {
		_.forEach(this.storeList, rule => {
			const Store = typeof rule.store === "undefined" ? StoreClass : rule.store;
			this[rule.name] = new Store(StoreController.validateOptions(rule));
		});
	}

	static validateOptions(rule) {
		const options = typeof rule.options === "undefined" ? {} : rule.options;
		if (typeof options.initState === "undefined") options.initState = {};
		return options;
	}
}

export default StoreController;
