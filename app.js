// 初始化画布
var canvas = document.getElementById("game2048");
var context = canvas.getContext('2d');

canvas.height = 360;
canvas.width = 360;

// 全局变量 卡片数据
var data = new Array;
var score;


function restart() {
	// 初始化数据列表
	for (var i = 0; i < 4; i++) {
		data[i] = new Array;
		for (var j = 0; j < 4; j++) {
			data[i][j] = 0;
		}
	}

	score = 0;

	// 添加两张卡片
	addCard();
	addCard();
	setTimeout("refresh()", 200);

}

// 添加卡片
function addCard() {
	// 获取空卡片数组
	var emptyCards = new Array;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (data[i][j] == 0) {
				emptyCards.push([i,j]);
			}
		}
	}
	// 随机挑选一个空卡片 获取该卡片数组索引
	var index = Math.floor(Math.random() * emptyCards.length);
	// 填充该卡片 产生一个 2 或 4 的卡片 其中 4 出现的概率为 0.1
	var value = Math.random() < 0.9 ? 2 : 4;
	data[emptyCards[index][0]][emptyCards[index][1]] = value;

	if (emptyCards.length == 1 && isGameover()) {
		alert('游戏结束');
		return;
	}

	// 刷新
	setTimeout("refresh()", 200);
}

// 游戏结束检测
function isGameover() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if (data[i][j] == data[i][j + 1])
				return false;
		}
	}
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 3; i++){
			if (data[i][j] == data[i + 1][j])
				return false;
		}
	}
	return true;
}

// 移动卡片
function move(direction) {
	var movedCards = 0;
	switch (direction) {
		case 8:
			// 向上滑动
			for (var j = 0; j < 4; j++) {
				var colCards = 0; // 该列已有卡片数量
				for (var i = 0; i < 4; i++) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片上方没有其他卡片 则移至顶部
					if (colCards == 0) {
						data[colCards][j] = data[i][j];
						if (i != 0) {
							data[i][j] = 0;
							movedCards++;
						}
						colCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[colCards - 1][j] == data[i][j]) {
						data[colCards - 1][j] *= 2;
						score += data[colCards - 1][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (i - colCards == 0) {
						colCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[colCards][j] = data[i][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
					}
				}
			}
			break;
		case 2:
			// 向下滑动
			for (var j = 0; j < 4; j++) {
				var colCards = 0; // 该列已有卡片数量
				for (var i = 3; i >= 0; i--) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片下方没有其他卡片 则移至底部
					if (colCards == 0) {
						data[3 - colCards][j] = data[i][j];
						if (i != 3) {
							data[i][j] = 0;
							movedCards++;
						}
						colCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[4 - colCards][j] == data[i][j]) {
						data[4 - colCards][j] *= 2;
						score += data[4 - colCards][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (i + colCards - 3 == 0) {
						colCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[3 - colCards][j] = data[i][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
					}
				}
			}
			break;
		case 4:
			// 向左滑动
			for (var i = 0; i < 4; i++) {
				var colCards = 0; // 该列已有卡片数量
				for (var j = 0; j < 4; j++) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片上方没有其他卡片 则移至顶部
					if (colCards == 0) {
						data[i][colCards] = data[i][j];
						if (j != 0) {
							data[i][j] = 0;
							movedCards++;
						}
						colCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[i][colCards - 1] == data[i][j]) {
						data[i][colCards - 1] *= 2;
						score += data[i][colCards - 1];
						data[i][j] = 0;
						colCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (j - colCards == 0) {
						colCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[i][colCards] = data[i][j];
						data[i][j] = 0;
						colCards++;
						movedCards++;
					}
				}
			}
			break;
		case 6:
			// 向右滑动
			for (var i = 0; i < 4; i++) {
				var rowCards = 0; // 该行已有卡片数量
				for (var j = 3; j >= 0; j--) {
					// 如果该位置为空 跳过本次遍历
					if (data[i][j] == 0) continue;
					// 如果该卡片下方没有其他卡片 则移至底部
					if (rowCards == 0) {
						data[i][3 - rowCards] = data[i][j];
						if (j != 3) {
							data[i][j] = 0;
							movedCards++;
						}
						rowCards++;
						continue;
					}
					// 如果该卡片数字与上方卡片数字一致 则合并
					if (data[i][4 - rowCards] == data[i][j]) {
						data[i][4 - rowCards] *= 2;
						score += data[i][4 - rowCards];
						data[i][j] = 0;
						rowCards++;
						movedCards++;
						continue;
					}
					// 如果当前位置位于该列顶部 则判定为不可再移动 跳过本次遍历
					if (j + rowCards - 3 == 0) {
						rowCards++;
						continue;
					} else {
						// 将当前位置卡片置于该列顶部
						data[i][3 - rowCards] = data[i][j];
						data[i][j] = 0;
						rowCards++;
						movedCards++;
					}
				}
			}
			break;
		default:
			break;
	}
	// 本次移动有效则添加两张卡片
	if (movedCards != 0) {
		addCard();
		setTimeout("refresh()", 200);
	}

	document.getElementById('hide').style.display = "none";

}

// 刷新界面
function refresh() {

	// 绘制卡片
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			switch (data[i][j]) {
				case 0:
					context.fillStyle = "#ccc0b3";
					break;
				case 2:
					context.fillStyle = "#eee4da";
					break;
				case 4:
					context.fillStyle = "#ede0c8";
					break;
				case 8:
					context.fillStyle = "#f2b179";
					break;
				case 16:
					context.fillStyle = "#f59563";
					break;
				case 32:
					context.fillStyle = "#f67c5f";
					break;
				case 64:
					context.fillStyle = "#f65e3b";
					break;
				case 128:
					context.fillStyle = "#edcf72";
					break;
				case 256:
					context.fillStyle = "#edcc61";
					break;
				case 512:
					context.fillStyle = "#9c0";
					break;
				case 1024:
					context.fillStyle = "#33b5e5";
					break;
				case 2048:
					context.fillStyle = "#09c";
					break;
				case 4096:
					context.fillStyle = "#a6c";
					break;
				case 8192:
					context.fillStyle = "#93c";
					break;
				case 16384:
					context.fillStyle = "#0D3B69";
					break;
				default:
					context.fillStyle = "#0A2E52";
					break;
			}
			context.fillRect(85*j + 15, 85*i + 15, 75, 75);
		}
	}

	context.font = "20px Arial";
	context.fillStyle = "#a30707";
	context.textAlign = "center";
	context.textBaseline = "middle";

	// 绘制卡片数字
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			// 若卡片数字为0, 则不绘制
			if (data[i][j] == 0) continue;
			context.fillText(data[i][j], 15+37.5 + 85*j, 15+37.5 + 85*i, 70);
		}
	}

	// 刷新分数
	document.getElementById('score').innerHTML = score;

}

function load() {
	document.addEventListener('touchstart', touch, false);
	document.addEventListener('touchend', touch, false);

	// 触摸开始位置, 推移量
	var startX, startY, offsetX, offsetY;

	function touch(event) {
		var event = event || window.event;

		switch (event.type) {
			case "touchstart":
				startX = event.touches[0].clientX;
				startY = event.touches[0].clientY;
				break;
			case "touchend":
				offsetX = event.changedTouches[0].clientX - startX;
				offsetY = event.changedTouches[0].clientY - startY;
				// 误触容错 只有滑动距离超过50px才触发
				if (Math.abs(offsetX) < 50 && Math.abs(offsetY) < 50) {
					break;
				}
				if (Math.abs(offsetX) > Math.abs(offsetY)) {
					if (offsetX > 0) {
						move(6);
					} else {
						move(4);
					}
				} else {
					if (offsetY > 0) {
						move(2);
					} else {
						move(8);
					}
				}
			default:
				break;
		}
	}

}

window.addEventListener('load', load, false);

// 避免长按菜单
document.querySelector('body').addEventListener('touchmove', function(e) {
    e.preventDefault();
});

// 键盘监听
document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e && ( e.keyCode == 38 || e.keyCode == 87) ) { // 上 / W
		move(8);
	}
	if (e && ( e.keyCode == 40 || e.keyCode == 83) ) { // 下 / S
		move(2);
	}
	if (e && ( e.keyCode == 37 || e.keyCode == 65) ) { // 左 / A
		move(4);
	}
	if (e && ( e.keyCode == 39 || e.keyCode == 68) ) { // 右 / D
		move(6);
	}
}

restart();