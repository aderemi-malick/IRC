let stack1 = "CZNBMWQV".split("")
let stack2 = "HZRWCB".split("")
let stack3 = "FQRJ".split("")
let stack4 = "ZSWHFNMT".split("")
let stack5 = "GFWLNQP".split("")
let stack6 = "LPW".split("")
let stack7 = "VBDRGCQJ".split("")
let stack8 = "ZQNBW".split("")
let stack9 = "HLFCGTJ".split("")


function moveIt(chart, stackFrom, stackTo){
    while (chart !== 0) {
        stackTo.push(stackFrom.pop())
        chart-=1
    }
    console.log(stackTo) ;
}




//moveIt(2, stack1, stack3)

