import { Provider } from "./../source/ts/index";

const _DATA = {
	bol: true,
	str: "string",
	num: 23,
	inner: {
		bol: false,
		num: 42
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
});
