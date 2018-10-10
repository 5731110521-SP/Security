<template>
    <div>
        <div>
            <transition name="modal" v-if="showModal2">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container" style="width:500px">
                            <config-add :mode="mode" :editingItem="editingItem"></config-add>
                        </div>
                    </div>   
                </div>
            </transition>
            <transition name="modal" v-if="showModalDelete">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container" style="width:350px">
                            <p><b>Are you sure to delete this record?</b></p>
                            <div style="text-align:left">
                                <p>System Name: {{deletingItem.sysname}}</p>
                                <p>Configuration Name: {{deletingItem.configurationname}}</p>
                                <p>Value: {{deletingItem.value}}</p>
                            </div>
                            <div style="width:100%;justify-content: space-between;display: flex;padding:0 10%">
                                <button class="submitBtn" type="button" @click="showModalDelete=false">
                                    Cancel
                                </button>
                                <button class="submitBtn" type="button" @click="Delete">OK</button>
                            </div>
                        </div>
                    </div>   
                </div>
            </transition>
        </div>
        
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
            <button class="search_button">Search</button>
            <a></a>
            <button class="new_button" @click="showAddModal()"><i class="fas fa-plus-circle"></i>New</button>
        </header>
        <content>
            <table cellspacing="0">
                <thead>
                    <tr>
                        <th>
                            System Name
                        </th>
                        <th>
                            Configuration Name
                        </th>
                        <th style="max-width:300px">
                            Value
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in datalist" :key="index">
                        <td>{{item.sysname}}</td>
                        <td>{{item.configurationname}}</td>
                        <td>{{item.value}}</td>
                        <td>
                            <button class="btn" @click="edit(item)"><img src="../assets/edit.png" class="tableimage"></button>
                            <button class="btn" @click="messageDelete(item)"><img src="../assets/cancel.png" class="tableimage"></button>
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
        <modal v-if="showModal1" @close="showModal1 = false">
            <!--
            you can use custom content here to overwrite
            default content
            -->
            <h3 slot="header">custom header</h3>
            <div slot="body" style="width:300px">
                <config-add/>
            </div>
            <div slot="footer">
            </div>
        </modal>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "ViewLog",
  data() {
    return {
      datalist: [
        {
          sysname: "CRM",
          configurationname: "PanuvitV",
          Value: "192.9.0.122"
        },
        {
          sysname: "CRM",
          configurationname: "PanuvitV",
          Value: "192.9.0.122"
        },
        {
          sysname: "CRM",
          configurationname: "PanuvitV",
          Value: "192.9.0.122"
        }
      ],
      datatotal: 0,
      pageNumber: 1,
      pageSize: 5,
      searchBy: [],
      searchByRaw: [],
      searchOptions: [
        { name: "System Name", code: "sysname" },
        { name: "Configuration Name", code: "configurationname" }
      ],
      searchValue: "",
      showModal1: false,
      showModal2: false,
      showModalDelete: false,
      deletingItem: null,
      mode: "Add",
      editingItem: null
    };
  },
  watch: {
    searchValue: "getData",
    searchByRaw: "getParams",
    searchBy: "getData",
    pageNumber: "getData"
  },
  computed: {
    computedPageNumberMax: function() {
      var floor = Math.floor(this.datatotal / this.pageSize);
      if (this.datatotal / this.pageSize > floor) {
        return floor + 1;
      } else {
        return floor;
      }
    }
  },
  created() {
    this.getData();
    this.$parent.page = "configsearch";
  },
  methods: {
    getData() {
      var vm = this;
      axios
        .get(process.env.ROOT_API + "security-config", {
          params: {
            fields: this.searchBy,
            value: this.searchValue,
            pagenumber: this.pageNumber,
            pagesize: this.pageSize
          }
        })
        .then(response => {
          if (response.data == null) {
            vm.datalist = [];
            vm.datatotal = 0;
          } else {
            vm.datalist = response.data.configuration;
            vm.datatotal = response.data.total;
          }
        })
        .catch(function(error) {
          vm.$parent.messageError("Get Employee Failed!", error.response.data);
          console.log(error);
        });
    },
    handleSubmit() {
      this.getData();
    },
    clear() {
      this.searchByRaw = [];
      this.searchValue = "";
      this.getData();
    },
    showAddModal() {
      // this.showModal1=true
      this.mode = "Add";
      this.showModal2 = true;
      console.log("showadd");
    },
    hideModel() {
      this.showModal2 = false;
      this.getData();
    },
    Delete() {
      axios
        .put(process.env.ROOT_API + "security-config/delete", {
          id: this.deletingItem.id
        })
        .then(response => {
          // vm.$parent.messageError('Delete Success','')
          this.getData();
          this.showModalDelete = false;
        })
        .catch(function(error) {
          // vm.$parent.messageError('Delete Failed!',error.response.data)
          console.log(error);
        });
    },
    messageDelete(item) {
      this.deletingItem = item;
      this.showModalDelete = true;
    },
    edit(item) {
      this.mode = "Edit";
      this.editingItem = item;
      this.showModal2 = true;
    },
    getParams() {
      this.searchBy = [];
      this.searchByRaw.forEach(element => {
        this.searchBy.push(element.code);
      });
    },
    pageBack() {
      if (this.pageNumber == 1) return;
      this.pageNumber -= 1;
    },
    pageNext() {
      if (this.pageNumber == this.computedPageNumberMax) return;
      this.pageNumber += 1;
    },
    pageGo(i) {
      this.pageNumber = i;
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
/* .tablestyle td{
    text-align: center;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
}
.tablestyle th{
    text-align: center;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
}
.tablestyle p{
    text-align: left;
    line-height: 0.5;
} */

.modal-mask {
  position: fixed;
  z-index: 9000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.tableimage {
  width: 15px;
  height: 15px;
}
.btn {
  background-color: Transparent; /* Blue background */
  border: none; /* Remove borders */
}

.submitBtn {
  /* margin-top: 30px; */
  width: auto;
  height: auto;
  background: #4974ff;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px;
}

.submitBtn:hover {
  background: rgb(97, 134, 255);
}
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
  background-color: #4caf50;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

.pagination .hidden {
  visibility: hidden;
}
</style>
