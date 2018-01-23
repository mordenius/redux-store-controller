# redux-store-controller 

---
[![npm version](https://img.shields.io/npm/v/redux-store-controller.svg)](https://www.npmjs.com/package/redux-store-controller)
[![GitHub license](https://img.shields.io/github/license/mordenius/redux-store-controller.git.svg)](https://github.com/mordenius/redux-store-controller.git)
[![build status](https://travis-ci.org/mordenius/redux-store-controller.svg?branch=master)](https://travis-ci.org/mordenius/redux-store-controller)
[![dependencies Status](https://david-dm.org/mordenius/redux-store-controllerstatus.svg)](https://david-dm.org/mordenius/redux-store-controller)
[![devDependencies Status](https://david-dm.org/mordenius/redux-store-controller/dev-status.svg)](https://david-dm.org/javiercf/redux-store-controller?type=dev)
---

Storage for object structure data with subscribing for changes in fields of this data.
Current solution based on [redux](https://www.npmjs.com/package/redux) data storing logic and implemented on the [lodash](https://www.npmjs.com/package/lodash)

## Installation

```
npm i -S redux-store-controller
```

## Quick start
```javascript
// Calling an instance of the storage class
import Stores from "redux-store-controller";

// State storage provides an object data structure
// Now you can set values for the storage state
Stores.set({ data: { field: "value"}})

// Or you can specify the value of a specific field. 
// In this case, the missing structure of the parent fields will be created automatically
Stores.setField("data.field", "new value");


// You have the ability to monitor the status of storage fields

// To subscribe to changes, use the .watch() method, as arguments, 
// you must specify the structural path to the field, in the string format, 
// and the callback function that will be called whenever the value specified for the field, 
// which as first argument changes,  and / or its child fields
const cb = value => { console.log(value) };
const unWatch = Stores.watch("data.field", cb);

// The callback function as an input parameter will get the value of the field (of all its contents) 
// to which you made a subscription


// To cancel a subscription, use:
unWatch();
```

## Inherit subscription classes

These classes implement the synchronization of the state of the storage and own state by subscription to changes, through the rules obtained in the arguments of the class constructor.

A set of rules consists of an array of objects which has obligatory key name "field" with path to field in string type.

If we have next data in Storage state:
```json
{
  "data": { "field": "value" }
}
```

For subscribe on value changes in field "data.field", use follow rule:
```ecmascript 6
{
  rules: [{ field: "data.field" }]
}
```

Also you need insert instance of Storage in inheritance class constructor argument.

### ControllerStateStore

```jsx harmony
import Stores from "redux-store-controller";
import ControllerStateStore from "redux-store-controller/controllerStateStore";

export default class TestController extends ControllerStateStore {
  constructor() {
    const options = {
      stores: Stores,
      rules: [{ field: "data.field" }]
     };
    super(options);
  }
	
  stateDidUpdate() {
    console.log(this.state);
  }
}
```

We have redefined the method of the inherited [ControllerStateStore](#controllerstatestore) class ```stateDidUpdate()```.

Which are called by internal logic of class [ControllerStateStore](#controllerstatestore) for all subsequent changes in subscribed fields.



Not forget about opportunity into ES2015 provides a default class constructor if one is not specified. As such, it is unnecessary to provide an empty constructor or one that simply delegates into its parent class.
```jsx harmony
// FILE: testController.js
import ControllerStateStore from "redux-store-controller/controllerStateStore";

export default class TestController extends ControllerStateStore {
  stateDidUpdate() {
    console.log(this.state);
  }
}
```

```jsx harmony
import Stores from "redux-store-controller";
import TestController from "./testController";

const options = {
  stores: Stores,
  rules: [{ field: "data.field" }, { field: "data.fieldSecond" }]
};

const controller = new TestController(options);

console.log(controller.state); 
// { 
//   "data.field": "value", 
//   "data.fieldSecond": "second value" 
// }
```


### ComponentStateStore
The internal logic of the [ComponentStateStore](#componentstatestore) class is identical to the [ControllerStateStore](#controllerstatestore) with differences, due to the adaptation of this class for use as a ___React Component___.
```jsx harmony
import Stores from "redux-store-controller";
import ComponentStateStore from "redux-store-controller/componentStateStore";
import { createElement } from "react"

export default class TestController extends ComponentStateStore {
  constructor() {
    const options = {
      stores: Stores,
      rules: [{ field: "data.field" }]
     };
    super(options);
  }
	
  render() {
    return createElement("h1", null, this.state["data.field"]);
  }
}
```