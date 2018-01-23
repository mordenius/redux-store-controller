const { createElement } = require("react");
const ComponentStateStore = require("./../../lib/componentStateStore.js")
	.default;

module.exports = class TestComponent extends ComponentStateStore {
	render() {
		return createElement("h1", null, this.state["data.field2"]);
	}
}
