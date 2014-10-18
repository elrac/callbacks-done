var EventEmitter = require("events").EventEmitter;

var counter = function(){
  var eventEmitter = new EventEmitter();
  var counter = 0;
  var results = [];

  var add = function(func){
    counter++;
    return function(){
      var result = func.apply(this, arguments);

      if(result){
        results.push(result);
      }

      process.nextTick(function(){

        counter--;


        if(counter == 0 ){
          eventEmitter.emit('done',results);
        }
      });


    }
  }

  var onDone = function(doneFunc){
    eventEmitter.on('done',doneFunc);
  }



  return {
    add:add,
    onDone:onDone
  }

}

module.exports = counter;
