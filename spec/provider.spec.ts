import { Provider } from "./../source/ts/index";
import { Cell } from "../source/ts/cell";

const _DATA = {
	bol: true,
	str: "string",
	num: 23,
	inner: {
		bol: false,
		num: 42,
		nu: null
	}
};

describe("Provider case", (): void => {
	const provider = new Provider(_DATA);

	it("Init Provider", (): void => {
		expect(provider.getChild(["inner", "num"]).get()).toEqual(_DATA.inner.num);
	});

	it("First level node", (): void => {
		const innerNode = provider.getChild(["inner"]);
		const innerData = innerNode.get();
		expect(innerData.num).toEqual(_DATA.inner.num);
	});

	it("Cell with null", (): void => {
		const nuNode = provider.getChild(["inner", "nu"]) as Cell;
		expect(nuNode.get()).toBeNull();
		nuNode.set("not Null");
		expect(nuNode.get()).toEqual("not Null");
	});
});
