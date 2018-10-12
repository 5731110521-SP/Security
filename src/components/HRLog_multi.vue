<template>
    <div>
        <headerinput style="padding-top:20px">
            <div class="input_name">Search By: </div>
            <sui-dropdown
                multiple
                fluid
                :options="searchOptions"
                placeholder="Search by"
                search
                selection
                allow-additions
                v-model="searchByRaw"
            />
            <div></div>
            <input class='right_input' type="text" value="" v-model="searchValue">
            <sui-dropdown
                placeholder="Select Mode"
                selection
                :options="options"
                v-model="condition"
            />
        </headerinput>
        <headerinput>
            <div class="input_name">Date From: </div>
            <date-picker style="margin:10px;" v-model="date_from" lang="en" type="datetime" format="[on] MM-DD-YYYY [at] HH:mm:ss" confirm></date-picker>
            <div class="input_name">To: </div>
            <date-picker style="margin:10px;" v-model="date_to" lang="en" type="datetime" format="[to] MM-DD-YYYY [at] HH:mm:ss" confirm></date-picker>
        </headerinput>
        <headerinput>
            <div class="input_name">Action: </div>
            <select class="left_input" v-model="action">
                <option value=""></option>
                <option value="Create Memo">Create memo</option>
                <option value="Send Email">Send Email</option>
                <option value="Approve">Approve</option>
            </select>
        </headerinput>
        <button class="submitBtn" style="margin-left:25px;" type="submit" @click="getTime()">Search</button>
        <headerinput>
            
        </headerinput>
        <content>
            <table cellspacing="0">
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
                        <td>1</td>
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
            <div style="text-align: center;">
                <div class="pagination">
                    <a :class="pageNumber==1?'hidden':''" @click="pageBack">&laquo;</a>
                    <a :class="i==pageNumber?'active':''" v-for="i in computedPageNumberMax" :key="i" @click="pageGo(i)">{{i}}</a>
                    <a :class="pageNumber==computedPageNumberMax?'hidden':''" @click="pageNext">&raquo;</a>
                </div>
            </div>
        </content>
    </div>
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
            pageSize: 4,
            searchBy: [],
            searchByRaw: [],
            searchOptions: [
                {text:'รหัสพนักงาน',key:'employee_id',value:'empcode'}, 
                {text:'ชื่อพนักงาน(ไทย)',key:'name_thai',value:'firstname'},
                {text:'นามสกุล(ไทย)',key:'surname_thai',value:'lastname'},
                {text:'Memo No.',key:'memo_id',value:'memonum'}
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
        const response = await axios.get(
            "http://192.9.58.79:8000/api/security-hrlogtracking"
        );
        console.log("data : " + JSON.stringify(response.data));
        this.responseForTable = response.data;
    },
    watch: {
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
    methods:{
        getTime() {
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
                        condition: this.condition
                    }
                })
                .then(response => {
                    if (response.data == null) {
                        this.responseForTable = []
                        console.log(error);
                    } else {
                        this.responseForTable = response.data;
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
        }
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
/* .tablestyle table{
    margin-left:10px;margin-right:10px;margin-top:30px;
}

.tablestyle td{
    text-align: center;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    border: 1px solid #ddd;
}
.tablestyle th{
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
}
.tablestyle td div{
    text-align: left;
} */

.pagination {
    display: inline-block;
}

.pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    cursor: pointer;
}

.pagination a.active {
    background-color: #4CAF50;
    color: white;
}

.pagination a:hover:not(.active) {background-color: #ddd;}

.pagination .hidden{
    visibility: hidden;
}
.submitBtn {
  /* margin-top: 30px; */
  width: auto;
  height: auto;
  background-color: #38f3f3;
  color: white;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  z-index: -1;
  cursor: pointer;
  border-radius: 10px;
}

.submitBtn:hover {
  background: rgb(97, 134, 255);
}
</style>
