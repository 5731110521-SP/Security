<template>
    <div>
        
        <header>
            <multiselect 
                v-model="searchByRaw" 
                :options="searchOptions"
                label="name"
                track-by="code" 
                :multiple="true"
                :hide-selected="true">
            </multiselect>
            <input class='right_input' type="text" value="" v-model="searchValue">
            <button>Search</button>
        </header>

        <content>
            <table cellspacing="0">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>System Name</th>
                        <th>User</th>
                        <th>IP</th>
                        <th>Action</th>
                        <th>Customer Data</th>
                        <th>Custom Field</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item,index) in datalist" :key="index">
                        <td>{{item.createddate}}</td>
                        <td>{{item.sysname}}</td>
                        <td>{{item.user}}</td>
                        <td>{{item.ipaddress}}</td>
                        <td>{{item.action}}</td>
                        <td style="max-width:300px">
                            <div v-for="(data,index) in item.customerdata" :key="index">
                                <div v-for="(value,key) in data" :key="key">
                                    {{key}} : {{value}}
                                </div>
                            </div>
                        </td>
                        <td style="max-width:300px">
                            <div v-for="(value,key) in item.customfield" :key="key">
                                {{key}} : {{value}}
                            </div>
                        </td>
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

export default {
    name: 'ViewLog',
    data() {
        return {
            datalist: [{
                createddate: '2018-09-27T14:14:14+07:00',
                sysname: 'CRM',
                user: 'PanuvitV',
                ipaddress: '192.9.0.122',
                อ: 'Search',
                customerdata: [{"CustomerID":"John", "PassportID":"11038488472733","a":"a","b":"b"}],
                customfield: {"QuotationNo":"1208317474", "Date":"9/27/2018"},
            }],
            datatotal: 0,
            pageNumber: 1,
            pageSize: 4,
            searchBy: [],
            searchByRaw: [],
            searchOptions: [
                {name:'System Name',code:'sysname'}, 
                {name:'User',code:'user'}, 
                {name:'IP Address',code:'ip'},
                {name:'Action',code:'action'}
                ],
            searchValue: '',
        }
    },
    watch:{
        searchValue: function (val) {
            console.log('asd')
            this.pageNumber = 1
            this.getData()
        },
        searchByRaw: "getParams",
        searchBy: "getData",
        pageNumber: "getData"
    },
    computed:{
        computedPageNumberMax: function(){
            var floor = Math.floor(this.datatotal/this.pageSize)
            if(this.datatotal/this.pageSize>floor){
                return floor+1
            }else{
                return floor
            }
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            var vm = this
            axios.get(process.env.ROOT_API+'security-logtracking',{
                params: {
                    fields: this.searchBy,
                    value: this.searchValue,
                    pagenumber: this.pageNumber,
                    pagesize: this.pageSize,
                }
            })
            .then(response => {
                if(response.data == null){
                    vm.datalist = []
                    vm.datatotal = 0
                }else{
                    vm.datalist = response.data.logtracking
                    vm.datatotal = response.data.total
                }
              })
              .catch(function (error) {
                console.log(error);
              })
        },
        handleSubmit(){
            this.getData()
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
</style>