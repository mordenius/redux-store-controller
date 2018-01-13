const Stores = require("./../lib/index.js").default;

// console.time("test")
const unWatch = Stores.watch("data.field", ()=> {
	// console.log(v)
});

const unWatch2 = Stores.watch("data", ()=> {
	// console.log(v)
});

// console.log(Stores.watchers);

//
Stores.set({ data: { field: "dq"}})
// console.log(Stores.watchers);
Stores.setField("data.field", "www");
unWatch();
// console.log(Stores.watchers);
unWatch2()

// console.timeEnd("test")


