<template>
    <div>
        <form @submit.prevent="Add">
            <table>
                <tr>
                    <th>
                        <font :color="error=='sysname0'?'red':''">
                            System Name
                            <font v-if="error=='sysname0'">
                                *
                            </font>
                            : 
                        </font>
                    </th>
                    <td><input style="width:250px" type="text" value="" v-model="sysname"></td>
                </tr>
                <tr>
                    <th style="width:300px">
                        <font :color="error=='configurationname0'?'red':''">
                            Configuration String
                            <font v-if="error=='configurationname0'">
                                *
                            </font>
                            : 
                        </font>
                    </th>
                    <td><input style="width:250px" type="text" value="" v-model="configurationname"></td>
                </tr>
                <tr>
                    <th>
                        <font :color="error=='value0'?'red':''">
                            Value
                            <font v-if="error=='value0'">
                                *
                            </font>
                            : 
                        </font>
                    </th>
                    <td>
                        <textarea wrap="soft" v-model="value"></textarea>
                    </td>
                </tr>
            </table>
            <button class="submitBtn" type="button" @click="hideModel">Cancel</button>
            <button class="submitBtn" type="submit">Save</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Add',
    props: ['mode','editingItem'],
    data() {
        return {
            sysname: '',
            configurationname: '',
            value: '',
            error: '',
        }
    },
    mounted(){
        console.log(this.editingItem)
        if(this.mode == 'Edit'){
            this.sysname = this.editingItem.sysname
            this.configurationname = this.editingItem.configurationname
            this.value = this.editingItem.value
        }
    },
    methods: {
        Add: function () {
            var vm = this
            if(this.sysname==''){
                this.error = 'sysname0'
            }else if(this.configurationname == ''){
                this.error = 'configurationname0'
            }else if(this.value == ''){
                this.error = 'value0'
            }else{
                if(this.mode == 'Add'){
                    axios.post(process.env.ROOT_API+'security-config', {
                        "sysname": this.sysname,
                        "configurationname": this.configurationname,
                        "value": this.value,
                    })
                    .then(function (response) {
                        if(vm.$parent) {
                            vm.$parent.hideModel()
                            // vm.$parent.$parent.messageError('Create Employee Success','')
                        }
                        // vm.$router.go(-1)
                    })
                    .catch(function (error) {
                        console.log(error);
                        if(vm.$parent) {
                            vm.$parent.$parent.messageError('Error Create Configuration Failed',error.response.data)
                            vm.$parent.showModal2=false
                        }
                    });
                }else{
                    axios.put(process.env.ROOT_API+'security-config', {
                        "id": this.editingItem.id,
                        "sysname": this.sysname,
                        "configurationname": this.configurationname,
                        "value": this.value,
                    })
                    .then(function (response) {
                        if(vm.$parent) {
                            vm.$parent.hideModel()
                            // vm.$parent.$parent.messageError('Create Employee Success','')
                        }
                        // vm.$router.go(-1)
                    })
                    .catch(function (error) {
                        console.log(error);
                        if(vm.$parent) {
                            vm.$parent.$parent.messageError('Error Edit Configuration Failed',error.response.data)
                            vm.$parent.showModal2=false
                        }
                    });
                }
            }
        },
        hideModel(){
            if(this.$parent) {
                this.$parent.hideModel()
            }
        }
    }
}
</script>

<style>
.submitBtn{
  /* margin-top: 30px; */
  width: auto;
  height: auto;
  background: #4974FF;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px
}

.submitBtn:hover{
  background: rgb(97, 134, 255);
}
</style>