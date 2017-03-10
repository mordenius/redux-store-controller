class StoreController {
	constructor(options){
		this.stores = options.stores;
		this.initStores();
	}

	initStores(){
		for(let n in this.stores){
			this[this.stores[n].name] = new this.stores[n].store;
		}
	}
}

export default StoreController;