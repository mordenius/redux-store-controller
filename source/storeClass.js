import assign from "lodash/assign";
import each from "lodash/each";
import get from "lodash/get";
import has from "lodash/has";
import pull from "lodash/pull";
import set from "lodash/set";
import startsWith from "lodash/startsWith";
import unset from "lodash/unset";

export default class StoreClass {
	state = {};
	watchers = {};

	getField(field) {
		return get(this.state, field);
	}

	set(data) {
		assign(this.state, data);

		each(this.watchers, (val, key) => {
			if (has(data, key))
				each(val, v => {
					v(this.getField(key));
				});
		});
	}

	setField(field, value) {
		set(this.state, field, value);

		each(this.watchers, (val, key) => {
			if (startsWith(field, key))
				each(val, v => {
					v(this.getField(key));
				});
		});
	}

	watch(field, cb) {
		if (typeof this.watchers[field] === "undefined")
			this.watchers[field] = [cb];
		else this.watchers[field].push(cb);

		return () => {
			pull(this.watchers[field], cb);
			if (this.watchers[field].length < 1) unset(this.watchers, field);
		};
	}
}
