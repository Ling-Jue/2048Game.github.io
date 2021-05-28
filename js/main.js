//定义一个JavaScript数组
var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(document).ready(function () {
    // 移动端初始化工作
    prepareForMobile();
    newgame();
});
// 移动端初始化工作
function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    // 设置大方块样式
    $("#grid-container").css({ "width": gridContainerWidth - 2 * cellSpace, "height": gridContainerWidth - 2 * cellSpace, "padding": cellSpace, "border-radius": 0.02 * gridContainerWidth });
    // 设置小方块样式
    $(".grid-cell").css({ "width": cellSideLength, "height": cellSideLength, "border-radius": 0.02 * cellSideLength });
}
function newgame() {
    // 初始化棋盘格和数字格
    init();
    // 生成两个随机数字 和随机位置
    generateOneNumber();
    generateOneNumber();
}
// 初始化棋盘格
function init() {
    // i表示4x4的格子中的行
    for (let i = 0; i < 4; i++) {
        // 声明二维，每一个一维数组里面的一个元素都是一个数组；
        board[i] = new Array();
        hasConflicted[i] = new Array();
        // j表示4x4格子中的列
        for (let j = 0; j < 4; j++) {
            // 初始化小格子的值为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;
            // 通过双重遍历获取每个格子的元素
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            // 通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    //初始化数字格
    updateBoardView();
    score = 0;
    $(".sc").text(score);
}
// 初始化数字格
function updateBoardView() {
    //首先清空之前的数字格布局内容
    $(".number-cell").remove();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            // 如果棋盘格的值为0的话，设置数字格高宽都为0
            if (board[i][j] === 0) {
                numberCell.css({ "width": "0px", "height": "0px", "top": getPosTop(i, j) + cellSideLength / 2, "left": getPosLeft(i, j) + cellSideLength / 2 });
            } else {
                // 如果棋盘格的值不为0的话设置数字格宽高为100设置背景颜色和前景色以及数字值
                numberCell.css({ "width": cellSideLength, "height": cellSideLength, "top": getPosTop(i, j), "left": getPosLeft(i, j), "background-color": getNumberBackgroundColor(board[i][j]), "color": getNumberColor(board[i][j]) });
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css({ "line-height": cellSideLength + "px", "font-size": 0.4 * cellSideLength + "px" });
}
// 生成随机数字和随机位置
function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    // 生成随机位置 
    // 随机x 坐标 和y坐标的位置 向下取整值为0-3
    let randx = parseInt(Math.floor(Math.random() * 4));
    let randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    // 定义一个循环 完成生成随机空格子
    while (times < 50) {
        // 如果当前格子的值为0，满足条件
        if (board[randx][randy] === 0) {
            break;
        }
        // 否则 重新随机一个位置
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    //只随机50次减少压力  进行手动查找
    if (times === 50) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    // 生成随机数字(规则 新生成的数字只可以是2或者4) 如果这个随机数小于 0.5 是 2 否则是 4
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    // 在随机位置上显示出随机的数字
    board[randx][randy] = randNumber;
    // 实现随机数字显示的动画
    ShowNumberWithAnimation(randx, randy, randNumber);
    return true;
}

// 键盘被按下事件
$(document).keydown(function (event) {
    switch (event.keyCode) {
        // 左
        case 37:
            // 解决分辨率过低导致页面向下滑动和操作键同时执行
            // 注： 阻挡按键按下时执行默认效果  默认效果为 滚动条滚动事件
            event.preventDefault();
            /* 
                moveLeft方法
                完成向左移动的逻辑
                返回值是Boolean类型判断是否可以向左移动
            */
            if (MoveLeft()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
            break;
        // 上
        case 38:
            // 解决分辨率过低导致页面向下滑动和操作键同时执行
            // 注： 阻挡按键按下时执行默认效果  默认效果为 滚动条滚动事件
            event.preventDefault();
            if (MoveUp()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
            break;
        // 右
        case 39:
            // 解决分辨率过低导致页面向下滑动和操作键同时执行
            // 注： 阻挡按键按下时执行默认效果  默认效果为 滚动条滚动事件
            event.preventDefault();
            if (MoveRight()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
            break;
        // 下
        case 40:
            // 解决分辨率过低导致页面向下滑动和操作键同时执行
            // 注： 阻挡按键按下时执行默认效果  默认效果为 滚动条滚动事件
            event.preventDefault();
            if (MoveDown()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
            break;
    }
});

// 捕捉手势 执行到touch相关事件的时候有一个回调函数 默认传入一个event函数
// touches 返回多点触控信息 但是这里只需要 单点触控信息 所以下标是[0]
document.addEventListener("touchstart", function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener("touchend", function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    //建立一个坐标系 判断滑动位置 来算出方向
    var deltaX = endx - startx;
    var deltaY = endy - starty;
    // 设定一个阈值（设备宽度的0.3倍） 如果滑动尺寸小于这个阈值 不执行下面操作
    if (Math.abs(deltaX) < 0.3 * documentWidth && Math.abs(deltaY) < 0.3 * documentWidth) {
        return;
    }
    //x
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {
            //向右滑动
            if (MoveRight()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
        } else {
            //向左滑动
            if (MoveLeft()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
        }
    }
    //y
    else {
        if (deltaY > 0) {
            //向下滑动
            if (MoveDown()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
        } else {
            //向上滑动
            if (MoveUp()) {
                // 重新随机生成两个数字和两个位置
                setTimeout("generateOneNumber()", 210);
                // 判断当我这次的移动完成之后游戏是否结束了
                setTimeout("isgameover()", 300);
            }
        }
    }
});
// 判断游戏是否结束
function isgameover() {
    if (nospace(board) && nomove(board)) {
        $(".game-message").fadeIn(1000);
        $(".lower").click(function () {
            newgame();
            $(".game-message").fadeOut(1000);
        });
    }
}

// 左移动方法
function MoveLeft() {
    // 返回值是Boolean类型判断是否可以向左移动
    if (!canMoveLeft(board)) {
        // 当前的格子无法移动
        return false;
    }
    // 完成向左移动的逻辑
    for (let i = 0; i < 4; i++) {
        // y轴从1开始因为不能再向左移动
        for (let j = 1; j < 4; j++) {
            // 当前数字格式有值的 不是0 
            if (board[i][j] !== 0) {
                // 遍历 board[i][j] 左侧的元素
                for (let k = 0; k < j; k++) {
                    //判断当前值不为0的数字格左边的数字格必须值为0    并且中间的数字格必须值也为0
                    if (board[i][k] === 0 && noBlokHorizontal(i, k, j, board)) {
                        // 才能向左移动
                        showMoveAnimation(i, j, i, k);
                        //指定表格子的值 变成当前表格子的值
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        //判断当前值不为0的数字格与左边的数字格值相等     并且中间的数字格必须值也为0
                    } else if (board[i][k] === board[i][j] && noBlokHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        // 才能向左移动
                        showMoveAnimation(i, j, i, k);
                        // 叠加操作
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //添加分数
                        score += board[i][k];
                        $(".sc").text(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //在200毫秒以后再执行   初始化数字格
    setTimeout("updateBoardView()", 200);
    return true;
}
// 右移动方法
function MoveRight() {
    // 返回值是Boolean类型判断是否可以向右移动
    if (!canMoveRight(board)) {
        // 当前的格子无法移动
        return false;
    }
    // 完成向右移动的逻辑
    for (let i = 0; i < 4; i++) {
        // y轴从1开始因为不能再向右移动
        for (let j = 2; j >= 0; j--) {
            // 当前数字格式有值的 不是0 
            if (board[i][j] !== 0) {
                // 遍历 board[i][j] 下面的元素
                for (let k = 3; k > j; k--) {
                    //判断当前值不为0的数字格右边的数字格必须值为0    并且中间的数字格必须值也为0
                    if (board[i][k] === 0 && noBlokHorizontal(i, j, k, board)) {
                        // 才能向右移动
                        showMoveAnimation(i, j, i, k);
                        //指定表格子的值 变成当前表格子的值
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        //判断当前值不为0的数字格与左边的数字格值相等     并且中间的数字格必须值也为0
                    } else if (board[i][k] === board[i][j] && noBlokHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        // 才能向右移动
                        showMoveAnimation(i, j, i, k);
                        // 叠加操作
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        //添加分数
                        score += board[i][k];
                        $(".sc").text(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //在200毫秒以后再执行   初始化数字格
    setTimeout("updateBoardView()", 200);
    return true;
}
// 上移动方法
function MoveUp() {
    // 返回值是Boolean类型判断是否可以向上移动
    if (!canMoveUp(board)) {
        // 当前的格子无法移动
        return false;
    }
    // 完成向上移动的逻辑
    for (let j = 0; j < 4; j++) {
        // y轴从1开始因为不能再向上移动
        for (let i = 1; i < 4; i++) {
            // 当前数字格式有值的 不是0 
            if (board[i][j] !== 0) {
                // 遍历 board[i][j] 下面的元素
                for (let k = 0; k < i; k++) {
                    //判断当前值不为0的数字格左边的数字格必须值为0    并且中间的数字格必须值也为0
                    if (board[k][j] === 0 && noBlokVertical(j, k, i, board)) {
                        // 才能向上移动
                        showMoveAnimation(i, j, k, j);
                        //指定表格子的值 变成当前表格子的值
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        //判断当前值不为0的数字格与左边的数字格值相等     并且中间的数字格必须值也为0
                    } else if (board[k][j] === board[i][j] && noBlokVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        // 才能向上移动
                        showMoveAnimation(i, j, k, j);
                        // 叠加操作
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //添加分数
                        score += board[k][j];
                        $(".sc").text(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    //在200毫秒以后再执行   初始化数字格
    setTimeout("updateBoardView()", 200);
    return true;
}

// 下移动方法
function MoveDown() {
    // 返回值是Boolean类型判断是否可以向下移动
    if (!canMoveDown(board)) {
        // 当前的格子无法移动
        return false;
    }
    // 完成向下移动的逻辑
    for (let j = 0; j < 4; j++) {
        // y轴从2开始以内不能再向下移动
        for (let i = 2; i >= 0; i--) {
            // 当前数字格式有值的 不是0 
            if (board[i][j] !== 0) {
                // 遍历 board[i][j] 下面的元素
                for (let k = 3; k > i; k--) {
                    //判断当前值不为0的数字格下边的数字格必须值为0    并且中间的数字格必须值也为0
                    if (board[k][j] === 0 && noBlokVertical(j, i, k, board)) {
                        // 才能向下移动
                        showMoveAnimation(i, j, k, j);
                        //指定表格子的值 变成当前表格子的值
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        //判断当前值不为0的数字格与左边的数字格值相等     并且中间的数字格必须值也为0
                    } else if (board[k][j] === board[i][j] && noBlokVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        // 才能向上移动
                        showMoveAnimation(i, j, k, j);
                        // 叠加操作
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //添加分数
                        score += board[k][j];
                        $(".sc").text(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    //在200毫秒以后再执行   初始化数字格
    setTimeout("updateBoardView()", 200);
    return true;
}