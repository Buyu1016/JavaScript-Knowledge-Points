// 意外的全局变量
//  解决方法: 将该变量定义到该函数内部, 外部无法访问该变量
function print() {
    this.name = 'CodeGorgeous'
    sex = 'male'
}
print()
console.log(window.name, window.sex) // CodeGorgeous male

// 闭包
// 未释放函数内部执行期上下文
//  解决方法: 应使用立即执行函数
function print2() {
    let name = 'maomao'
    return () => {
        console.log(name)
    }
}
print2()() // maomao
