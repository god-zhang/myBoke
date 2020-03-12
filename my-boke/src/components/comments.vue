<template>
    <div class="comments card cardCommon">
        <commentsMain :blogId='blogId' v-for="item in currentComments" :key="item.id+'comments'" :commentsData='item' :childComments='childComments' class="animated fadeInUp"></commentsMain>
        <div class="noComments" v-if="!isNoComments">暂无评论,快来抢沙发吧~</div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import commentsMain from '../components/comments-main';
import axios from 'axios';
import animate from 'animate.css';
export default {
    components:{
        commentsMain
    },
    props: ['blogId'],
    data() {
        return {
            currentComments: [],
            childComments: [],
            isNoComments: false,
            offset: 0,
            limit: 5,
            total: 0,
            countScroll: 1,
            blog_id: ''
        }
    },
    computed: {
        ...mapState({
            hscrollBottom: (state) => state.scrollBottom
        }),
    },
    watch: {
        hscrollBottom(n,o){
            if(n == 0){
                this.getMoreData();
            }
        }
    },
    mounted() {
        const blog_id = this.blogId ? this.blogId : -1;
        this.blog_id = blog_id;
        this.getComments(blog_id);
    },
    methods: {
        getComments(id){
            axios.get(`${this.global.apiUrl}showUsersComments?blog_id=${id}&offset=${this.offset}&limit=${this.limit}`)
            .then(res=>{
                if(res.data.code == 200){
                    if(res.data.rows.length == 0){
                        this.isNoComments = false;
                    }else{
                        this.isNoComments = true;
                        this.total = res.data.total;
                        for(let i = 0; i < res.data.rows.length; i++){
                            if(res.data.rows[i].parent_id == -1){
                                this.currentComments.push(res.data.rows[i])
                            }else{
                                this.childComments.push(res.data.rows[i])
                            }
                        }
                        this.childComments.reverse();
                    }                   
                }
            })
        },
        getMoreData(){
            if(Math.floor((this.total+4)/5) == this.countScroll){
                return;
            }
            this.countScroll ++;
            this.offset+=this.limit;
            if((this.total-this.offset)/this.limit <= 1){
                this.limit = this.total - this.offset;
            }
            this.getComments(this.blog_id);
        },
    },
}
</script>

<style lang="less" scoped>
    .comments{
        margin-bottom: 20px;
        .noComments{
            text-align: center;
            height: 300px;
            line-height: 300px;
            font-size: 16px;
            color: #555;
        }
    }
</style>