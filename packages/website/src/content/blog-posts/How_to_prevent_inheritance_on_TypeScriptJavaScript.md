---
id: "b17f896b-adf1-402f-bcd9-0e9b262e50bb"
date: "2021-09-22T02:59:00.000Z"
title: "How to prevent inheritance on TypeScript/JavaScript"
summary: undefined
readTime: undefined
tagIds: ["ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
"There is no direct way to prevent subclassing in TypeScript. The indirect way is to add a check in the constructor to prevent instantiating a different prototype from the one creating the object:


```typescript
class A {

  constructor() {

     this.subClassCheck();

  }

  private subClassCheck(): never | void {

     if (Object.getPrototypeOf(this) !== A.prototype) {

        throw new Error("Cannot extend this class.");

     }

  }

}

class B extends A {}

let a = new A(); // OK

let b = new B(); // fail

```

