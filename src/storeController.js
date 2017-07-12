import _ from "lodash";
import StoreClass from "./storeClass";

class StoreController {
	constructor(options) {
		this.storeList = options.storeList;
		this.initStores();
	}

	initStores() {
		_.forEach(this.storeList, rule => {
			const store = typeof rule.store === 'undefined' ? StoreClass : rule.store;
			this[rule.name] = new store(this.validateOptions(rule));
		})
	}

	validateOptions(rule){
		if(typeof rule.options === 'undefined') rule.options = {};
		if(typeof rule.options.initState === 'undefined') rule.options.initState = {};
		return rule.options;
	}
}

export default StoreController;
