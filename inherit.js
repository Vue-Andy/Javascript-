/*** 来源:https://www.cnblogs.com/humin/p/4556820.html ***/
			
// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
	console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
/*
1、原型链继承
核心： 将父类的实例作为子类的原型
*/
function Cat(){ 
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

//　Test Code
var cat = new Cat();
console.log(cat.name);
cat.eat('fish');
cat.sleep();
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true

/*
特点：

1.非常纯粹的继承关系，实例是子类的实例，也是父类的实例
2.父类新增原型方法/原型属性，子类都能访问到
3.简单，易于实现

缺点：

1.要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
2.无法实现多继承
3.来自原型对象的所有属性被所有实例共享（来自原型对象的引用属性是所有实例共享的）（详细请看附录代码： 示例1）
4.创建子类实例时，无法向父类构造函数传参

缺点1中描述有误：可以在Cat构造函数中，为Cat实例增加实例属性。如果要新增原型属性和方法，则必须放在new Animal()这样的语句之后执行。
缺点3中的描述不够充分。更正为：来自原型对象的所有属性被所有实例共享。
推荐指数：★★（3、4两大致命缺陷）
*/

/*
2、构造继承
核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
*/
function Dog(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

// Test Code
var dog = new Dog();
console.log(dog.name); // Tom
dog.sleep();  // Tom正在睡觉！
console.log(dog instanceof Animal); // false
console.log(dog instanceof Dog); // true

/*
特点：

1.解决了1中，子类实例共享父类引用属性的问题
2.创建子类实例时，可以向父类传递参数
3.可以实现多继承（call多个父类对象）

缺点：

1.实例并不是父类的实例，只是子类的实例
2.只能继承父类的实例属性和方法，不能继承原型属性/方法
3.无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
推荐指数：★★（缺点3）
*/
/*
3、实例继承
核心：为父类实例添加新特性，作为子类实例返回
*/
function Sheep(name){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}

// Test Code
var sheep = new Sheep();
console.log(sheep.name);
sheep.sleep();
console.log(sheep instanceof Animal); // true
console.log(sheep instanceof Sheep); // false
/*
特点：

1.不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果

缺点：

1.实例是父类的实例，不是子类的实例
2.不支持多继承
推荐指数：★★
*/
/*** 4、拷贝继承 ***/
function Cow(name){
  var animal = new Animal();
  for(var p in animal){
	Cow.prototype[p] = animal[p];
  }
  Cow.prototype.name = name || 'Tom';
}

// Test Code
var cow = new Cow();
console.log(cow.name);
cow.sleep();
console.log(cow instanceof Animal); // false
console.log(cow instanceof Cow); // true
/*
特点：

1.支持多继承

缺点：

1.效率较低，内存占用高（因为要拷贝父类的属性）
2.无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）
推荐指数：★（缺点1）
*/

/*
5、组合继承
核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
*/
function Pig(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Pig.prototype = new Animal();

// 感谢 @学无止境c 的提醒，组合继承也是需要修复构造函数指向的。

Pig.prototype.constructor = Pig;

// Test Code
var pig = new Pig();
console.log(pig.name);
pig.sleep();
console.log(pig instanceof Animal); // true
console.log(pig instanceof Pig); // true
/*
特点：

1.弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
2.既是子类的实例，也是父类的实例
3.不存在引用属性共享问题
4.可传参
5.函数可复用

缺点：

1.调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）
推荐指数：★★★★（仅仅多消耗了一点内存）
*/
/*
6、寄生组合继承
核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
*/
function Chicken(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Chicken.prototype = new Super();
})();

// Test Code
var chicken = new Chicken();
console.log(chicken.name);
chicken.sleep();
console.log(chicken instanceof Animal); // true
console.log(chicken instanceof Chicken); //true

// 感谢 @bluedrink 提醒，该实现没有修复constructor。

Chicken.prototype.constructor = Chicken; // 需要修复下构造函数
/*
特点：

1.堪称完美

缺点：

1.实现较为复杂
推荐指数：★★★★（实现复杂，扣掉一颗星）
*/


/** 示例 **/
function ClimbAnimal (name) {
  // 属性
  this.name = name || 'ClimbAnimal';
  // 实例方法
  this.sleep = function(){
	console.log(this.name + '正在睡觉！');
  }
  //实例引用属性
  this.features = [];
}
function Cat(name){
}
Cat.prototype = new ClimbAnimal();

var tom = new Cat('Tom');
var kissy = new Cat('Kissy');

console.log(tom.name); // "ClimbAnimal"
console.log(kissy.name); // "ClimbAnimal"
console.log(tom.features); // []
console.log(kissy.features); // []

tom.name = 'Tom-New Name';
tom.features.push('eat');

//针对父类实例值类型成员的更改，不影响
console.log(tom.name); // "Tom-New Name"
console.log(kissy.name); // "ClimbAnimal"
//针对父类实例引用类型成员的更改，会通过影响其他子类实例
console.log(tom.features); // ['eat']
console.log(kissy.features); // ['eat']
/*
原因分析：

关键点：属性查找过程

执行tom.features.push，首先找tom对象的实例属性（找不到），
那么去原型对象中找，也就是ClimbAnimal的实例。发现有，那么就直接在这个对象的
features属性中插入值。
在console.log(kissy.features); 的时候。同上，kissy实例上没有，那么去原型上找。
刚好原型上有，就直接返回，但是注意，这个原型对象中features属性值已经变化了。
*/