import { Provider } from "./../source/ts/index";

describe("Provider case", (): void => {
	it("Init Provider", () => {
		const provider = new Provider({
			apple: "red",
			pinapple: true,
			color: 24,
			inner: {
				level: "inner level"
			}
		});

		console.log(provider.tree.inner.data.level.data);
	});
});
