<template>
    <div class="calendar card">
        <div class="date">
            <div class="up" @click="prevMonth">◀</div>
            <div class="today">{{year}}年{{month}}月{{day}}日</div>
            <div class="down" @click="nextMonth">▶</div>
        </div>
        <div class="week">
            <div class="item" v-for="(item,index) in week" :key="index+'week'">
                {{item}}
            </div>
        </div>
        <div class="day">
            <div class="item" v-for="item in 42" :key="item+'day'">
                <div v-if="item-beginDay > 0 && item-beginDay <= curMonthDays" @click="chooseDay(item-beginDay)" :class="{'today-num' : `${year}-${month}-${item-beginDay}` === curDate, 'active-day': `${year}-${month}-${item-beginDay}` === `${year}-${month}-${day}`}">{{item-beginDay}}</div>
                <div v-else-if="item-beginDay <= 0" class="other-day">{{item-beginDay+prevMonthDays}}</div>
                <div v-else class="other-day">{{item-beginDay-curMonthDays}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            week: ['日','一','二','三','四','五','六'],
            year: null,
            month: null,
            day: null,
            curDate: null
        }
    },
    created(){
        this.getDate();
    },
    methods:{
        getDate(){
            const date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth()+1;
            this.day = date.getDate();
            this.curDate = `${this.year}-${this.month}-${this.day}`;
        },
        chooseDay(day){
            this.day = day;
        },
        prevMonth(){
            if(this.month == 1){
                this.month = 12;
                this.year --;
            }else{
                this.month --;
            }
            this.computedDay();
        },
        nextMonth(){
            if(this.month == 12){
                this.month = 1;
                this.year ++;
            }else{
                this.month ++;
            }

            this.computedDay();
        },
        computedDay(){
            const allDay = new Date(this.year,this.month,0).getDate();
            if(this.day > allDay){
                this.day = allDay;
            }
        }
    },
    computed:{
        beginDay(){
            return new Date(this.year,this.month-1,1).getDay();
        },
        curMonthDays(){
            return new Date(this.year,this.month,0).getDate();
        },
        prevMonthDays(){
            return new Date(this.year,this.month-1,0).getDate();
        },
    }
}
</script>

<style lang="less" scoped>
    .calendar{
        padding-top: 5px;
        .date{
            display: flex;
            justify-content: space-around;
            margin-bottom: 5px;
            .up,.down{
                cursor: pointer;
                &:hover{
                    color: #05b0ff;
                }
            }
            .today{
                color: #05b0ff;
                font-weight: 600;
            }
        }
        .week{
            display: flex;
            justify-content: space-around;
            background-color: rgba(34, 34, 12, 0.5);
            margin-bottom: 5px;
            padding: 5px;
        }
        .day{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            padding: 0 5px;
            .today-num{
                background-color: #2ea7e0;
            }
            .item{
                cursor: pointer;
                width: 14%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                margin-bottom: 5px;
                box-sizing: border-box;
                .other-day{
                    color: #555;
                    cursor: no-drop;
                }
                .active-day{
                    border: 2px solid #05b0ff;
                }
                &:hover{
                    color: #2ea;
                }
            }
        }
    }
</style>