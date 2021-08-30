var name = "maomao"
const obj = {
    name: 'CodeGorgeous',
    print(sex, age) {
        console.log(this.name, sex, age)
    }
}
obj.print('male', 21) // CodeGorgeous 21
obj.print.call(window, 'woman', 14) // maomao 14
obj.print.apply(window, ['woman', 14]) // maomao 14
let result = obj.print.bind(window)
result() // maomao undefined undefined
result = result.bind(window, 'woman')
result() // maomao woman undefined
result = result.bind(window, 14) // 分多次上传
result() // maomao woman 14
obj.print('male', 21) // CodeGorgeous male 14