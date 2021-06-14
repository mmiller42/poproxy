# poproxy

> Preserved Order Proxy

poproxy is a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) constructor that preserves the original order of properties as they are assigned to the object, ignoring the [exceptions that apply to numbers and symbols](https://2ality.com/2015/10/property-traversal-order-es6.html).

## Example

```ts
import { preserveOrder } from "poproxy";

interface Foo {
  a: string;
  b: string;
  "0": string;
  "1": string;
}

const foo: Partial<Foo> = {};
const proxy = preserveOrder<Foo>(foo);

proxy.b = "b";
proxy[1] = "1";
proxy["0"] = "0";
proxy.a = "a";

Object.keys(foo); // ["0", "1", "b", "a"]
JSON.stringify(foo); // {"0":"0","1":"1","b":"b","a":"a"}

Object.keys(proxy); // ["b", "1", "0", "a"]
JSON.stringify(proxy); // {"b":"b","1":"1","0":"0","a":"a"}
```

Just like normal objects, if a property is deleted and then assigned, it will be appended rather than returning to its previous position:

```ts
delete proxy.b;
proxy.b = "B";

Object.keys(foo); // ["0", "1", "a", "b"]
JSON.stringify(foo); // {"0":"0","1":"1","a":"a","b":"B"}

Object.keys(proxy); // ["1", "0", "a", "b"]
JSON.stringify(proxy); // {"1":"1","0":"0","a":"a","b":"B"}
```
