import includes from "lodash/includes";

class SubscriptionMapController {
	static checkStoresRules(options) {
		const stores = options.stores;
		const map = stores.subscriptionMap;

		if (typeof map === "undefined") {
			global.console.warn(`RSC: You have not any subscription map.`);
			return {};
		}

		if (typeof map[options.childName] === "undefined") {
			global.console.warn(
				`RSC: You have not any subscription map for class ${options.childName}`
			);
			return {};
		}

		return SubscriptionMapController.validateRules({
			rules: map[options.childName],
			childName: options.childName
		});
	}

	static validateRules(options) {
		if (typeof options.rules.storesRules === "undefined") {
			global.console.warn(
				`RSC: You have not 'storesRules' for class ${options.childName} in subscription map.`
			);
			return {};
		}
		return options.rules.storesRules;
	}

	static checkReunionMethod(options) {
		let resultMethod = options.method;

		if (typeof options.method === "undefined") {
			const stores = options.stores;
			const map = stores.subscriptionMap;

			if (
				typeof map[options.childName] === "object" &&
				typeof map[options.childName].reunionMethod === "string"
			)
				resultMethod = map[options.childName].reunionMethod;
		}

		const valid = ["assign", "merge", "hard"];
		return includes(valid, resultMethod) ? options.method : "assign";
	}
}

export default SubscriptionMapController;
