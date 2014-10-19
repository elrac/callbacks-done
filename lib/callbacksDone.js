var EventEmitter = require("events").EventEmitter;

var counter = function(){
  var eventEmitter = new EventEmitter();
  var counter = 0;
  var freezeCounter = false;
  var results = [];

  var add = function(func){
    if(!freezeCounter){
      counter++;
    }
    return function(){
      try{
        var result = func.apply(this, arguments);

        if(result){
          results.push(result);
        }
      }finally{

        process.nextTick(function(){
          counter--;
          if(counter == 0 ){
            eventEmitter.emit('done',results);
          }
        });
      }
    }
  }

  var onDone = function(doneFunc){
    eventEmitter.on('done',doneFunc);
  }

  var setCount = function(count){
    counter = count;
    freezeCounter = true;
  }

  return {
    add:add,
    onDone:onDone,
    setCount:setCount
  }

}

module.exports = counter;
