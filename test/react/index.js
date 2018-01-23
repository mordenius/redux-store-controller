const { createElement } = require("react");
const { render } = require("react-dom");

const Stores = require("./../../lib/index.js").default;
const Component = require("./componentStateStore-test");

console.log(Stores.getField("data.field2") || "not exist");

// const ErrorStore = {};
const options = {
	someFiled: "some-value",
	// stores: ErrorStore,
	stores: Stores,
	rules: [{ field: "data.field" }, { field: "data.field2" }]
};

const elem = createElement(Component, options);

// eslint-disable-next-line
const cont = document.getElementById("container");
render(elem, cont);

Stores.set({ data: { field: "dq" } });

setTimeout(() => {
	Stores.set({ data: { field2: "11dq" } });
	console.log(Stores.getField("data.field2"));
}, 3000);
