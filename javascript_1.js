// 1.1 javascript 语言核心
  // javascript支持多种数据类型
var x;
x = 0;
x = 1;
x = 0.01;
x = "hello world";
x = 'javascript';
x = true;
x = false; 
x = null;
x = undefined;
  // 对象或数组
var book = {
	topic:'Javascript',
	fat: true
}
  // 通过 . 或 [] 来访问对象属性
book.topic;
book['fat'];
book.author = 'Andy';  // 通过赋值创建一个新属性
book.content = {}

var primes = [2,3,5,7];
primes[0];
primes.length;
primes[primes.length-1];
primes[4] = 9;
primes[4] = 11;
var empty = [];
empty.length;          // 0

var points = [
	{x:0,y:0},
	{x:1,y:1}
]
var data = {
	trail1:[[1,2],[3,4]],
	trail2:[[2,3],[4,5]],
}

  // javascript中最常用的表达式是使用运算符
3+2;
3-2;
3*2;
3/2;
"3"+"2";               // "32"
var count = 0;
count++;
count--;
count+=2;
count*=3;              // 6
  // 比较运算符
var x = 2,y = 3;
x === y;
x!=y;
x>y;
x>=y;
x<y;
x<=y;
"two" == "three";
"two" > "three";
false == (x>y);
  // 逻辑运算符是对布尔值的合并或求反
(x==2) && (y==3);
(x>3) || (y<3);
!(x==y);
console.log(111)


function check(args){
	var actual = args.length;
	console.log(actual)
	var expected = args.callee.length;
	console.log(expected)
	console.log(args.callee)
	if(actual !== expected)
		throw Error('长度不对!')
} 
function f(x,y,z) {
	check(arguments)
	return x + y + z
}
f(1,2,3)

// 自定义函数属性
uniqueInteger.counter = 0;
function uniqueInteger() {
	return this.uniqueInteger.counter++
}

console.log(uniqueInteger())
console.log(uniqueInteger())
console.log(uniqueInteger())
console.log(uniqueInteger())

// 采用闭包的形式实现上述效果
let uniqueInteger1 = (function() {
	let counter = 0;
	return function () {
		return counter++
	}
})()
console.log(uniqueInteger1())
console.log(uniqueInteger1())
console.log(uniqueInteger1())
console.log(uniqueInteger1())

function myModule() {
	var private = 'this is a private value'
}
myModule()
// console.log(private)

let obj = {
	n:0,
	get count() {return this.n++},
	set count(m) {
		if(m > this.n) {
			this.n = m;
		}else{
			throw Error('count can only be set to a larger num')
		}
	}
}
console.log(obj.count)
obj.count = 3
console.log(obj.count)
// obj.count = 3

function trace(o,m) {
	let original = o[m];   // 保存原来的m方法
	o[m] = function() {    // 重写m方法
		console.log(new Date(),"Entering:",m);
		var result = original.call(this,arguments);
		console.log(new Date(),"Exiting:",m)
		return result;
	}
}
let traceObj = {
	m:function(arr) {
		console.log(arr);
	}
}
// trace(traceObj,'m')
// let re = traceObj.m([1,2,3])
// console.log(re)
