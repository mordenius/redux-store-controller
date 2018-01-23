const ControllerStateStore = require("./../../lib/controllerStateStore.js")
	.default;

module.exports = class TestController extends ControllerStateStore {
	stateDidUpdate() {
		console.log(this.state);
	}
}
