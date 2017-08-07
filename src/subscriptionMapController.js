import includes from "lodash/includes";
import find from "lodash/find";

class SubscriptionMapController {
	constructor(options) {
		this.map = options.map;
		this.stores = options.stores;
	}

	getStoreRules(options){
		const findObject = {};
		findObject[options.type] = options.childName;

		const rulesData = find(this.map, findObject);
		if (typeof rulesData === "undefined") {
			global.console.warn(
				`RSC: You have not any subscription map for class ${options.childName}`
			);
			return {};
		}
		return SubscriptionMapController.validateRules({
			rules: rulesData,
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

	checkReunionMethod(options) {
		let resultMethod = options.method;

		if (typeof options.method === "undefined") {
			const findObject = {};
			findObject[options.type] = options.childName;

			const rulesData = find(this.map, findObject);
			if (typeof rules === "undefined") {
				return "assign";
			}

			if (
				typeof rulesData === "object" &&
				typeof rulesData.reunionMethod === "string"
			)
				resultMethod = rulesData.reunionMethod;
		}

		const valid = ["assign", "merge", "hard"];
		return includes(valid, resultMethod) ? options.method : "assign";
	}
}

export default SubscriptionMapController;
