import StoreClass from './storeClass';

class StoreController {
	constructor(options){
		this.storeList = options.storeList;
		this.initStores();
	}

	initStores(){
		for(let n in this.storeList){
			let store = this.storeList[n].store;
			store = ('undefined' == store) ? StoreClass : store;
			this[this.storeList[n].name] = new store;
		}
	}
}

export default StoreController;