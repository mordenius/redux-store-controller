import {createStore} from 'redux';

class StoreClass {
	constructor(initialState){
		this._store = createStore(this.update.bind(this), initialState);
	}

	get getStore(){
		return this._store.getState();
	}

	update(state, action){
		return state;
	}

	reset(){
		this._store.dispatch({type: 'RESET'});
	}

	subscribe(func){
		let unsub = this._store.subscribe(func);

		return function unsubscribe(){
			unsub();
		}
	}
}

export default StoreClass;