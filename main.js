let box = document.createElement('div');//创建一个div
document.body.appendChild(box);//将div展示在body中、、在js中我们定义了它为box
box.className = 'demo';//1命名box为.demo
var dragging = false
var lastX; //2 添加上次的位置lastX与lastY，这是因为函数与函数之间的数值不能互相访问，
var lastY; //2 添加这两个数值我们就可以完成这个功能了

box.onmousedown = function (a) {  //1 鼠标按下时，获得一个状态
    lastX = a.clientX; //2 定义lastX、Y为当前的位置
    lastY = a.clientY; ////2 重点，在function后面没有加a，没定义函数导致一直错误
    dragging = true
}
document.body.onmousemove = function (a) {  //1 鼠标移动时的状态
    //1 onclick是鼠标点击，我们改为了onmousemove，鼠标移动,
    //1 但是由于这样设置会导致div一直跟着鼠标，所以我们需要设置状态，点击之后跟着鼠标，松开取消拖拽
    if (dragging === true) {
        var deltaX = a.clientX - lastX;//2 定义并赋值相对位移
        var deltaY = a.clientY - lastY;
        // box.style.top = a.clientY + 'px';
        // box.style.left = a.clientX + 'px';  这是对于操作1的函数
        var top = parseInt(box.style.top) || 0;//2 据说老鸟才会写的，但是我不懂为什么
        var left = parseInt(box.style.left) || 0;//2 直接在下方的相加公式里面写0+delta不行
        box.style.top = top + deltaY + 'px';
        box.style.left = left + deltaX + 'px';
        lastX = a.clientX;//2 定义位置
        lastY = a.clientY;
    }
    console.log('dragging')
}
document.onmouseup = function () {  //1 鼠标松开时，获得一个状态
    dragging = false        //2 很重要的一点，将box改为document，防止bug//用box有拖动太快的bug    
}


//1 在1状态下，当我们点击box时，box的左上角会跳转至鼠标所在位置，这需要改动
//2 该怎么改呢，我们从box的绝对定位出发，我们不需要获得box的绝对位置，
//2 我们只需要得到box获得的相对位移就够了，所以我们需要获得一个现有位置，
//2 然后获得一个上次的位置，将相对位置与原有的左上角位置相加，就是相对位移距离了
//3 我们还有需要改动的地方，比如div有可能被拖出浏览器页面的情况。这个以后可以慢慢调整