<template>
    <div class="about-page">
        <MBheaderBar :title="$t('message.MyAbout')"></MBheaderBar>
        <div class="main">
            <img class="logo" src="../../../public/img/logo03.png" alt="">
            <ul class="menu">
                <router-link to="my-assets" tag="li">
                    <img class="item-icon" src="../../../public/img/my/wallet_icon.png" alt="">
                    <label>{{$t("message.property")}}</label>
                    <i class="arrow"></i>
                </router-link>
                <router-link to="account-security" tag="li">
                    <img class="item-icon" src="../../../public/img/my/zhaq_icon.png" alt="">
                    <label>{{$t("message.accountSecurity")}}</label>
                    <i class="arrow"></i>
                </router-link>
                <router-link to="switchlang" tag="li">
                    <img class="item-icon" src="../../../public/img/my/switch_lang_icon.png" alt="">
                    <label>{{$t("message.MySwitchLang")}}</label>
                    <i class="arrow"></i>
                </router-link>
                <li>
                    <img class="item-icon" src="../../../public/img/my/face_icon.png" alt="">
                    <label>{{$t("message.MyAbout")}}</label>
                    <i class="arrow"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="less">
.about-page {
    .main {
        .logo {
            width: 2.6rem;
            height: 2.1rem;
            
        }
    }
}
</style>
