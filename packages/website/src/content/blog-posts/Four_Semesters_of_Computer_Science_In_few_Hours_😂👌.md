---
id: "8149301b-98cd-43f8-86ca-aea146f2f78c"
date: "2019-10-27T12:13:00.000Z"
title: "Four Semesters of Computer Science In few Hours 😂👌"
summary: undefined
readTime: undefined
tagIds: ["ec8fa4cc-ca07-4bd9-84d6-40252008d56d","56275194-6e13-4cd3-ae9a-4a285a880bcb","ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"ec8fa4cc-ca07-4bd9-84d6-40252008d56d","name":"Frontend Masters","icon":""},{"id":"56275194-6e13-4cd3-ae9a-4a285a880bcb","name":"Computer Science","icon":""},{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
Is it hot or not? Let's check....


# Introduction


Warning!! The following material is usually disolved in 4 semesters or more in order for students to really grasp this. So do not get frustrated if you don't get it at first.


# Big O


Big O is the way we analyze how efficient algorithms (or code in this case)are, without getting too mired in the details. We can model how much time any function is going to take given n inputs, but in the reality we're interested in the order of **magnitude** of the number and necessarily of the exact figure. 


Example: I don't particularly care if a function takes 300 miliseconds versus 330 miliseconds given 1,000 inputs, but I do care if it takes 300 miliseconds versus 30 seconds. This would be a difference in an order of magnitude, or basically we're saying we only care if the difference is pretty large.


Enter Big O. Think of O as a vacuum that sucks in all the uninportant information and just leaves you with the important stuff. Let's look at a purely mathematical perspective for a second. Say we have the equation `3x² + x + 1`. If we plug in 5, the first item will be 75, the second 5 and the third would be 1. In other words, most of the piece of the pie comes from the first term, to the point we can just ignore the other terms. If we plug huge numbers it becomes even more apparent. IE if we do `5,000,000`. the first term is `75,000,000,000,000` the second is `5,000,000` and the last `1`. A huge gap.


Hence this is what Big O does; We ignore the little parts and concentrate on the big ones. Kepping with  `3x² + x + 1`, the Big O for this equation would be _O(n²)_ where O is just absorbin all the other fluff (including the factor on the biggest term). Just grab the biggest term. So for n terms it's going take us _n*n_ to go though our inputs. So let's see how to derive this from an algorithm


```javascript
function crosAdd(input) {
	var answer = [];
	for (var i = 0; i < input.length; i++) {
		var goingUp = input[i];
		var goingDown = input[input.length - 1 - i];
		answer.push(goingUp + goingDown)
  }
	return answer;
}
```


This is _O(n)_ because we go though all inputs once in a loop


```javascript
function find(needle, haystack) {
	for (var i = 0; i < haystack.length; i++) {
		if (heystack[i] === needle) return true
	}
}
```


Still _O(n)._ Unless we say otherwise we're assuming worst case scenario. In this worst case, the needle would be the last element.


```javascript
function makeTuples(input) {
	var answer = [];
	for(var i=0; i < input.length; i++) {
		for(var j=0; j < input.length, j++) {
			answer.push(input[i], input[j]);
		}
	}
	return answer;
}
```


This would be _O(n²)._ For every input, we have to go though a full loop inside of another full loop, meaning we're doing a lot of work! This is the trick: look for loops. A loop inside of a loop inside of a loop would likewise be _O(n³)._


If we have no loops and just do something and exit/return then it's said we're doing it in constant time, or _O(1)._


We'll get more into it later, but you can also have _O(log n)_ If a code employs a divide-and-conquer strategy (often recursive), meaning as you add more terms, the increases in time as you add input diminishes. We'll talk more about that with merge and quick sort.


# Recursion


When you define something in terms of itself. Has anyone ever used the word you wanted defined in the definition that they gave you? "What is a computer" "It's something that computes things" this would be a _recursive definition_


When we talk about recurson in Computer Science, we are talking about function that calls itself. This technique is especially adept at some problems because of its ability to maintain state at different levels of recursion. 


While recursion can make the code very simple for some problems, it inherently carries a potentially large footprint with it as every time you call the function, it adds another call to the stack. Some problems therefore are better solved in a slightly-more-complicated-but-more-efficient way of iteration (loops) instead of recursion.


# Sorting Algorithms


There are different ways we can use to organize a group of items, here are some strategies you can apply 


## Bubble Sort


Our first sort algorithm. This is often the easiest to conceptualize and a natural way for the brain to think about sorting so it's very typical to do bubble sort first. It's also amongst the least efficient in terms of worst case scenario.


![bubble.gif](https://btholt.github.io/four-semesters-of-cs/img/bubble.gif)


In bubble sort, we're going to loop though the array and compare each index with the index next to it. If those two numbers are out of order (the lesser index's value is greater than the greater index's value) we swap those two numbers places in the array. We keep looping over that array until everything is in place and nothing was swapped during the last iteration.


What's the Big O on this? Well, there's an inner loop to check to see if indexes need to be swapped, and an outer loop that's just checking to see  if anything was swapped. That would be make it _O(n2)._ Not efficient, but a great learning tool. You'll never use bubble sort for anythign serious


## Insertion Sort


Insertion sort is a step more complex but a bit more useful than bubble sort and is occasionally usefull. The worst case scenario for it is similar to bubble sort's but its best case makes it suitable for times when you're pretty sure a list almost sorted or likely already sorted.


![insertion.gif](https://btholt.github.io/four-semesters-of-cs/img/insertion.gif)


We're going to start at the beginning of the list and assume we have a sorted list of length 1 where the first element is only sorted element. Wer're than going to grab the second element, and insert it into the correct spot in our sorted list, either the 0 index or the 1 index, depending if it's smaller or larger than our first element. We now have a sorted list of length 2. We then continue down the line, inserting elements in our sorted side of the list as the unsorted side dwindles


What's the big O? There's an inner loop that goes over your sorted list to find the correct place to insert your item, and outer loop to go over all the numbers. Two loops means _O(n²)_. However since if your list is sorted or nearly so, it can be _O(n)_ in a best case senario and thus well adapted to that scenario.


## Merge Sort


Our first divide and conquer algorithm! Merge sort is actually very useful and one of the easier divide-and-conquer algorithms to understand. It's easier to conceptualize that some of the other ones. A key to merge sort is that it is recursive. If you're struggling to grasp recursion, this is going to be a doubly hard to understand algorithm. 


![merge.gif](https://btholt.github.io/four-semesters-of-cs/img/merge.gif)


The basic gist of merge sort is that you're going to take your big list, and first divide down in two half size lists and recursively call merge sort on those smaller list, which in turn will do the same. The base case is when you have a list of one, at which point you will return that sorted list of one. On the way up the recursive calls, you merge those sorted lists together (preferably by another merge function you'll write) that walks though both lists simultaneosly and inserts the smaller value first, effectively creating a bigger sorted list.


This combined merge with divide-and-conquer recursion proves to be pretty effective. When you call `Array.prototype.sort` it often uses _Merge Sort (_deppending on the engine and the types of the elements in the array.) _MergeSort_ is also stable which just means if you have equivalent elements, it will keep their original order in the array. This is sometimes important and sometimes not. 



_MergeSort's_ Big O is _O(n log n)._ Weird, right? We obviously have to compare everything once, but we don't have to compare everything to everyting like we do with bubble sort. Rather we just have to compare to their local lists as we sort. Not too bad.


_MergeSort's_  space complexity is a bit worst than the previous algorithm at _O(n)_ since we have to create new lists aas we go. It's no awful but nontheless a consideration.


## Quick Sort 


_Quicksort_  is one of the most useful and powerful sorting algorithms out there, and it's not terribly difficult to conceptualize (compared to some algorithms we're not talking about anyway) Above I mentioned the occasionally JavaScript doesn't _MergeSort_ for `Array.prototype.sort` in those other cases, it's usually some variant on quicksort.


![quick2.gif](https://btholt.github.io/four-semesters-of-cs/img/quick2.gif)


It's another divide-and-conquer, recursive algorithm but it takes a slightly different approach. The basic gist is that you take the last element in the list and call the pivot. Everything that's smaller thant the pivot gets put into a "left" list and everything that's greater get's put in a "right" list. You cthen call quick sort on the left and right lists independently (hence the recursion). After those two sorts come back, you concatenate the sorted left list, the pivot, and the right list (in that order). The base case is when you have a list of length 1 or 0, where you just return the list given to you

