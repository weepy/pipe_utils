| = require "../lib/pipe_utils"
should = require "should"

exports.test = {
  true.should.be.true
}

exports.map = {
  ([1,2,3] | map { #*#}).should.eql([1,4,9])
}

exports.map2 = {
  ({a:1, b:2, c:3} | map { # * # }).should.eql({a:1, b:4, c:9})
}

exports.detect = {
  ([1,2,3] | detect { # > 2}).should.equal(3)
}

exports.ntimes = {
  x = 0
  5 | times {
    x++
  }
  x.should.equal(5)
}

exports.each = {
  x = 0
  [1,2,3] | each { x+=#}
  x.should.equal(6)
}

/*

exports.chain = {
}

exports.amap = {
}

exports.parallel = {
  
}
*/