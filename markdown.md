# JavaScript八股文

# 如何理解作用域?

## 答: 作用域可以被分为三种，全局作用域 ｜ 函数作用域 ｜ 块级作用域。

### 全局作用域: 任何不在函数内声明的变量或者在打括号内声明的变量都会在全局作用域内存放

### 函数作用域: 在函数体内部声明的变量在全局内是无法访问到的，只能够在当前函数体内使用该变量

### 块级作用域: 在大括号内使用Es6语法let/const声明的变量是无法在大括号外部进行访问该变量的

### 查询变量的顺序: 当前作用域 -> 当前作用域上层 -> ... -> 全局作用域

```
    var name = "CodeGorgeous"
    function print() {
        // 如果有第19行代码则打印出的name值为xingjun
        // var name = 'xingjun'
        function getName() {
            console.log(name) // CodeGorgeous
        }
        getName()
    }
    print()
```

# == 和 === 的区别? 分别在什么情况下使用?

## 答: ==会进行类型转换进行比较, ===是不会进行类型转换直接进行比较的。除了值为null或者undefined的情况下用相等，建议其他情况下采用全等

```
    const obj1 = {
        a: 1
    }
    const obj2 = obj1
    const obj3 = {
        a: 1
    }
    // == 相等
    console.log(true == 1) // true
    console.log(false == 0) // true
    console.log('1' == 1) // true
    console.log(null == null) // true
    console.log(undefined == undefined) // true
    console.log(null == undefined) // true
    console.log(NaN == NaN) // false
    console.log(NaN == null) // false
    console.log(NaN == undefined) // false
    console.log(obj1 == obj2) // true 引用类型比较的是地址
    console.log(obj1 == obj3) // false

    // === 全等
    console.log(true === 1) // false
    console.log(false === 0) // false
    console.log('1' === 1) // false
    console.log(1 === 1) // true
    console.log(null === null) // true
    console.log(undefined === undefined) // true
    console.log(null === undefined) // false
    console.log(NaN === NaN) // false
    console.log(NaN === null) // false
    console.log(NaN === undefined) // false
    console.log(obj1 === obj2) // true 引用类型比较的是地址
    console.log(obj1 === obj3) // false
```

# 如何理解原型? 原型链?

## 答: 此回答不固定，请看图自行理解在进行回答

### 一张图帮你理解原型链

```
    class Student {
        constructor(name) {
            this.name = name
        }
    }
    const student1 = new Student('CodeGorgeous')
```

![原型链示意图](./image/原型链示意图.jpg)

# 如何理解闭包?

## 答: 闭包就是使一个嵌套函数能够访问到外层函数,可以用于创建私有化变量, 延长变量的生命周期

### 闭包的特点: 函数嵌套函数, 嵌套函数可以引用外层函数的参数, 函数执行完毕后其内部变量不会销毁(原始作用域链不释放,造成内存泄露)

```
    function print() {
        const name = 'xingjun'
        return function () {
            console.log(name)
        }
    }
    const result = print() // 正常函数在执行完毕后会销毁其内部参数
    result() // xingjun     在闭包中则会保留其执行期上下文, 不会销毁掉其上下文

    function print2() {
        let i = 0
        return function() {
            console.log(i++)
        }
    }
    const result1 = print2() // 
    result1()
    result1()
    const result2 = print2() // 如果再次调用是不会受到之前影响的
    result2()
    result2()
```
### 闭包的常见问题及其解决方案
```
    function print3() {
        let arr =[]
        for(var i = 0; i < 10; i++) {
            arr[i] = function() {
                console.log(i)
            }
        }
        return arr
    }
    const result3 = print3()
    for(let i = 0; i < result3.length; i++) {
        result3[i]() // 会打印出的值都为10
    }

    // 第一种解决方法:
    // 使用立即执行函数
    function print4() {
        let arr =[]
        for(var i = 0; i < 10; i++) {
            (function(j) {
                arr[j] = function() {
                    console.log(j)
                }
            })(i)
        }
        return arr
    }
    const result4 = print4()
    for(let i = 0; i < result4.length; i++) {
        result4[i]() // 0 1 2 3 4 5 6 7 8 9
    }

    // 第二种解决方法:
    // 使用es6都let
    // 为什么let能够解决这种问题?
    //  原因: let是存在块级作用域的, 每次遍历会产生新的作用域, 作用域之间不会互相影响
    function print5() {
        let arr =[]
        for(let i = 0; i < 10; i++) {
            arr[i] = function() {
                console.log(i)
            } 
        }
        return arr
    }
    const result5 = print5()
    for(let i = 0; i < result5.length; i++) {
        result5[i]() // 0 1 2 3 4 5 6 7 8 9
    }
```

# 如何理解继承? 怎么能够实现继承?

## 答: 继承可以理解为B继承了A, 那么A就是B的父类, B就是A的子类

### 继承的优势: 可以少写许多不必要的重复的方法和属性, 子类可以使用到父类的属性和方法, 也可以自己对其一些方法和属性进行重写

### ES6继承演示
```
    class People{
        constructor(name,phone) {
            this.name = name
            this.phone = phone
        }
        // 写
        write(content) {
            return content
        }
        // 读
        read() {
            return `我叫${this.name},我的电话为${this.phone}`
        }
    }

    // Male继承People
    class Male extends People{
        constructor(name,phone) {
            super(name,phone)
            this.sex = '男'
        }
        // 可以自己对其父类的方法进行重写,但是不会影响到父类
        read() {
            return `我叫${this.name},我是个${this.sex}孩子,我的电话为${this.phone}`
        }
        // 自己新增的独有的方法
        song() {
            return `
            See You Again
            It's been a long day without you my friend
            And I'll tell you all about it when I see you again
            We've come a long way from where we began
            Oh I'll tell you all about it when I see you again
            `
        }
    }
    const male = new Male('CodeGorgeous','176xxxxx940')
    console.log(male.write('集中一点,登峰造极')) // 芜湖起飞🛫️
    console.log(male.read()) // 我叫CodeGorgeous,我是个男孩子,我的电话为176xxxxx940
    console.log(male.song()) // See You Again ...... Oh I'll tell you all about it when I see you again

    class WoMan extends People{
        constructor(name,phone) {
            super(name,phone)
            this.sex = '女'
        }
        // 自己新增的独有的方法
        read() {
            return `我叫${this.name},我是个${this.sex}孩子,我的电话为${this.phone}`
        }
        // 
        dance() {
            return `💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃`
        }
    }
    const woman = new WoMan('maomao','178xxxxx066')
    console.log(woman.write('蜡笔小新')) // 蜡笔小新
    console.log(woman.read()) // 我叫maomao,我是个女孩子,我的电话为178xxxxx066
    console.log(woman.dance()) // 💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃
```

### 实现继承的方式

#### 寄生组合式继承

#### Es6的继承基本类似于寄生组合式继承