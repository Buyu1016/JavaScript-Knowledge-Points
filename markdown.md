# JavaScript知识点记录

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