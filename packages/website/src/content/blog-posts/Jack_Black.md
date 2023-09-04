---
id: "feff42da-5047-4608-a2e6-7cb27e665b9d"
date: "2020-12-21T13:12:00.000Z"
title: "Jack Black"
summary: undefined
readTime: undefined
tagIds: ["962d96b9-cc1a-477a-bc08-3c7859ca4a8d","59a13570-cb4e-4585-82f8-fc3ca6984583","ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"962d96b9-cc1a-477a-bc08-3c7859ca4a8d","name":"iOS","icon":""},{"id":"59a13570-cb4e-4585-82f8-fc3ca6984583","name":"Swift","icon":""},{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
I was playing [Resident Evil 7 - Biohazard](https://www.notion.so/a1fe78db751043cfb5a2b719145d6bca) _**DLC's**_ with my brother and I decided that the game 21 aka _**Jack Black**_ was easy enough to help me practice my [Swift](https://www.notion.so/59a13570cb4e458582f8fc3ca6984583) programming skills. And so I did:


<figure>
    <iframe src="https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FFN4SEOnuYzRfzjDyVpgZfI%2FBlack-Jack%3Fnode-id%3D1%253A247"></iframe>
    <figcaption></figcaption>
  </figure>


<figure>
    <iframe src="https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FFN4SEOnuYzRfzjDyVpgZfI%2FBlack-Jack%3Fnode-id%3D0%253A1"></iframe>
    <figcaption></figcaption>
  </figure>


[bookmark](https://github.com/caiobep/black-jack)


I have used Swift-UI to create this project. During the project creation I have faced some issues not with swift but the I code things. 


Since I have a very strong React background, I'm used to write screen logic very close to the UI. Both in this project and in my [Section 15: Day 15 - Intermediate - Local Development Environment Setup & the Coffee Machine](https://www.notion.so/652ecb1fff5a48969f7e225d182b5df4) I have noticed that this approach could lead to some issues. 


The main issue is decoupling. Since the business logic is very close to the UI interactions it becomes hard to read the business logic only, and to Unit test the code. Using [React](https://www.notion.so/6d7349448de14cf08917575cf0440cc9) we have the amazing _**React Testing Library**_ that allows us to create _"integration UI"_ tests that at the same time also tests the "_front-end code"._


A lot of resources like [Untitled](https://www.notion.so/f2d4e8c2372842e89b11d3ccaa3ddc49) and [Untitled](https://www.notion.so/906bc7c6bc314cb09ec75ef8df4162cd) approach this by creating a diagram and drawing the solution before actually coding. I have never tried this before, which makes me inclined to try this next. 


Another great approach described by [Bob Martin](https://www.notion.so/b3fc06746b244db8bb7b2794842d9e52) is by refactoring the code after it works, letting TDD create the architecture, always focusing in not letting framework-specific abstractions touch your business implementation.


Retrospective

