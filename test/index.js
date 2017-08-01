import stores from "./storeController";
import { ControllerStateStore } from "./../lib/index";

class ExampleController extends ControllerStateStore {
	constructor() {
		super({
			stores: stores
			// storesRules: [
			// 	{
			// 		store: "testStore",
			// 		fields: ["object", "number"]
			// 	}
			// ]
		});
		console.log("NEED BE AFTER INIT");
		console.log(this.state);
	}

	init() {
		stores.testStore.set({number: 22});
		setTimeout(() => {stores.testStore.reset();}, 2000);

	}

	stateDidInit(){
		console.log("State did init.");
		console.log(this.state);
	}

	stateDidUpdate() {
		console.log("State did update.");
		console.log(this.state);
	}
}

const controller = new ExampleController().init();
