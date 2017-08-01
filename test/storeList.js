const storeList = [
	{
		name: "testStore",
		options: {
			initState: {
				string: "some string",
				number: 78,
				array: ["sdfsdf", 45, ["34", 94, "text here"]],
				object: {
					substring: "substring",
					subnumber: 33,
					subarray: [
						"text",
						"another text",
						343,
						{ a: 1, 2: "b", c: ["c", "d", 23] }
					]
				}
			}
		}
	}
];

export default storeList;
