var callbacksDone = require('../lib/callbacksDone');

// standard use case
// use when each callback will be called only once
var cd = callbacksDone();

var call = function(func){
  func();
}

var print = function(message){
  return function(){
    console.log('callback counter test:',message);
  }
}

call(cd.add(print('A')));
cd.onDone(print('Done'));
call(cd.add(print('B')));
call(cd.add(print('C')));
cd.onDone(print('Done 2'));

// secondary use case
// use when callbacks may be called multiple times

var print2 = function(message){
  console.log('Test2 print',message);
}

var arr = ['d','e','f'];

cd = callbacksDone();
cd.setCount(arr.length);
cd.onDone(print('Done 3'));

arr.forEach(cd.add(print2));
