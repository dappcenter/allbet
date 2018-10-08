<template>
  <div class="headerbar">
    <div class="logo">
      <span>Dice</span>
    </div>
    <menu>
      <div class="text-menu">
        <a href="javascript:;">游戏</a>
        <a href="javascript:;">常见问题</a>
      </div>
      <section>
        <a href="javascript:;">
			<img src="../../../public/img/telegram-plane.png" alt="">
		</a>
		<a href="javascript:;">
			<img src="../../../public/img/github.png" alt="">
		</a>
      </section>
    </menu>
  </div>
</template>

<style lang="less" scoped>
.headerbar {
  display: flex;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid #aaa;
  padding: 20px 0;
  .logo {
    span {
      font-size: 30px;
    }
  }
  menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a {
      color: #fff;
    }
    .text-menu {
      a {
        margin-right: 40px;
        font-size: 20px;
      }
    }
    section {
      a {
        display: inline-block;
        margin-left: 20px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
@media screen and (max-width: 800px){
    .headerbar {
        padding: 0;
        menu {
            .text-menu {
                display: none;
            }
        }
    }
}
</style>
