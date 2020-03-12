<template>
    <div class="footer">
        <div class="concatMe">
            <div class="qq" @mouseover="handleHover" @mouseout="handleOut">
                <img src="~@/assets/images/footer-qq.png" alt="qq" title="QQ联系我">
                <div class="alertqq" v-if="isQQ">2374171406</div>
            </div>
            <div class="wechat" @click="showQrcode" @mouseover="handleHover1" @mouseout="handleOut1">
                <img src="~@/assets/images/footer-wechat.png" alt="微信" title="微信联系我">
                <div class="qrcode" v-if="isWechat">点击扫描二维码</div>
            </div>
            <div class="github">
                <a href="https://github.com/god-zhang/myBoke" target="_blank"><img src="~@/assets/images/footer-github.png" alt="github" title="我的github"></a>
            </div>
            <div class="email">
                <a href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=lmmkazhangmin@foxmail.com" target="_blank" title="lmmkazhangmin@foxmail.com"><img src="~@/assets/images/footer-email.png" alt="email" title="给我发邮件"></a>
            </div>
        </div>
        <div class="beian">
            <p>Copyright © 2020-2022 殒殇 All Rights Reserved V.1.0.0 赣ICP备6668988号</p>
        </div>
        <div class="qrcode" v-if="isQrcode">
            <img src="~@/assets/images/mywechat.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isQrcode: false,
            isQQ: false,
            isWechat: false
        }
    },
    methods: {
        showQrcode(){
            this.isQrcode = !this.isQrcode;
        },
        handleHover(){
            this.isQQ = true;
        },
        handleHover1(){
            this.isWechat = true;
        },
        handleOut(){
            this.isQQ = false;
        },
        handleOut1(){
            this.isWechat = false;
        },
        // toGitHub(){
        //     window.location.href = 'https://github.com/god-zhang/myBoke';
        // }
    },
}
</script>

<style lang="less" scoped>
    .footer{
        // position: fixed;
        // left: 0;
        // bottom: 0;
        width: 100%;
        background: transparent;
        color: #fff;
        box-sizing: border-box;
        z-index: 100;
        text-align: center;
        padding: 20px 0 15px 0;
        .concatMe{
            display: flex;
            justify-content: center;
            div{
                position: relative;
                cursor: pointer;
                .alertqq,.qrcode{
                    position: absolute;
                    left: -35px;
                    top: -40px;
                    padding: 10px;
                    background-color: #fff;
                    border-radius: 10px;
                    color: #000;
                }
                .qrcode{
                    white-space: nowrap;
                    left: 28px;
                    top: -20px;
                }
                img{
                    margin: 10px;
                }
            }
        }
        .beian{
            color: #555;
            font-size: 15px;
        }

        .qrcode{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
    }
</style>