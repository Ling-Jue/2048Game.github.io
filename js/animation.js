// 实现随机数字显示的动画
function ShowNumberWithAnimation(randx, randy, randNumber) {
    // 获取当前的数字格
    var numberCell = $("#number-cell-" + randx + "-" + randy);
    // 设置当前的数字格的背景色和前景色及数字值
    numberCell.css({ "background-color": getNumberBackgroundColor(randNumber), "color": getNumberColor(randNumber) });
    numberCell.text(randNumber);
    // 设置当前的数字格的显示动画
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(randx, randy),
        left: getPosLeft(randx, randy)
    }, 50);
}

// 移动动画     fromx, fromy现在坐标    tox, toy将要移动到的坐标
function showMoveAnimation(fromx, fromy, tox, toy) {
    //获取到当前数字格的元素
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}