const Stores = require("./../../lib/index.js").default;
const Controller = require("./controllerStateStore-test");

console.log(Stores.getField("data.field2") || "not exist");

// const ErrorStore = {};
const options = {
	someFiled: "some-value",
	// stores: ErrorStore,
	stores: Stores,
	rules: [{ field: "data.field" }, { field: "data.field2" }]
};

const contr = new Controller(options);

console.log(`Controller state:`, contr.state);

Stores.set({ data: { field: "dq" } });

setTimeout(() => {
	Stores.set({ data: { field2: "11dq" } });
}, 3000);
