<template>
    <page>
        <header>
          <contentHeader>
            <mainHeader>Customer Tracking Log</mainHeader>
            <description>for view log of customer data tracking.</description>
          </contentHeader>
                <sui-dropdown
                    class="left_input"
                    fluid
                    multiple
                    :options="searchOptions"
                    placeholder="Search By"
                    selection
                    v-model="searchBy"
                />
                <input class="right_input" v-model="searchValue" placeholder="search...">
                
        </header>
        <content>
            <table class="col_12" style="border-collapse:collapse" >
                <thead style="background:#525151;color:#ffffff;text-align:left">
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
                <tr style="background:#707070;height:10px"></tr>
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
export default {
    name: 'ViewLog',
    data() {
        return {
            datalist: [{
                createddate: '2018-09-27T14:14:14+07:00',
                sysname: 'CRM',
                user: 'PanuvitV',
                ipaddress: '192.9.0.122',
                action: 'Search',
                customerdata: [{"CustomerID":"John", "PassportID":"11038488472733","a":"a","b":"b"}],
                customfield: {"QuotationNo":"1208317474", "Date":"9/27/2018"},
            }],
            datatotal: 0,
            pageNumber: 1,
            pageSize: 4,
            searchBy: [],
            searchOptions: [
                {text:'System Name',key:'sysname',value:'sysname'}, 
                {text:'User',key:'user',value:'user'}, 
                {text:'IP Address',key:'ipaddress',value:'ipaddress'},
                {text:'Action',key:'action',value:'action'}
                ],
            searchValue: '',
        }
    },
    watch:{
        searchValue: function (val) {
            this.pageNumber = 1
            this.getData()
        },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import url("https://fonts.googleapis.com/css?family=Kanit:400,700");

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
  text-align: left;
  margin-left: 50px;
}
a {
  color: #42b983;
}

.mainDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}

.templateOnWeb {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  min-height: 700px;
  height: auto;
  box-shadow: 5px 5px 8px #888888;
  border-style: solid;
  border-width: 1px;
  border-color: #bbb8b8;
}



.submitBtnInPopUp {
  /* margin-top: 30px; */
  font-family: "Montserrat", sans-serif;
  width: auto;
  height: auto;
  background: #7a7a7a;
  color: #ffffff;
  /* margin: 10px; */
  cursor: pointer;
  border-radius: 2px;
  border: none;
  padding: 15px 30px 15px 30px;
}

.submitBtnInPopUp:hover {
  background: #a0a0a0;
  color: #ffffff;
}

.headerThai {
  font-family: "Kanit", sans-serif;
}

.manageComponentInCreateShowcase {
  width: 500px;
  display: flex;
  flex-direction: column;
}

.manageComponentInput {
  display: flex;
  height: 30px;
  width: auto;
  justify-content: space-between;
  margin-top: 20px;
}

.inputComponent {
  border-radius: 10px;
  border: 1px solid #707070;
  text-align: center;
}

.manageButtonComponent {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.popupModal {
  background-color: rgba(0, 0, 0, 0.822);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.popupBody {
  width: auto;
  height: auto;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: space-around;
  width: 40%;
  height: 75%;
  font-size: 20px;
  padding-left: 70px;
  padding-right: 70px;
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

.cool-link::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: #000000;
  transition: width 0.3s;
}

.cool-link:hover::after {
  width: 100%;
  transition: width 0.3s;
}

.multiselect__content-wrapper {
  position: relative;
}

.editHover{
  color: #878787;
}

.editHover:hover{
  color: #ffa136;
}

.deleteHover{
  color: #878787;
}

.deleteHover:hover{
  color: #ff2e2e;
}
</style>