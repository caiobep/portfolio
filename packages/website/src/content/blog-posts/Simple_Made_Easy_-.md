---
id: "6ee43df1-eeb7-46b2-a8c7-4ca32267743b"
date: "2020-03-18T03:03:00.000Z"
title: "Simple Made Easy - "
summary: undefined
readTime: undefined
tagIds: ["1f1039bf-aa82-40d7-9d94-b1666cb5fd45","ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"1f1039bf-aa82-40d7-9d94-b1666cb5fd45","name":"Talk","icon":"📢"},{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
> _"Simplicity is a prerequisite for reliability"  
>                                                        - Edsger W. Dikstra_


<iframe src="https://www.youtube.com/embed/34_L7t7fD_U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


# Word Origins 


**Simple**

- Sim- plex
- one fold/braid
- vs complex

## Simple

<details>
<summary>One fold/braid</summary>
- One role
- One task
- Once concept
- One dimention

</details>

<details>
<summary>But Not</summary>
- One instance
- One Operation

</details>

- About lacking of interleaving not cardinality
- _**Objective**_

Easy

- ease < aise < adhacebs
- lie near
- vs hard

## Easy

- Near, at hand
	- on our hard drive, in our tool set, IDE, apt get, gem install
- Near to understanding
	- Familiar
- Near our capabilities
- Easy is relative

## Construct vs Artifact

- We focus on experience of use of construct
	- programmer convinience
	- programmer replaceability
- Rather than the long term results of use
	- software quality correctness
	- Maintainable, change
- We must assess constructs by their artifacts

## Limits

- We can only hope to make reliable those things we can understand
- We can only consider a few things at a time
- Intertwined things must be considered together
- Complexity undermines understanding

## Change

- Change to software require analysis and decisions
- What will be impacted?
- Where do changes need to be made?
- Your ability to reason about your program is critical to changing it without fear
	- Not talking about proof, just informal reasoning

## Debugging

- What's true of every bug found in the field?
- it has passed the type checker
	- and all tests
- Your ability to reason about your program is critical to debugging

## Development Speed

- Emphasizing ease gives early speed
- Ignoring complexity will slow you down over the long haul
- On throwaway or trivial projects, nothing much matters

## Easy Yet Complex?

- Many complicating constructs are:
	- Siccinctly described
	- Familiar
	- Available
	- Easy to use
- What matters in the complexity thy _yield_
	- Any such complexity is _incidental_

## Benefits of Simplicity


Lego castles are better than concrete ones.

- Ease understanding
- Ease of change
- Easier debugging
- Flexibility
	- Policy
	- Location (etc)

## Making Things Easy


How easy things are is the distance between you and what you're trying to achieve. Making things simple, will actually make things easier

- Bring to hand by installing
	- getting approved for use
- Become familiar by learning, trying
- But mental capability
	- not going to move very far
	- make things near by simplifying them

## Parens are Hard!

- Not at hand for most
- Nor familiar
- But are they simple?
- Not in CL/Scheme
	- overloaded for calls and grouping
- Adding a data structure for grouping, e.g. vectors makes each simpler
	- overloading is complexity reduced by adding more things

> _"LISP programmers know the value of everything and the cost of nothing."  
>                                                                                                              - Alan Perlis_


Not only benefits! We need to look for trade off's 


## What's in your toolkit?


child_database


## Complect

- To interleave, entwine, braid
- Don't do it!
	- Completing things is the source of complexity
- Best to avoid in the first place

## Compose

- To place together
- Composing simple components is the key to robust software.

## Modularity and Simplicity

- Partitioning and stratification don't imply simplicity
	- but are enabled by it
- Don't be fulled by code organization

## State is Never Simple

- Complects value and time
- It is easy, in the at-handed and familiar senses
- Interweaves everything that touches it, directly or indirectly
	- Not mitigated by modules, encapsulation
- Note - this has nothing to do with asynchrony

## Not all refs/vars are Equal

- None make state simple
- All warn of state, help reduce it
- Clojure and Haskell refs compose value and time
	- Allow you to extract a simple value
	- Provide abstractions of time
- Does your var do that?

## The Complexity Toolkit


child_database


## Environmental Complexity

- Reources, e.g. memory, CPU
- Inherent complexity in implementation space
	- All components contend for them
- Segmentation
	- waste
- Individual policies don't compose

## Abstraction for Simplicity

- Abstract
	- Drawn away
- vs Abstraction as complexity hiding
- I don't know, I don't want to know

> Simplicity is not an objective in art, but one achieves simplicity despite one's self by entering into the real sense of things.


## Lists and Order

- Sequence of thigns
- Does order matter?
	- [first-thing second-thing third-thing ...]
	- [depth width heigh]
- set[x y z]
	- order clearly doesn't matter

## Why Care about Order?

- Complects each thing with the next
- Infects usage points
- Inhibits change
- [name email] → ~~[name phone email]~~

## Order in the Wild


child_database


## Maps, Dammit!

- First class associative data structures
- Idiomatic Support
	- Literals, ancessors, symbolic keys

## Information is Simple

- Don't ruin it
- By hidding it behind a micro-language
	- i.e. a class with information specific methods
	- thwarts generic data composition
	- ties logic to representation du jour
- Represent data as data.

## Encapsulation

- Is for implementation details
- Information doesn't have implementation
	- Unless you added it - why?
- Information will have representation
	- have to pick one

## Can You Move it?

- Litmus test - can you move your subsystems?
	- out of proc, different language, different thread?

## Subsystems Must Have

- Well defined boundaries
- Abstracted operational interface (verbs)
- General error handling
- Taken/return data
	- IPersonInfo -oops!
	- Not just a matter of serializers

## Simplicity is a Choice

- Requires Vigilance, sinsibilities and care
- Your sensibilities equating simplicity with ease and familiarity are wrong
	- Develop sensibilities around entanglement
- Your reliability tools (testing, refactoring, type systems) don't care if simple or not
	- and are peripheral to producing simple software.

## Simplicity Made Easy

- Choose simple constructs over complecity-generating constructs
	- It's the artifacts, not authoring
- Create abstractions with simplicity as a basis
- Simplify the problem space before you start
- Simplicity often means making more things, not fewer.

> _"Simplicity is the ultimate Sophistication"  
>                                           - Leonardo Da Vinci_

