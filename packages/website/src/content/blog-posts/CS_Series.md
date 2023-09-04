---
id: "c31281ee-e65a-4fb9-ba0d-393d54676695"
date: "2020-03-09T12:22:00.000Z"
title: "CS Series:  "
summary: "\"Unlocking the Mysteries of Memory in Computing\" explores the fundamental concepts of memory in computing, including bounded memory slots, binary storage, and the use of pointers. Learn why understanding memory is crucial to understanding data structures and optimizing algorithms."
readTime: undefined
tagIds: ["fffa10ea-d586-4b9d-a397-f7e3a0db635f","ed316d45-b88a-48a5-920a-5a2a154bcbe5","a82004cd-5435-4ab5-af04-c0898ae2044c","56275194-6e13-4cd3-ae9a-4a285a880bcb","ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"fffa10ea-d586-4b9d-a397-f7e3a0db635f","name":"Systems Design Fundamentals","icon":""},{"id":"ed316d45-b88a-48a5-920a-5a2a154bcbe5","name":"Study","icon":"🧠"},{"id":"a82004cd-5435-4ab5-af04-c0898ae2044c","name":"Software Engineering","icon":"⚙"},{"id":"56275194-6e13-4cd3-ae9a-4a285a880bcb","name":"Computer Science","icon":""},{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
# Memory


The bedrock of all data structures, memory is the underlying concept that you absolutely need to know in order to understand why data structures work the way they do. 


![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d1e76df0-db81-4851-bb1a-28a5753170e8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020110Z&X-Amz-Expires=3600&X-Amz-Signature=039d66973e2b9f1eff5a6a9c93451f787d9faf6581fb7bfe760e1dc170c135b0&X-Amz-SignedHeaders=host&x-id=GetObject)


![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/46c1d7ca-704f-4943-bbe8-9eb2f065e3e4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020110Z&X-Amz-Expires=3600&X-Amz-Signature=4682da1631e72922b5182c0caecf19fff7b6612fdd07da8ef0938f347ba46d1b&X-Amz-SignedHeaders=host&x-id=GetObject)


## Memory

<details>
<summary>Bounded Memory Slots</summary>

The important thing is to Know that memory are bounded, they have a limit.


</details>

<details>
<summary>Stored in Base 2 (Binary)</summary>

Values are stored in Binary


</details>

<details>
<summary>1 Memory slot Can Hold 8bits or 1 Byte</summary>

![Untitled.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9907e964-06c0-41c1-947c-b6f652fe5140/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230904%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230904T020111Z&X-Amz-Expires=3600&X-Amz-Signature=9d7731e74fec3ca4eca981b48f7e39068346d3cfe94bc1b4a6eef420237d2ba8&X-Amz-SignedHeaders=host&x-id=GetObject)


</details>

<details>
<summary>Integer → Fixed Width (32 or 64 bits)</summary>

Integers will always have fixed width (that's what allows us to increment and decrement without having any issues)


</details>

<details>
<summary>Lists → Times Integer Space</summary>

Lists will always fill the space of it's members


</details>

<details>
<summary>🤯 Memory can be filled with memory (Pointers)</summary>

A memory slot can indicate another memory slot


</details>


[Bit](https://www.notion.so/fb687c92bd4d4a97917e4fc271554bc4) 


[Byte](https://www.notion.so/74168e651f59422ca8a68315d76df168) 


[Fixed-width Integer](https://www.notion.so/245284a3456e4e9b87a1660f4ff668f3) 


## Memory


Broadly speaking, memory is the foundational layer of computing where all data is stored.


In the context of coding interviews, it's important node the following points:

- Data stored in memory is stored in bytes and, by extension bits.
- Bytes in memory can "point" to other bytes in memory, so as to store references to other data.
- The amount of memory that a machine has is bounded, making it valuable to limit how memory an algorithm takes up.
- Accessing a byte of a fixed number of bytes (like 4 bytes or 8 bytes in the case of 32-bit and 64-bit integers) is an elementary operation, which can be loosely treated as a single unit of operational work

Flash Cards

