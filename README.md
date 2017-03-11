# redux-store-controller 
Module for [redux](https://www.npmjs.com/package/redux) stores.

## Installation

```
npm install redux-store-controller
```

## StoreClass
### Usage

```
import {StoreClass} from 'redux-store-controller';

class SomeStore extends StoreClass {
	constructor(){
		super({page: null});
	}

	update(state, action){
		switch(action.type){
			case 'UPDATE_PAGE': state.page = action.page; break;
			default: return state; break;
		}

		return state;
	}

	updatePage(page){
		this._store.dispatch({type: 'UPDATE_PAGE', page: page});
	}
}

export default SomeStore;
```

### Methods
**getStore**
Returns current store state.

**update**
Do initial update event.

**reset**
Handler for reset state

```
update(state, action){
    switch(action.type){
        ...
        case 'RESET': <do_something>
        ...
    }
}
```
**subscribe**
Subscribe for change store events.


## StoreController
### Usage
```
import {StoreController} from 'redux-store-controller';

let options = {
    storeList: [
        {
            name: <storeName>,
            store: <storeClas>
        }
    ]
}

let stores = new StoreController(options);

stores.<storeName>.<do_something>
```