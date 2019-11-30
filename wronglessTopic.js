/*** 易错题整理 ***/
/**1.类型判断
	js中数据类型分两种:
	  原始类型五种:数字 字符串 布尔值 null undefined
	  对象类型:数组和函数属于特殊的对象
	按是否拥有方法分为有方法的类型和没有方法的类型,只有null 和 undefined 没有自己的方法
	按是否可变分为可变类型和不可变类型,对象和数组属于可变类型;数字,字符串,布尔值,null,undefined属于不可变类型
**/
typeof(Object)                   //  * "function"
typeof(Function)                 //  * "function"
typeof(Array)                    //  * "function"
typeof(String)                   //  * "function"
typeof(Number)                   //  * "function"
typeof(Boolean)                  //  * "function" --- 所有构造函数都属于函数类型
typeof(undefined)                //  "undefined"
typeof(null)                     //  * "object"   --- undefined和null不是构造函数,不能使用new null 和 new undefined
typeof([])                       //  * "object"  
typeof({})                       //  "object"
typeof('')                       //  "string"
typeof(NaN)                      //  * "number"

/*** 判断是否是数组 --- 数组也是对象 ***/
Array.isArray([]);               // true
[] instanceof Array;             // true  --- 通过构造函数判断,instanceof 右边的必须要为对象,否则报错	Right-hand side of 'instanceof' is not an object
[1] instanceof Array;            // true
[] instanceof Object;            // true  --- 因为数组是特殊的对象
// {} instanceof Object          // * 报错,需要先拿变量接收 {} ,再判断,则为真,或者({})
Function instanceof Object;      // true  --- 因为函数是特殊的对象
Function instanceof Function;    // true  --- instanceof 左操作数必须是对象
Array instanceof Object;         // true  --- 所以不能通过 a instanceof Object 就断定 a 是对象
Array instanceof Function;       // true  --- 此处是说明构造函数的构造函数类型还是函数类型
Object instanceof Object;        // true
Object instanceof Function;      // true
String instanceof Object;        // true
String instanceof Function;      // true
Number instanceof Function;      // true
Number instanceof Object;        // true
Boolean instanceof Function;     // true
Boolean instanceof Object;       // true

let a = {},b=function(){ return false };
a instanceof Object              // true
a instanceof Function            // false
b instanceof Object              // true
b instanceof Function            // true --- 函数的实例是对象类型,但是对象的实例不是函数类型

if(b) { console.log('所有函数都是真值!') }
/**2.类
	js的类可以看做是对象类型的子类型,除了数组类和函数类,还有三种有用的类,如Date RegExp Error 还包括通过构造函数定义的自定义类
**/
/**3.判断一个变量是否是NaN
	不能用x === NaN 来判断,NaN和谁都不相等,包括自身,所以应该用 x!=x 来判断,如果为真,则x为NaN
	isNaN()函数当参数是NaN或非数字值(如字符串或对象)时,返回true
	isFinite()函数当参数不是NaN/Infinite/-Infinite的时候返回true,判断是否是有限值,所以首先要是数字或可转为数字
**/
Math.abs(-5)                     // 5 --- 求绝对值的函数
isNaN('n')                       // true
isFinite('n')                    // false
isFinite({})                     // false
isFinite([])                     // true
isFinite([1])                    // true 
isFinite([1,2])                  // false --- 参考类型转换 []=>0 和 一个元素的数字数组[x]会转换成 =>x
isFinite([1.2])                  // true

0.3-0.2 === 0.2-0.1              // false --- 浮点数是二进制表示法,可以精确的表示分数,而常用的分数是十进制分数,二进制浮点数不能精确标识类似0.1这样简单的数字

let then = new Date(2011,0,1);                // 2011-1-1
let later = new Date(2011,0,1,17,10,30);      // 2011-1-1 5:10:30pm
let now = new Date()
now - then;                      // 返回相差的毫秒数

console.log("one\nlong\nline");  // 显示为三行的一句话
console.log("one\
long\
line");                          // 占用三行代码的一句话
Object(null);Object(undefined);  // {}
/**4.+运算符如果一个操作数是字符串,则会把另一个操作数转换为字符串,一元+运算符会把操作数转换为数字,一元!运算符会把操作数转换为布尔值**/
+"5";                            // 5
let num = 17;
num.toString(2);                 // 10001
"0"+num.toString(8);             // 021
"0x"+num.toString(16);           // 11
parseInt(0.1);                   // 0
parseInt(.1);                    // NaN
parseInt('11',2);                // parseInt()函数的第二个参数是告知转换成多少进制,范围2~36
parseInt('ff',16);               // 15*15+15---255

/**5.运算符
	++x 和 x = x +1 并不完全相同,因为前者从不做字符串的拼接,如x='1', ++x => 2; 而 x = x+1 => '11'
**/

let aq = [{x:1},{y:2},{z:3}]
let union = function(a,b) {
	for(var i in a) {
		for(var j in b) {
			if(!(j in a)) {
				a[j] = b[j]
			}
		}
	}
	return a
}
let bq = aq.reduce(union)
console.log(bq)

let s = 'javascript'
console.log(s[1])
console.log(Array.prototype.join.call(s,'|'))
// console.log(Array.join(s,'|'))  // --- 火狐可以
