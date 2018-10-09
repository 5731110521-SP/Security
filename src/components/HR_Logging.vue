<template>
    <div>
        <div class="form_container">
            <div class="enterline">
                <span style="font-size: 20px;color:rgb(97, 134, 255);">Search by:</span>
                <br>
                <span>รหัสพนักงาน: </span>
                <input style="margin:10px;" type="text" v-model="employee_id"/>
                <span>Memo No.: </span>
                <input style="margin:10px;" type="text" v-model="memo_id"/>
                <span>ชื่อพนักงาน(ไทย): </span>
                <input style="margin:10px;" type="text" v-model="name_thai"/>
                <span>นามสกุล(ไทย): </span>
                <input style="margin:10px;" type="text" v-model="surname_thai"/>
                <span>ตั้งแต่วันที่: </span>
                 <date-picker style="margin:10px;" v-model="date_from" lang="en" type="datetime" format="[on] MM-DD-YYYY [at] HH:mm:ss"></date-picker>
                <span>ถึงวันที่: </span>
                 <date-picker style="margin:10px;" v-model="date_to" lang="en" type="datetime" format="[to] MM-DD-YYYY [at] HH:mm:ss"></date-picker>
                <br>
                <span>Action: </span>
                <div style="margin:10px;" >
                  <select v-model="selected">
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                    <option value="4">Ford</option>
                    <option value="5">Honda</option>
                    <option value="6">Jaguar</option>
                    <option value="7">Land Rover</option>
                    <option value="8">Mercedes</option>
                    <option value="9">Mini</option>
                    <option value="10">Nissan</option>
                    <option value="11">Toyota</option>
                    <option value="12">Volvo</option>
                  </select>
                </div>
                <br>
                <button class="submitbtn" type="submit">Search</button>
                <button class="submitbtn" type="submit" @click="sentTime()">Post</button>
            </div>
        </div>
        <div>
          <br>
            <table>
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
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
  name: "HR_Logging",
  components: { DatePicker },
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
      employee_id: "",
      memo_id: "",
      name_thai: "",
      surname_thai: "",
      date_from: "",
      date_to: "",
      action: "",
      selected: "",
      responseForTable: "",
      time: ""
    };
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
      console.log("data : " + JSON.stringify(response.data));
      this.responseForTable = response.data;
    }
  },
  methods: {
    sentTime() {
      axios
        .post("http://192.9.58.79:8000/api/security-hrlogtracking", {
          empcode: "10000001",
          memonum: "OT18021003",
          firstname: "Khem",
          lastname: "Li",
          action: "Send Email",
          actionby: "khem",
          datetime: this.date_from,
          status: "success",
          errmsg: ""
        })
        .then(response => {
          if (response.data == null) {
            console.log(error);
          } else {
            this.time = response.data;
            console.log("time: " + this.time);
          }
        })
        .catch(function(error) {
          vm.$parent.messageError("Post Failed!", error.response.data);
          console.log(error);
        });
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
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

.form_container {
  display: flex;
  width: 100%;
}

.dropbtn {
  background-color: rgb(97, 134, 255);
  color: white;
  padding: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

button {
  background-color: #38f3f3;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

table {
  width: 100%;
}
table thead th {
  text-align: left;
  padding: 15px;
}
table thead tr {
  height: 40px;
  background-color: #525151;
  color: white;
}
table tbody tr {
  height: 40px;
  background-color: #fefefe;
}
table tbody tr:nth-child(2n) {
  background-color: #f8f8f8;
}
table tbody tr td {
  text-align: left;
  padding: 15px;
}

.custom-select {
  position: relative;
  font-family: Arial;
}
.custom-select select {
  display: none; /*hide original SELECT element:*/
}
.select-selected {
  background-color: DodgerBlue;
}
/*style the arrow inside the select element:*/
.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}
/*point the arrow upwards when the select box is open (active):*/
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}
/*style the items (options), including the selected item:*/
.select-items div,
.select-selected {
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
  user-select: none;
}
/*style items (options):*/
.select-items {
  position: absolute;
  background-color: DodgerBlue;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}
/*hide the items when the select box is closed:*/
.select-hide {
  display: none;
}
.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
