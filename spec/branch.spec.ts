import { Branch } from "./../source/ts/branch";

const _DATA = {
	bol: true,
	str: "string",
	num: 23,
	inner: {
		bol: false,
		num: 42
	}
};

const parentListenerDummy = (): void => {
	/* - */
};

describe("Branch case", (): void => {
	const branch = new Branch();

	describe("Branch expected usage", () => {
		xit("Cell listener call", (next: () => void): void => {
			// --
		});
	
		it("Append cell", (): void => {
			branch.addCell("num", _DATA.num, parentListenerDummy);
			expect(branch.getChild(["num"]).get()).toEqual(_DATA.num);
		});
	
		xit("Remove Cell", (): void => {
			// --
		});
	
		xit("Node listener call", (next: () => void): void => {
			// --
		});
	
		xit("Append Node", (): void => {
			// --
		});
	
		xit("Remove Node", (): void => {
			// --
		});
	});

	xdescribe("Branch Exeptions", (): void => {
		xit("Get not exist child", (): void => {
			// --
		});
	});
});
