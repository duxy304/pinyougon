window.addEventListener('load', function () {
    // 1.获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth

    // 2.鼠标经过focus 就显示隐藏的左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;   // 清除定时器
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    })

    // 3.动态生成小圆圈  有几张图  就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号  通过自定义属性
        li.setAttribute('index', i);
        // 将小li插入ul（promo_nav）里面
        ol.appendChild(li);

        // 4.小圆圈排他思想  生成小圆圈的同时 直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人  把所有的小li 清除 selected 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下自己  把当前li 设置为selected类名
            this.className = 'selected';

            // 5.点击小圆圈，移动图片  移动的是ul
            // ul的移动距离 就是 小圆圈的索引号 乘以 图片的宽度
            // 点击了某个小li，就拿到当前小li的 索引号
            var index = this.getAttribute('index');;

            // 两个小bug
            // 当点击了某个小li 就要把这个小li 的索引号 给num
            num = index;
            // 当点击了某个小li 就要把这个小li 的索引号 给circle
            circle = index;

            // console.log(focusWidth);
            // console.log(index);
            animate(ul, -index * focusWidth)
        })
    }
    // 把ol里面的第一个小li设置类名为 selected
    ol.children[0].className = 'selected';

    // 6.克隆第一张图片（li）放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 7.点击右侧按钮，图片滚动一张
    var num = 0;
    // circle控制小圆圈的播放
    var circle = 0;

    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 无缝滚动
            // 如果走到最后复制的一张图片  此时 ul 快速复原 left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            // 8.点击右侧按钮，小圆圈跟随一起变化  可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到了最后克隆的图片了
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }

    });

    // 9.左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 无缝滚动
            // 如果走到第一张图片  此时 ul 快速复原 left改为-num * focusWidth + 'px';
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            // 8.点击右侧按钮，小圆圈跟随一起变化  可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0 说明走到了第一张图片了，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });


    function circleChange() {
        // 先清除其余小圆圈的selected类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前小圆圈的selected类名
        ol.children[circle].className = 'selected';
    }
    // 10.自动播放轮播图
    var timer = this.setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);

})