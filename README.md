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
		super({initState: {page: null}});
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
Reducer.

**subscribe**
Subscribe for change store events.

**set**
**assign**
**merge**
**reset**
Handlers for state change

```javascript
update(state, action){
    switch(action.type){
        ...
        case "UPDATE":
        	return action.value;
        case "ASSIGN":
        	return StoreClass.assignation(state, action.value);
        case "MERGE":
        	return StoreClass.merging(state, action.value);
        default:
        	return state;
        ...
    }
}
```
## Simple StoreClass usage
```javascript
import {StoreClass} from 'redux-store-controller';

let someStore = new StoreClass({}) {
someStore.set({someField: someValue});
console.log(someStore.getStore); // {someField: someValue}

export default someStore;
```

**set**
Can be use the ```set ()``` method for a simple way to update the full state of the store.

## StoreController
### Usage
```javascript
import {StoreController} from 'redux-store-controller';

let options = {
    storeList: [
        {
            name: <storeName>,
            store: <storeClass>,
            options: {
            	initState: {
            		page: "home"
            	}
            }
        }
    ]
}

let stores = new StoreController(options);

stores.<storeName>.<do_something>
```

if ```store``` field in ```storeList``` will be missing or contains undefined value, Controller will create store from StoreClass.

[__not necessary__] Field ```options``` contains a object of params which will insert in StoreClass constructor.
```options.initState``` - contains state of redux store on the initialisation.

## Extends ControllerStateStore
The ControllerStateStore class independently implements the subscription, validation of the status fields and the synchronization of the state of the storage and its own, through the rules obtained in the arguments of the class constructor.

### Rules for class configuration
```javascript
{
  stores: storeController,
  storesRules: [
    {
      store: "testStore",
      fields: ["object"]
    }
  ],
  reunionMethod: "assign"
}
```


A set of rules consists of an object with key fields:
***Stores*** - a reference to an instance of the StoreController class.
***StoresRules*** - synchronization rules.
***Store*** is the name of the redux store.
***Fields*** - an array of the string names of the store state fields.
***ReunionMethod*** - method of state synchronization.

The ***storesRules*** array can contain an unlimited number of sets of store names and their status fields.

Each storage will be subscribed, and all the fields mentioned are synchronized with the state of the instance of the ControllerStateStore class.


***Fields*** are not required:
```javascript
{
  stores: storeController,
  storesRules: [
    {
      store: "testStore"
    }
  ]
}
```

In this case, the synchronization will extend to all the fields of the ```testStore``` store.

The ```reunionMethod``` field is also optional. By default, its value is equal to the string "assign". When a rule is declared, it can take one of the following values:
- assign
- merge
- hard

The synchronization logic by the rule of the synchronization method is similar to the StoreClass methods, respectively:
- .assign ()
- .merge ()
- .set ()


### Exaple
```javascript

import { StoreController } from "redux-store-controller";
import { ControllerStateStore } from "redux-store-controller";

const storeConfig = [
  {
    name: "testStore",
    options: {
      initState: { 
        st: "string", 
        2: 2
        qw: "qwerty", 
        zx: 22,
        mnbvc: "Text" }
    }
  }
]

const Stores = new StoreController({ storeList: storeConfig  })


import ControllerStateStore from "redux-store-controller";

class ExampleController extends ControllerStateStore {
  constructor() {
    super({
      stores: Stores,
      storesRules: [
        {
          store: "testStore",
          fields: ["st", "qw", "zx"]
        }
      ],
      reunionMethod: "assign"
    })

    console.log(this.state); // { st: "string", qw: "qwerty", zx: 22 }
  }
}
```


The specified synchronization rules place the fields and their contents (_storesRules.fields_) - ```"st", "qw", "zx"``` from the store (_storesRules.store_) - ```Stores.testStore``` in the state parameter of the class - ```this.state```. 

### Tracking changes
Let's append some code into the previous example:

```javascript
…
// StoreController init
…

import ControllerStateStore from "redux-store-controller";

class ExampleController extends ControllerStateStore {
  constructor() {
    super(rules);
    console.log(`Initial state`);
    console.log(this.state);
  }

  stateDidInit() {
    console.log(`First state set`);
    console.log(this.state);
  }

  stateDidUpdate() {
    console.log(`State changed`);
    console.log(this.state);
  }
}
```

We have redefined the methods of the inherited ControllerStateStore class: ```stateDidInit()``` and ```stateDidUpdate()```.

Which are called by internal logic of class ControllerStateStore by the following principle:
- ```stateDidInit()``` - when the state of the class (initialization) is changed for the first time.
- ```stateDidUpdate()``` - for all subsequent changes.


The ```stateDidUpdate()``` method ***will not be called*** in cases if the state of the repository has changed, but none of the fields specified in (```storesRules.fields```) is equal to the current values ​​of these fields in the state of the class - ```this.state```.


The ```stateDidUpdate()``` method ***will be called*** if the value of at least one of the monitored fields has changed.


Next, we create an instance of the ```ExampleController``` class and manipulate the ```testStore```:
```javascript
const exampleController = new ExampleController();

Stores.testStore.set( {st: 87643} )
```

In the console we see:
```javascript
Initial state
{}

First state set
{ st: "string", qw: "qwerty", zx: 22 }

State changed
{ st: 87643, qw: undefined, zx: undefined }
```

If the monitored field is not in the store state, its value in the state of the class (```this.state```) will be ***undefined***.

### Unsubscribing
Unsubscribing to one, several, or all repositories is implemented by calling the ```unmount()``` method.

As an ***argument***, the ```unmount()``` method takes an array of objects of the form:
```javascript
{
  store: "testStore"
}
```

By enumerating the array objects, the subscription for changing the states of all the specified repositories will be canceled.

The names of repositories that are not subscribed to will be ignored.

If there is no argument, when ```unmount()``` is called, all active subscriptions of the class are canceled.

## Extends ComponentStateStore 
The internal logic of the ```ComponentStateStore``` class is identical to the ```ControllerStateStore``` with differences, due to the adaptation of this class for use as a ***React Component***.

## Subscription map
As a parameter to the ```StoreController``` class argument, you can add a map of the ***rules for subscriptions*** to changes in storage states for further automatic use when inheriting the ```ControllerStateStore``` and ```ComponentStateStore``` classes.

```javascript
import { StoreController } from "redux-store-controller";

const stores = new StoreController({ storeList: storeConfig, subscriptionMap: map  })
```

### Map Structure
```javascript
[
 {
 	 "class": "ExampleController",
   "storesRules": [
     {
       "store": "testStore",
       "fields": ["object"]
     }
   ],
   "reunionMethod": "assign"
 },
  {
	 "class": "SecondController",
   "storesRules": [
     {
       "store": "testStore",
       "fields": ["object"]
     }
   ],
   "reunionMethod": "assign"
 },
 {
 	 "component": "SomeComponent",
   "storesRules": [
     {
       "store": "testStore",
       "fields": ["object"]
     }
   ],
   "reunionMethod": "assign"
 }
]
```

### Example
Let's declare some stores and rules subscription for them:
```javascript
const storeConfig = [
  {
    name: "testStore",
    options: {
      initState: { 
        st: "string", 
        2: 2
        qw: "qwerty", 
        zx: 22,
        mnbvc: "Text" }
    }
  }
]

const map = [
 {
 	class: "ExampleController",
   storesRules: [
     {
       store: "testStore",
       fields: ["st", "qw", "zx"]
     }
   ],
   reunionMethod: "assign"
 }
]
```

Next, create an instance of the class ```StoreController```:
```javascript
import { StoreController } from "redux-store-controller";

const Stores = new StoreController({ storeList: storeConfig, subscriptionMap: map  })
```

Now let's see the difference between declare subscription rules in ```super()``` and the use some ***subscription map***
```javascript
import { ControllerStateStore } from "redux-store-controller";

class ExampleController extends ControllerStateStore {
  constructor() {
    super({
      stores: Stores,
      storesRules: [
        {
          store: "testStore",
          fields: ["st", "qw", "zx"]
        }
      ],
      reunionMethod: "assign"
    })

    console.log(this.state); // { st: "string", qw: "qwerty", zx: 22 }
  }
}

class ExampleController extends ControllerStateStore {
  constructor() {
    super({stores: Stores, "name": "ExampleController"})

    console.log(this.state); // { st: "string", qw: "qwerty", zx: 22 }
  }
}
```