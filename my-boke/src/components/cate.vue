<template>
    <div class="cate card">
        <div class="search">
            <div class="searchDiv" :style="{borderRadius: styleSearch}">
                <input type="text" placeholder="输入标题搜索~" v-model="searchTxt" @input="inputVal($event)" @keydown.enter="searchArticles">
                <img src="~@/assets/images/search.png" alt="" class="searchBtn" @click="searchArticles">
                <ul class="searchList" v-if="isSearchList">
                    <template v-for="item in searchList">
                        <li v-if="item.id == -1" :key="item.id+'searchList'" style="color:#999;cursor: no-drop;">{{item.title}}</li>
                        <router-link v-else tag="li" :to="'/article?aId='+item.id" :key="item.id+'searchList'">{{item.title}}</router-link>
                    </template>
                </ul>
            </div>
        </div>
        <div class="tag">
            <ul @mouseover="randomColor($event)" @mouseout="cancelColor($event)">
                <li data-id='0' @click="getArticles($event)" :class="0 == activeId ? 'activeTag' : ''">全部文章</li>
                <li v-for="item in tags" :key="item.id+'tags'" :data-id="item.id" @click="getArticles($event)" :class="item.id == activeId ? 'activeTag' : ''">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {mapMutations} from 'vuex';
const debounce = (function () {
    let timer = null;
    return function (callback, ms) {
        clearTimeout(timer)
        timer = setTimeout(callback, ms)
 }
})()
export default {
    data() {
        return {
            tags: [],
            activeId: null,
            searchTxt: '',
            searchList: [],
            isSearchList: false,
            styleSearch: '20px'
        }
    },
    computed:{

    },
    created() {
        axios.get(`${this.global.apiUrl}queryTags`)
        .then(res=>{
            if(res.status == 200){
                this.tags = res.data;
            }else{
                console.log('标签请求出错')
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    methods:{
        randomColor(that){
            const zimu = ['a','b','c','d','e','f',1,2,3,4,5,6,7,8,9,0];
            let str = '';
            for (let i = 0; i < 6; i++) {
                const randomZ = zimu[parseInt(Math.random()*zimu.length)];
                str+=randomZ;
            }
            that.target.style.color = '#'+str;
        },
        cancelColor(that){
            that.target.style.color = '#fff';
        },
        getArticles(e){
            this.activeId = parseInt(e.target.dataset.id);
            if(parseInt(e.target.dataset.id) == 0){
                this.$emit('getAllArticles',true,0,3)
            }else{
                this.$emit('getArticles',true,parseInt(e.target.dataset.id))
            }
        },
        inputVal(e){
            if(this.searchTxt == '' && e.data == null){
                this.$emit('getAllArticles',true,0,3)
            }
            if(this.searchTxt.trim() != ''){
                debounce(()=>{
                    this.getSearchList();
                },500);
            }else if(this.searchTxt.trim() == '' || this.searchTxt == ''){
                debounce(()=>{
                    this.isSearchList = false;
                    this.styleSearch = '20px';
                },500);
            }
        },
        searchArticles(e){
            if(this.searchTxt == ''){
                this.$layer.msg('搜索内容不能为空');
            }else{
                this.$emit('searchArticles',true,this.searchTxt,0,3,-1);
            }
        },
        getSearchList(){
            axios.get(`${this.global.apiUrl}searchTitles?title=${this.searchTxt}`)
            .then((res)=>{
                if(res.status == 200){
                    this.isSearchList = true;
                    this.styleSearch = '20px 20px 0 0';
                    if(res.data.length > 0){
                        this.searchList = res.data;
                    }else{
                        this.searchList = [{id: -1,title: '未果...'}]
                    }
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
    .cate{
        .search{
            width: 100%;
            height: 55px;
            padding: 15px 10px;
            box-sizing: border-box;
            text-align: center;
            background-color: #000;
            position: relative;
            .searchDiv{
                width: 80%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-50%) translateY(-50%);
                background-color: #fff;
                border-radius: 20px;
                .searchList{
                    width: 100%;
                    position: absolute;
                    top: 30px;
                    text-align: left;
                    background-color: #fff;
                    color: #000;
                    border-radius: 0 0 20px 20px;
                    box-sizing: border-box;
                    li{
                        line-height: 25px;
                        padding: 10px;
                        cursor: pointer;
                        font-size: 14px;
                        &:hover{
                            background-color: rgba(0, 0, 0, .1);
                        }
                    }
                }
                input{
                    width: 80%;
                    height: 20px;
                    border-radius: 20px;
                    border: none;
                    outline: none;
                    padding: 5px 15px;
                    background-color: #fff;
                }
                .searchBtn{
                    position: absolute;
                    right: 8%;
                    top: 0;
                    cursor: pointer;
                }
            }
        }
        .tag{
            ul{
                li{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 10px;
                    border-bottom: 1px solid rgba(255, 255, 255, .1);
                    box-sizing: border-box;
                    cursor: pointer;
                    &:hover{
                        background-color: rgba(255,255,255,0.1);
                        border-right: 5px solid #eee;
                    }
                    &.activeTag{
                        background-color: rgba(255,255,255,0.1);
                        border-right: 5px solid #eee;
                        font-size: 20px;
                        color: #05b0ff !important;
                    }
                }
            }
        }
    }
</style>