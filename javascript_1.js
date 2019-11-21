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

  // javascript中最常用的表达式
