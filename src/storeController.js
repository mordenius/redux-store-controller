class StoreController {
	constructor(options){
		this.storeList = options.storeList;
		this.initStores();
	}

	initStores(){
		for(let n in this.storeList){
			this[this.storeList[n].name] = new this.storeList[n].store;
		}
	}
}

export default StoreController;