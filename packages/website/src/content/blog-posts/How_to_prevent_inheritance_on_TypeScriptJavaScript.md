---
id: "604e414a-faef-4079-8640-8d29f7de5928"
date: "2022-05-31T00:05:00.000Z"
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

