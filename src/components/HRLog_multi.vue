<template>
    <page>
        <header>
            <contentHeader>
                <mainHeader>HR Tracking Log</mainHeader>
                <description>description.</description>
            </contentHeader>
            <hrHeader>
                <searchBySection>
                    <a>Search By:</a>
                    <sui-dropdown
                        class="left_input"
                        fluid
                        multiple
                        :options="searchOptions"
                        placeholder="Search By"
                        selection
                        v-model="searchByRaw"
                    />
                    <a></a>
                    <input class="right_input" v-model="searchValue" placeholder="search...">
                    <a>Condition</a>
                    <sui-dropdown
                        placeholder="Select Mode"
                        selection
                        :options="options"
                        v-model="condition"
                    />
                </searchBySection>
                <searchDateTimeSection>
                    <a>Date From: </a>
                    <date-picker style="width:100%;" v-model="date_from" lang="en" type="datetime" format="[on] MM-DD-YYYY [at] HH:mm:ss" confirm></date-picker>
                    <a></a>
                    <a class="input_name">To: </a>
                    <date-picker style="width:100%;" v-model="date_to" lang="en" type="datetime" format="[to] MM-DD-YYYY [at] HH:mm:ss" confirm></date-picker>
                </searchDateTimeSection>
                <searchActionSection>
                    <a>Action: </a>
                    <sui-dropdown
                        placeholder="Select Action"
                        selection
                        :options="actionOptions"
                        v-model="action"
                    />
                </searchActionSection>
            </hrHeader>
            <!-- <button class="sumbitButton" type="submit" @click="getTime()">Search</button> -->
        </header>
        <headerinput>
            
        </headerinput>
        <content>
            <table cellspacing="0" style="counter-reset: no">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Memo No.</th>
                        <th>Action Name</th>
                        <th>Action By</th>
                        <th>Action Date/Time</th>
                        <th>Status</th>
                        <th>Error Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data,index) in responseForTable" :key="index">
                        <td class="no" v-if="!isSameMemonumAsBefore(index)" :rowspan="getRowspan(index)"></td>
                        <td>{{ data.memonum }}</td>
                        <td>{{ data.action }}</td>
                        <td>{{ data.actionby }}</td>
                        <td>{{ data.datetime }}</td>
                        <td>{{ data.status }}</td>
                        <td>{{ data.errmsg }}</td>
                        <td>{{ gettime }}</td>
                    </tr>
                </tbody>
            </table>
            <div style="display:flex;justify-content:center;width:100%;margin-top:20px;">
                <div class="pagination">
                    <a :class="pageNumber==1?'hidden':''" @click="pageBack">&laquo;</a>
                    <a :class="i==pageNumber?'active':''" v-for="i in computedPageNumberMax" :key="i" @click="pageGo(i)">{{i}}</a>
                    <a :class="pageNumber==computedPageNumberMax?'hidden':''" @click="pageNext">&raquo;</a>
                </div>
            </div>
        </content>
    </page>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DatePicker from "vue2-datepicker";

export default {
    name: 'HRLog_multi',
    components: { DatePicker },
    data() {
        return {
            datatotal: 0,
            pageNumber: 1,
            pageSize: 10,
            searchBy: [],
            searchByRaw: [],
            searchOptions: [
                {text:'รหัสพนักงาน',key:'employee_id',value:'empcode'}, 
                {text:'ชื่อพนักงาน(ไทย)',key:'name_thai',value:'firstname'},
                {text:'นามสกุล(ไทย)',key:'surname_thai',value:'lastname'},
                {text:'Memo No.',key:'memo_id',value:'memonum'}
                ],
            actionOptions: [
                {text:'',key:'',value:''}, 
                {text:'Create Memo',key:'Create Memo',value:'Create Memo'}, 
                {text:'Send Email',key:'Send Email',value:'Send Email'},
                {text:'Approve',key:'Approve',value:'Approve'},
            ],
            searchValue: '',
            employee_id: "",
            memo_id: "",
            name_thai: "",
            surname_thai: "",
            date_from: "",
            date_to: "",
            action: "",
            selected: "",
            responseForTable: "",
            time: "",
            gettime: "",
            condition: null,
            options: [{
                text: 'AND',
                value: "and",
            }, {
                text: 'OR',
                value: "or",
            }],
        }
    },
    async mounted() {
        this.getTime()
        this.date_to= new Date()
        // const response = await axios.get(
        //     "http://192.9.58.79:8000/api/security-hrlogtracking"
        // );
        // console.log("data : " + JSON.stringify(response.data));
        // this.responseForTable = response.data;
    },
    watch: {
        searchByRaw: "getTime",
        searchValue: "getTime",
        condition: "getTime",
        date_from: "getTime",
        date_to: "getTime",
        action: "getTime",
        pageNumber: "getTime",
        time: async function() {
            const response = await axios.get(
                "http://192.9.58.79:8000/api/security-hrlogtracking"
            );
            // console.log("data : " + JSON.stringify(response.data));
            this.responseForTable = response.data;
        },
        gettime: function() {
            this.responseForTable = this.gettime;
        }
    },
    computed:{
        computedPageNumberMax: function(){
            var floor = Math.floor(this.datatotal/this.pageSize)
            if(this.datatotal/this.pageSize>floor){
                return floor+1
            }else{
                return floor
            }
        },
    },
    methods:{
        getTime() {
            console.log('gettime')
            // console.log(this.date_from.toISOString())
            // console.log(this.action)
            // console.log(this.searchByRaw)
            // console.log(this.searchValue)
            // this.employee_id = null
            // this.name_thai = null
            // this.surname_thai = null
            // this.memo_id = null
            var datefrom = this.date_from
            var dateto = this.date_to
            // var arraySearch = this.searchByRaw
            var result = this.searchValue.split(",")
            // for(let i=0;i<arraySearch.length;i++) {
            //     if(arraySearch[i]=='employee_id'){
            //         this.employee_id = result[i]
            //     }
            //     else if(arraySearch[i]=='name_thai'){
            //         this.name_thai = result[i]
            //     }
            //     else if(arraySearch[i]=='surname_thai'){
            //         this.surname_thai = result[i]
            //     }
            //     else{
            //         this.memo_id = result[i]
            //     }
            // }
            if(this.action == ''){
                this.action = null
            }
            if(this.date_from != '' && this.date_from != null){
                console.log(this.date_from)
                datefrom = this.date_from.toISOString()
            }
            else{
                datefrom = null
            }
            if(this.date_to != '' && this.date_to != null){
                dateto = this.date_to.toISOString()
            }
            else{
                dateto = null
            }

            axios
                .get("http://192.9.58.79:8000/api/security-hrlogtracking", {
                    params: {
                        // empcode: this.employee_id,
                        // memonum: this.memo_id,
                        // firstname: this.name_thai,
                        // lastname: this.surname_thai,
                        // action: this.action,
                        fields: this.searchByRaw,
                        value: result,
                        action: this.action,
                        fromdatetime: datefrom,
                        todatetime: dateto,
                        condition: this.condition,
                        pagenumber: this.pageNumber,
                        pagesize: this.pageSize,
                    }
                })
                .then(response => {
                    if (response.data == null) {
                        this.responseForTable = []
                        this.datatotal = 0
                        console.log(error);
                    } else {
                        this.responseForTable = response.data.logtracking;
                        this.datatotal = response.data.total
                        console.log("time: " + this.gettime);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getParams(){
            this.searchBy = []
            this.searchByRaw.forEach(element => {
                this.searchBy.push(element.code)
            });
        },
        pageBack(){
            if(this.pageNumber == 1) return
            this.pageNumber -= 1
        },
        pageNext(){
            if(this.pageNumber == this.computedPageNumberMax) return
            this.pageNumber += 1
        },
        pageGo(i){
            this.pageNumber = i
        },
        isSameMemonumAsBefore(index){
            if(index != 0){
                if(this.responseForTable[index].memonum == this.responseForTable[index-1].memonum){
                    console.log(true)
                    return true
                }
            }
            console.log(false)
            return false
        },
        getRowspan(index){
            var currentMemonum = this.responseForTable[index].memonum
            var rowspan = 0
            for(var i = index;i<this.responseForTable.length;i++){
                if(this.responseForTable[i].memonum == currentMemonum){
                    rowspan++
                }else{
                    break
                }
            }
            return rowspan
        },
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.no::before {
    counter-increment: no;
    content: counter(no);
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;  
}

.pagination a {
  color: black;
  float: left;
  padding: 5px 11px;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
}

.pagination a.active {
  background-color: #1c2c83;
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}
</style>
