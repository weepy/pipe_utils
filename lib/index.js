exports.times = function(n, fn) {
  for(var i=0; i < n; i++) {
    fn.call(this, i)
  }
}

exports.each = function(o, fn) {
  var array = o instanceof Array, res, i
  for(i in o) {
    array && (i = parseInt(i))
    res = fn.call(this, o[i], i)
    if(res === false) return
  }
  return o
}

exports.each_reverse = function(o, fn) {
  var array = o instanceof Array
  for(var i=o.length-1; i >= 0; i--) {
    var res = fn.call(this, o[i], i)
    if(res === false) return
  }
  return o
}

exports.clone = function(o) {
  return exports.is.array(o) ? o.slice() : exports.extend({}, o)
}

exports.is = {
  array: function(o) {
    return o instanceof Array
  }
}

exports.extend = function(o, source) {
  for (var prop in source) {
    if (source[prop] !== void 0) o[prop] = source[prop];
  }
  return o
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
    if(fn.call(this, o[i], i)) 
      return o[i]
  }
}

exports.select = function(o, fn) {
  var array = o instanceof Array
  var ret = [], val, trans

  for(var i in o) {
    array && (i = parseInt(i)) 
    val = o[i]
    trans = fn.call(this, val, i)
    if(trans) ret.push(val)
  }
  return ret
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
  var __hasProp = Object.prototype.hasOwnProperty;
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};

exports.to = function(x, y, fn) {
  if(fn) {
    for(var i=x; i <= y; i++)
      fn.call(this, i)
  }
  else {
    var ret = []
    for(var i=x; i <= y; i++)
      ret.push(i)
    return ret
  }
}

exports.upto = function(x, y, fn) {
  return exports.to(x, y-1, fn)
}

exports.reverse = function(x) {
  return x.reverse()
}
