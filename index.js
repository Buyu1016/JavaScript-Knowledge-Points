function Student(name, sex) {
    this.name = name;
    this.sex = sex
}
const student1 = new Student('CodeGorgeous', 'male')
console.log(student1)

// 手动实现new操作符
function myNew(fn, ...arg) {
    // 创建对象
    const obj = {}
    // 连接原型链
    obj.__proto__ = fn.prototype
    // 改变this指向
    const resutl = fn.apply(obj,arg)
    return resutl instanceof Object ? resutl : obj
}
const student2 = myNew(Student, 'maomao', 'woman')
console.log(student2)