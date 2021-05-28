documentWidth = window.screen.availWidth; /* 获取当前屏幕的宽度 */
gridContainerWidth = 0.92 * documentWidth; /* 游戏大方块占屏幕的92% */
cellSideLength = 0.18 * documentWidth; /* 游戏小方块占屏幕的18% */
cellSpace = 0.04 * documentWidth; /* 游戏小方块间距根据是4% */
// 方块距离顶部的距离 定位
function getPosTop(i, j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}
// 方块距离左边的距离 定位
function getPosLeft(i, j) {
    return 20 + j * (cellSpace + cellSideLength);
}

// 设置背景颜色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
    }
}
// 设置数字颜色
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65"
    }
    return "white";
}
// 判断格子里面有没有空值
function nospace(board) {

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
// 判断是否可以向左移动   判断除了第一列后面的值
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            // 如果当前格子不是0
            if (board[i][j] != 0) {
                // 判断当前格子前一列等于0 或者 当前格子和前一列的格子值相等 返回true
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
// 判断是否可以向上移动   判断除了第一列后面的值
function canMoveUp(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            // 如果当前格子不是0
            if (board[i][j] != 0) {
                // 判断当前格子上一行等于0 或者 当前格子和上一行的格子值相等 返回true
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
// 判断是否可以向右移动   判断除了第一列后面的值
function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            // 如果当前格子不是0
            if (board[i][j] != 0) {
                // 判断当前格子后一列等于0 或者 当前格子和后一列的格子值相等 返回true
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
// 判断是否可以向右移动   判断除了第一列后面的值
function canMoveDown(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 3; i++) {
            // 如果当前格子不是0
            if (board[i][j] != 0) {
                // 判断当前格子后一行等于0 或者 当前格子和后一行的格子值相等 返回true
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
// 判断移动方向区间是否有障碍物   row行  col1目标列  col2当前列   
function noBlokHorizontal(row, col1, col2, board) {

    for (let i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
// 判断移动方向区间是否有障碍物   col行  row1目标行  row2当前行   
function noBlokVertical(col, row1, row2, board) {

    for (let i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function nomove(board) {
    if (canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveUp(board)) {
        return false;
    }
    return true;
}