callbacks-done
==============
This is a very simple tool for keeping track of when a set of callbacks is finished. 

Background
==============
I noticed in node that I would often have the pattern of setting up an object using the results of multiple callbacks. I didn't want to nest the callbacks for many reasons, so I would instead set up a counter that would track the number of callbacks that were run, and run code when when they were all done. I made this so that I didn't have to write that every time.

Usage
==============
```javascript
var callbacksDone = require('callbacks-done');
var cd = callbacksDone();

var call = function(func){
  func();
}

var print = function(message){
  return function(){
    console.log(message);
  }
}

call(cd.add(print('A')));
cd.onDone(print('Done'));
call(cd.add(print('B')));
call(cd.add(print('C')));
cd.onDone(print('done 2'));
```

This will print

A

B

C

Done

done 2
