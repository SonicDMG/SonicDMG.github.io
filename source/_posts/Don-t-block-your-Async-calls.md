---
title: Don't block your Async calls
date: 2017-04-17 10:31:42
tags:
    - TIL
    - async
    - blocking
    - java
    - killrvideo
categories:
    - Technical
---
Or rather I should be saying that to myself.  So, TIL (today I learned) something simple yet profound while working with asynchronous programming and the [DSE java driver][dsejava].  Ensure that you are properly iterating through your results when making an async call.  You cannot simply iterate all of your rows using a for loop or something along the lines.  Ok, well, technically you can, but if you have more rows than your fetch size the [DSE java driver][dsejava] will throw a big fat error your way letting you know you are blocking within an async call.  I should point that I am still somewhat new to working with asynchronous calls (yes, someone finally pulled up the rock I was under) so for you veterans this may be knowledge already gained from async NOOB 101.  By the way, here is the error the driver threw at me (thank you for doing so DSE driver peeps).

<!-- more -->

```java
Detected a synchronous call on an I/O thread, this can cause deadlocks or unpredictable behavior. This generally happens when a Future callback calls a synchronous Session method (execute() or prepare()), or iterates a result set past the fetch size (causing an internal synchronous fetch of the next page of results). Avoid this in your callbacks, or schedule them on a different executor.
	com.datastax.driver.core.AbstractSession.checkNotInEventLoop(AbstractSession.java:206)
	com.datastax.driver.core.ArrayBackedResultSet$MultiPage.prepareNextRow(ArrayBackedResultSet.java:310)
	com.datastax.driver.core.ArrayBackedResultSet$MultiPage.isExhausted(ArrayBackedResultSet.java:269)
	com.datastax.driver.core.ArrayBackedResultSet$1.hasNext(ArrayBackedResultSet.java:143)
	com.datastax.driver.mapping.Result$1.hasNext(Result.java:102...
```

The reason is stated [here][asyncpaging].  I'll quote it just to be clear "If you consume a ResultSet in a callback, be aware that iterating the rows will trigger synchronous queries as you page through the results. To avoid this, use getAvailableWithoutFetching to limit the iteration to the current page, and fetchMoreResults to get a future to the next page".  Even though I read this before I started into this code I must have glossed over this concept the first time through as my implementation was acting very strange indeed.

Let's look at a simple example.  At this point in my code I already made an aynchronous call with session.executeAsync(), created a future, and returned my results into a callback.  The following examples are within my callback.
In the case below I mapped my results to the UserVideos entity and now I am iterating through those results to do something with each "userVideo" object.
This...DOES NOT work and will throw the error I mentioned above.

*Ehem, I have a utility class handle callbacks if you were wondering where that was.  I wanted to keep the example nice and simple.  Just know that by the time you see ".handle" we are within the callback.*
```java
        FutureUtils.buildCompletableFuture(userVideosMapper.mapAsync(future))
                .handle((userVideos, ex) -> {
                    try {
                        if (userVideos != null) {
                            for (UserVideos userVideo : userVideos) {
                                "do something with userVideo here"
                            }

```
It seems so simple.  I returned my results and now I want to iterate over those results and do something with them, but these aren't synchronous calls that block until complete.  I need to handle them properly from an asynchronous standpoint and only grab those results that have actually been returned.  The rest I will need to fetch with more asynchronous calls.

Again, this is demonstrated very clearly [here][asyncpaging] in the Async paging section.

This...is a snippet pulled from the working code using the example given from the [async][asyncpaging] page I keep referencing.  Now, I see how many items I have remaining without fetching, loop through the remaining items, and break out once I have exhausted the list.  You may not see in my example below, but once I "break;" I exit out and grab futures for any more items that may be left, rinse and repeat.   
```java
        FutureUtils.buildCompletableFuture(userVideosMapper.mapAsync(future))
                .handle((userVideos, ex) -> {
                    try {
                        if (userVideos != null) {
                            int remaining = userVideos.getAvailableWithoutFetching();
                            for (UserVideos userVideo : userVideos) {
                                "do something with userVideo here"

                                if (--remaining == 0) {
                                    break;
                                }
                            }
```
The whole point of this post was to point out a potential "gotcha" with a very simple fix when dealing with asynchronous programming and the [DSE driver for Java][dsejava].  This one tripped me up for a moment until I realized my mistake.  Now that I know better my "futures" are looking bright in deed....see my joke there....ha....haha.....ha...*awkward pause*.  Honestly, this simple change tightend all of my async code up.  No more strange artifacts



[dsejava]: http://docs.datastax.com/en/developer/java-driver/3.2/
[asyncprogramming]: http://docs.datastax.com/en/developer/java-driver/3.2/manual/async/
[asyncpaging]: http://docs.datastax.com/en/developer/java-driver/3.2/manual/async/#async-paging