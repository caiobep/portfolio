---
id: "2b3891a0-a1cd-4549-8089-db53bda1709c"
date: "2020-04-25T16:59:00.000Z"
title: "Computer Science Series: Parallelism"
summary: "Learn about parallelism in computer science, including Amdahl's Law, pipelining, and concurrency. Discover how to optimize tasks for speed and efficiency."
readTime: undefined
tagIds: ["cf9e8fbb-d012-457e-9292-fa90e7e8b5a2","ed316d45-b88a-48a5-920a-5a2a154bcbe5","56275194-6e13-4cd3-ae9a-4a285a880bcb","a82004cd-5435-4ab5-af04-c0898ae2044c","ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"cf9e8fbb-d012-457e-9292-fa90e7e8b5a2","name":"Brilliant","icon":""},{"id":"ed316d45-b88a-48a5-920a-5a2a154bcbe5","name":"Study","icon":"🧠"},{"id":"56275194-6e13-4cd3-ae9a-4a285a880bcb","name":"Computer Science","icon":""},{"id":"a82004cd-5435-4ab5-af04-c0898ae2044c","name":"Software Engineering","icon":"⚙"},{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
By the end of this topic you will learn

- [x] _Amdahl's law, an important piece of common-sense mathematics for computer scientists_
- [x] _pipelining, a form of parallelism that enables advanced computer graphics_
- [x] _concurrency and how it's managed to let the many apps on your phone run at the same time_

Flash Cards


When multiple workers can split up a problem without adding much extra coordination overhead, computer scientists sometimes call the problem _**embarrassingly parallel.**_

<details>
<summary>Code to solve the problem</summary>

```javascript
const timeToCutTheDoghIntoTriangles = 2
const timeToSpreadFillingOntoTriangles = 4
const timeToRollFilledTrianglesIntoCrescents = 10
const timeToPlacePastriesIntoTheOven = 20
const timeToRemovePastriesFromTheOven = 4
const timeToLeftThePastriesCool = 10

const sum = (...args) => args.reduce((sum, item) => sum + item, 0)

const workers = 2

const parallelWork = sum(
    timeToCutTheDoghIntoTriangles,
    timeToSpreadFillingOntoTriangles,
    timeToRollFilledTrianglesIntoCrescents,
    timeToRemovePastriesFromTheOven,
) //?

const notParallelWork = sum(
    timeToLeftThePastriesCool,
    timeToPlacePastriesIntoTheOven
) //?

const pierreTotalTime = sum(
    timeToCutTheDoghIntoTriangles / workers,
    timeToSpreadFillingOntoTriangles / workers,
    timeToRollFilledTrianglesIntoCrescents / workers,
    timeToPlacePastriesIntoTheOven,
    timeToRemovePastriesFromTheOven / workers,
    timeToLeftThePastriesCool,
) //? 

const bakeryTime = sum(
    parallelWork / 16,
    notParallelWork
) //?

const desiredTime = 35
 parallelWork
 workers
 notParallelWork

const workersNeededFor5MinutesGain = (
    parallelWork / - (notParallelWork - (40 - 5))
) //?


70 - 90 //?

const pierreAverageProductionPerMinute = (
    200 / 20
) //?


const averagePasteriesForMinute = (
    200 / 30
) //?
```


</details>


![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d1f11336-cbed-44c8-ad8f-18834bc84744/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020109Z&X-Amz-Expires=3600&X-Amz-Signature=0c770126463780d4c9b9f1ec804f0fb4e7f197c264fa1541f8f71c9068984a67&X-Amz-SignedHeaders=host&x-id=GetObject)


[_**Gene Amdahl**_](https://en.wikipedia.org/wiki/Gene_Amdahl)


## Not all tasks can be done in Parallel


When you think about parallel and non-parallel tasks it should be obvious that adding more workers will only make you faster at the parts of a task that can be done in parallel. [_**Amdahl's law**_ ](https://en.wikipedia.org/wiki/Amdahl%27s_law)says that we cannot make a task faster just by putting more agents into the task. This conclusion came after a paper from _**Gene Amdahl**_  in 1967


![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/89fbdc23-d3ca-4d7b-a278-d2d16f37fb7e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020110Z&X-Amz-Expires=3600&X-Amz-Signature=0c2fac449ef18c36036b13d844b9df3cf834717ff52ba37100b8c18b35516bb5&X-Amz-SignedHeaders=host&x-id=GetObject)


![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d72f66ef-6493-43fc-9f49-3359b7947540/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020110Z&X-Amz-Expires=3600&X-Amz-Signature=d97994b0b40266c618b5e2bccb0b8fbe14c6587b7607ffe09c03b36d23cd9555&X-Amz-SignedHeaders=host&x-id=GetObject)


## Pipelining


Pipelining is a very common form of parallelism when you think about making cookies or bread. When you want to make a huge amount of food you often will nee to create a pipeline for making this tasks parallel for. For example, let's say you're baking 2 cakes, and your oven can only fit one. In order to optimize your cake-per-minute ratio you can prepare another cake while your other cake is in the oven. 


This form of parallelism is called _Pipelining._ By working on different branches of your work in parallel.


![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/fbcf8129-a7c9-48de-882d-d08849baaa80/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020109Z&X-Amz-Expires=3600&X-Amz-Signature=29d9b45d6157c0b096c3e5228f169e4bf455cfa39417fba7282126b5d34911a0&X-Amz-SignedHeaders=host&x-id=GetObject)


Pipeline is also used in computer generated graphics to predict which chunks it will need to render next. This concept is called _speculative execution._


![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2538d496-4ef9-40d1-9233-59b288bf1a4a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020111Z&X-Amz-Expires=3600&X-Amz-Signature=96eb1b69a7acc6405ef90ddebc7ad42e74b19cd641c65b5fcc817fd08272cf75&X-Amz-SignedHeaders=host&x-id=GetObject)


## Concurency


**Concurency** is the name for situations where multiple agents each want a turn at having exclusive access to the same resource. It sometimes show up in similar places as parallelism, but concurrency occurs when there's no way to plan in advance for the order in which things will happen.


One method for dealing with Concurrency is called the [_**Bakery Algorithm**_](https://en.wikipedia.org/wiki/Lamport%27s_bakery_algorithm) and it was devised by [**Leslie Lamport**](https://en.wikipedia.org/wiki/Leslie_Lamport)


[_**Leslie Lamport**_](https://en.wikipedia.org/wiki/Leslie_Lamport)


### This Quiz

- [ ] The most common kind of parallelism is splitting up a problem and assigning it to different workers
- [ ] If you can't use parallelism on every part of the problem, adding more and more workers may not help you very much
- [ ] When you need to work on different problems at the same time, it can be useful to use _pipeline parallelism_
- [ ] When different tasks need exclusive access to a single shared resource in an unpredictable order, you are dealing with concurrency
- [ ] Concurrency and parallelism show up in many of the same places, but they are different ideas.

Flash Cards

