const oNum = document.querySelector('.num')
const oBtnDebounce = document.querySelector('.debounce')
const oBtnThrottle = document.querySelector('.throttle')

// 函数防抖
function debounce(fn, delay = 3000) {
    // 延时器
    let timer = null
    return function(e) {
        // 先进行清除上一次的延时器
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}

// 函数节流
function throttle(fn, delay = 3000) {
    let lock = false
    return function() {
        if (lock) return
        lock = true
        setTimeout(() => {
            fn.apply(this, arguments)
            lock = false
        }, delay)
    }
}

oBtnDebounce.addEventListener('click', debounce(addNumber, 1000))

oBtnThrottle.addEventListener('click', throttle(addNumber, 1000))

function addNumber() {
    oNum.innerText = ++oNum.innerText
}