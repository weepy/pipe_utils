exports.times = function(n, fn) {
  for(var i=0; i < n; i++) {
    fn.call(this, i)
  }
}

exports.each = function(o, fn) {
  for(var i in o) {
    fn.call(this, o[i], i)
  }
}

exports.map = function(o, fn) {
  var array = o instanceof Array
  var ret = array ? [] : {}
  
  for(var i in o) {
    if(array) i = parseInt(i) 
    ret[i] = fn.call(this, o[i], i)
  }
  return ret
}

exports.detect = function(o, fn) {
  for(var i in o) {
    if(fn(o[i], i)) 
      return o[i]
  }
}

exports.chain = function chain(fnList, callback) {
  var self = this
  var results = []

  function run(i) {
    if(i == fnList.length) return callback(results)      
    fnList[i].call(self, function(answer) {
      results[i] = answer
      run.call(self, i+1)
    })
  }
  run.call(self, 0)
}


exports.amap = function(obj, transform, callback) {
  var array = obj instanceof Array
  var results = array ? [] : {}
  var count = 0
  for (key in obj) count += 1 
  for( key in obj) {
    var val = obj[i]
    if(array) key = parseInt(key)

    var handle = function(_key) {
      return function(result) {
        results[_key] = result
        count -=1
        if(count == 0) {
          callback(results)           
        }
      }
    }
    
    transform.call(val, val, handle(key), key)
  }
}

exports.parallel = function(actions, callback) {
  exports.amap(actions, function(){}, callback)
}

exports.inherits = function(child, parent) {
  var ctor = function(){};
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.prototype.constructor = child;
  if (typeof parent.extended === "function") parent.extended(child);
  child.__super__ = parent.prototype;
}