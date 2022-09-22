function animate(obj, target, callback) {
    console.log(callback);
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值 写到定时器里面
        // 把步长值改为整数 不要出现小数
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            
            // 回调函数  写的定时器结束里面
            // if(callback){
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 步长公式 ：(目标值–现在的位置)/10做为每次移动的距离步长
        obj.style.left = obj.offsetLeft + step + 'px';
        // obj.style.left = obj.offsetLeft + 1 + 'px';
    }, 15)
}