<template>
	<section class="module-record">
		<div class="topbar">
			<h3>历史游戏</h3>
			<a href="javascript:;">只有我</a>
		</div>
		<div class="t-head">
			<span>玩家</span>
			<span>赌注</span>
			<span>结果</span>
			<span>头奖</span>
		</div>
		<div class="t-body">
			<ul v-for="item in 30">
				<li class="user">
					<img src="../../../public/img/head_icon.png" alt="">
					<span>0x34213</span>
				</li>
				<li class="wager">
					<span>0.01</span>
					<div class="dice-list">
						<i class="dot1"></i>
						<i class="dot2"></i>
						<i class="dot3"></i>
						<i class="dot4"></i>
						<i class="dot5"></i>
						<i class="dot6"></i>
					</div>
				</li>
				<li class="result win">
					<i class="dot1"></i>
					<span>--</span>
				</li>
				<li class="jackpot">
					<span>564</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<style lang="less">
.module-record {
	background: #303f69;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    width: 410px;
    height: 600px;
    box-sizing: border-box;
    position: relative;
    display: flex;
	flex-direction: column;
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		color: #fff;
		font-family: "San Francisco Display Thin";
		margin: 30px 0 10px;
		padding: 0 20px;
		h3 {
			font-weight: 200;
			font-size: 25px;
		}
		a {
			color: #fff;
			font-size: 14px;
		}
	}
	.t-head {
		display: flex;
		color: #b1adad;
		padding: 0 20px 2px;
		border-bottom: 1px solid #b1adad;
		span {
			flex: 2;
			&:nth-child(4) {
				flex: 1;
				text-align: right;
			}
		}
	}
	.t-body {
		flex: 1;
		overflow-y: scroll;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		padding: 0 20px;
		border-bottom: 10px solid #303f69;
		/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/ 
		&::-webkit-scrollbar {
			width: 5px;
			height: 5px;
			background-color: #303f69; 
		}
		/*定义滚动条轨道 内阴影+圆角*/ 
		&::-webkit-scrollbar-track {
			// -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
			border-radius: 10px; }
		/*定义滑块 内阴影+圆角*/ 
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
			background-color: #aaa;
		}
		ul {
			display: flex;
			font-size: 14px;
			width: 370px;
			padding: 4px 0;
			li {
				align-self: center;
				&.user {
					flex: 2;
					img {
						width: 25px;
						vertical-align: middle;
					}
				}
				&.wager {
					flex: 2;
					.dice-list {
						display: inline-block;
						margin-left: 6px;
						i {
							display: inline-block;
							width: 10px;
							height: 10px;
							&.dot1 {
								background: url(../../../public/img/dice-6.png) no-repeat center;
								background-size: 100% 100%;
							}
						}
					}
				}
				&.result {
					flex: 2;
					i {
						display: inline-block;
						width: 24px;
						height: 24px;
						vertical-align: middle;
						&.dot1 {
							background: url(../../../public/img/dice-6.png) no-repeat center;
							background-size: 80% 80%;
						}
					}
					span {
						display: inline-block;
						margin-left: 15px;
					}
				}
				&.jackpot {
					flex: 1;
					text-align: right;
				}
			}
		}
	}
	
}
@media screen and (max-width: 800px){
	.module-record {
		background: transparent;
    	box-shadow: initial;
		.topbar {
			padding: 0;
		}
		.t-head {
			padding: 0;
		}
		.t-body {
			padding: 0;
			overflow: hidden;
			border-bottom: 0;
			ul {
				width: 100%;
			}
		}
	}
}
</style>