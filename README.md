# redux-store-controller 

---
[![npm version](https://img.shields.io/npm/v/redux-store-controller.svg)](https://www.npmjs.com/package/redux-store-controller)
[![node](https://img.shields.io/node/v/gh-badges.svg)](https://github.com/mordenius/redux-store-controller)
[![build status](https://travis-ci.org/mordenius/redux-store-controller.svg?branch=master)](https://travis-ci.org/mordenius/redux-store-controller)
[![dependencies Status](https://david-dm.org/mordenius/redux-store-controller/status.svg)](https://david-dm.org/mordenius/redux-store-controller)
[![devDependencies Status](https://david-dm.org/mordenius/redux-store-controller/dev-status.svg)](https://david-dm.org/javiercf/redux-store-controller?type=dev)
---

Module for [redux](https://www.npmjs.com/package/redux) stores.

## Installation

```
npm install redux-store-controller
```

## StoreClass
### Usage

```javascript
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

```javascript
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


## Simple StoreClass usage

```javascript
import {StoreClass} from 'redux-store-controller';

let someStore = new StoreClass({}) {
someStore.set({someField: someValue});
console.log(someStore.getStore); // {someField: someValue}

export default someStore;
```

**set**
Can be use the ```set ({})``` method for a simple way to update the full state of the store.

## StoreController
### Usage
```javascript
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

if ```store``` field in ```storeList``` will be missing or contains undefined value, Controller will create store from StoreClass.