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
			<span><i class="icon"></i></span>
		</div>
		<div class="t-body">
			<div class="list-wrap" :class="{'unfold': unfold == index}"  v-for="item,index in 30" @click="unfold = unfold == index ? -1 : index" :key="index">
				<ul class="list-content">
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
						<i class="icon arrow"></i>
					</li>
				</ul>
				<transition name="slide-fade">
					<ul class="unfold-content" v-show="unfold == index">
						<li>
							<label>地址</label>
							<div><a href="javascript:;">0x76ca811470ae77a88a5d4626a750a3b50</a></div>
						</li>
						<li>
							<label>赌注</label>
							<div>0.690以太幣</div>
						</li>
						<li>
							<label>将赌注押在</label>
							<div>46</div>
						</li>
						<li>
							<label>bet trx</label>
							<div><a href="javascript:;">0x76ca811470ae77a88a5d4626a750a3b50</a></div>
						</li>
						<li>
							<label>sha3(secret)</label>
							<div>0x76ca811470ae77a88a5d4626a750a3b50</div>
						</li>
						<li>
							<label>secret</label>
							<div>0x02d61ae4709ac238ab176046490e35fa1a</div>
						</li>
						<li>
							<label>sha3(bet block)</label>
							<div>0x02d61ae4709ac238ab176046490e35fa1a</div>
						</li>
						<li>
							<label>sha3(blk + secret)</label>
							<div>0x02d61ae4709ac238ab176046490e35fa1a</div>
						</li>
						<li>
							<label>sha3 mod 100</label>
							<div>100</div>
						</li>
						<li>
							<label>jackpot</label>
							<div>110</div>
						</li>
						<li>
							<label>获胜</label>
							<div>0.212 以太幣</div>
						</li>
					</ul>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
export default {
    data() {
        return {
            unfold: -1
        }
    }
}
</script>


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
			i {
				display: block;
				width: 25px;
				height: 25px;
				background: url("../../../public/img/flower.png") no-repeat center;
				background-size: 80%;
			}
		}
	}
	.t-body {
		flex: 1;
		overflow-y: scroll;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
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
		.list-content {
			display: flex;
			font-size: 14px;
			padding: 4px 10px 4px 20px;
			position: relative;
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
					.arrow {
						display: inline-block;
						width: 24px;
						height: 24px;
						vertical-align: middle;
						background: url("../../../public/img/arrow_right.png") no-repeat center;
						background-size: 50%;
						transition: all .5s;
					}
				}
			}
			&:hover {
				&:after {
					content: ' ';
					display: block;
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					z-index: -1;
					background: rgba(255, 255, 255, 0.15);
					z-index: 1;
				}
			}
		}
		.unfold-content {
			background-color: rgba(0, 0, 0, .5);
			padding: 20px;
			overflow: hidden;
			li {
				font-size: 12px;
				display: flex;
				label {
					color: #aeaeae;
					flex: 1;
				}
				div	{
					color: #fff;
					flex: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					a {
						color: inherit;
						text-decoration: underline;
					}
				}
			}
		}
		.list-wrap {
			&.unfold {
				.list-content {
					.arrow {
						transform: rotate(90deg)
					}
				}
			}
		}
		
	}
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for below version 2.1.8 */ {
		transform: translateX(10px);
		opacity: 0;
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
			.list-content {
				width: 100%;
				padding: 4px 0;
			}
		}
	}
}
</style>