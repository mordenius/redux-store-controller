import forEach from "lodash/forEach";
import StoreClass from "./storeClass";
import SubscriptionMapController from "./subscriptionMapController";

class StoreController {
	constructor(options) {
		this.storeList = options.storeList;
		this.initStores();
		this.subscriptionMap = new SubscriptionMapController({ map: options.subscriptionMap, stores: this });
	}

	initStores() {
		forEach(this.storeList, rule => {
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
