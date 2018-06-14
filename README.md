# BBT - Provider
Storage for object structure data with subscribing for changes in fields of this data.

__TypeScript friendly__ - library contains a declaration file ```index.d.ts```

## Install
__Not published at moment__
```
npm i bbt-provider
```

## Simple usage 
```javascript
import { Provider } from "bbt-provider";

const provider = new Provider({ inner: { num: 23 } });

const numCell = provider.getChild(["inner", "num"]);
numCell.get();  // 23;

// Callback will be called each time the value is changed
numCell.subscribe((value, prevValue) => {
  console.log(value);     // 42
  console.log(prevValue); // 23
});

// Change value
numCell.set(42);
// Subscribed callback will be call now

numCell.get(); // 42;

// Field value been changed in all parents
provider.get();   // { inner: { num: 42 } }

const innerNode = provider.getChild("inner");
innerNode.get();  // { num: 42 }
```