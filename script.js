    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let myColor = color16();
    let move = true;
    // 设置线条的样式
    ctx.lineWidth = 3;

    // PC浏览器事件
    canvas.onmousedown = function(){
        canvas.addEventListener('mousemove', handler, true);
    }
    document.onmouseup = function(){
        move = true;
        canvas.removeEventListener("mousemove", handler, true);
    }
    /* 手机浏览器事件 */
    canvas.addEventListener('touchstart', function(){
        canvas.addEventListener('touchmove', touchHandler, true);
    }, false)
    document.addEventListener('touchend', function(){
        move = true;
        canvas.removeEventListener("touchmove", touchHandler, true);
    }, false)
    // 手机浏览器touch事件
    function touchHandler(event){
        if (event.targetTouches.length == 1) {
            event.preventDefault();// 阻止浏览器默认事件，重要
            var touch = event.targetTouches[0];
            let path = {"x":touch.clientX, "y":touch.clientY, "color":myColor, 'move':move};
            move = false;
            drawing(path);
        }
    }
    /* 手机浏览器 */
    function handler(e){
        let path = {"x":e.clientX, "y":e.clientY, "color":myColor, 'move':move};
        move = false;

        drawing(path);
    }
    // 绘画操作
    function drawing(path){
        if(path.move){
            ctx.beginPath();
            ctx.moveTo(path.x,path.y);
        }
        ctx.lineTo(path.x,path.y);
        ctx.strokeStyle = path.color;
        ctx.stroke();
    }
    //十六进制颜色随机
    function color16(){
        let r = PrefixInteger((Math.floor(Math.random()*256)).toString(16), 2);
        let g = PrefixInteger(Math.floor(Math.random()*256).toString(16), 2);
        let b = PrefixInteger(Math.floor(Math.random()*256).toString(16), 2);
        return '#' + r + g + b;
    }
    // 前置补0
    function PrefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }