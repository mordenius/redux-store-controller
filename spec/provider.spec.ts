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
	it("Init Provider", (): void => {
		const provider = new Provider(_DATA);
		expect(provider.getChild(["inner", "num"]).get()).toEqual(_DATA.inner.num);
	});
});
