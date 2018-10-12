<template>
  <div id="app">
    <navbar>
        <left><img src="./assets/logo_sansiri-ratina.png" style="width:40px;height:40px;margin-right:30px;">AdminTools</left>
        <right>
            <i style="font-size:15px;margin-right:10px;" class="fas fa-user"></i>
            Admin
        </right>
    </navbar>
		<div id="sidebar">
      <div class="toggle-btn" @mouseover="toggleSidebar()">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <li >
        <div id="ViewLog" class="smallList" style="margin-top:15px" @click="goPage('ViewLog')">Customer Tracking Log<i class="fas fa-arrow-right"></i> </div>
        <div id="HRLog_multi" class="smallList" style="margin-top:15px" @click="goPage('HRLog_multi')">HR Tracking Log<i class="fas fa-arrow-right"></i> </div>
        </li>
      </ul>
    </div>
		<router-view/>
  </div>
</template>

<script src="node_modules/vue/dist/vue.min.js"></script>
<script src="node_modules/semantic-ui-vue/dist/umd/semantic-ui-vue.min.js"></script>

<script>
export default {
  name: "App",
  data() {
    return {
      modalError: {
        title: "",
        content: "",
      }
    };
  },
  methods: {
    messageError(title, content) {
      this.modalError.title = title;
      this.modalError.content = content;
      this.$root.$emit("bv::show::modal", "modalError");
    },
    showPopUp(id){
      document.getElementById(id).style.display = 'flex'
    },
    closePopUp(id){
      document.getElementById(id).style.display = 'none'
    },
    toggleSidebar(){
      document.getElementById("sidebar").classList.toggle('active')
      console.log("toggleSideBar");
    },
    goPage(page){
			document.getElementById('ViewLog').style.fontWeight = 'normal';
			document.getElementById('HRLog_multi').style.fontWeight = 'normal';
			document.getElementById(page).style.fontWeight = 'bold';
      this.$router.push(page)
    }
  }
};
</script>

<style src="./css/app.css"></style>

<style>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
@import url('https://fonts.googleapis.com/css?family=Kanit:400,700');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #707070;
}

body{
  margin: 0px;
}

.menuBtn{
  width:50px;
  height:50px;
  position: absolute;
  left:10px;
  cursor: pointer;
}

.closeMenuBtn{
  width:50px;
  height:50px;
  cursor: pointer;
}

#sidebar{
  position: absolute;
  width:20%;
  height:80%;
  top:80px;
  background:#ffffff;
  /* left:-200px; for animation*/
  transition: all 500ms linear;
  text-align:left;
  margin-left:-20px;
}

#sidebar ul li{
  color: #151719 0.8;
  list-style:none;
  padding: 15px;
  font-size:25px;
}

/* #sidebar .toggle-btn {
  position : absolute;
  left:230px;
  top: 20px;
}

#sidebar .toggle-btn span{
  display: block;
  width: 30px;
  height: 5px;
  background: #151719;
  margin: 3px 0px;
  cursor: pointer;
}

#sidebar.active{
  left:0px;
}for animation
*/

.smallList{
  font-size:15px;
  cursor: pointer;
  margin-left:10px;
  border-bottom: 1px solid rgba(100,100,100,0.3);
  margin-left:0px;
  display:flex;
  padding-bottom:10px;
  justify-content: space-between;
} 


/* .sideBar{
  width:200px;
  height:100vh;
  position: absolute;
  background:#000000;
  top:0px;
  display:fixed;
  left:-200px
}

.sidebar .active{
  left:0px;
} */

.borderOnTop{
  width: 100%;
  height: 70px;
  background: #ffffff;
  top:0;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  z-index: 200;
  /* border-style: solid;
  border-width: 1px;
  border-color: #BBB8B8; */
  box-shadow: 5px 5px 8px #888888;
  flex-direction: row;
}

.sansirilogo{
  width: 50px;
  height: 40px;
  padding: 15px;
  padding-left:30px; 
}

.textOnTop{
  display:flex;
  justify-content:center;
  align-items:center;
  color: #707070;
}

.headerThai{
  font-family: 'Kanit', sans-serif;
}

.searchBox{
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submitBtn{
  /* margin-top: 30px; */
  width: auto;
  height: auto;
  background: #4974FF;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
}

.submitBtn:hover{
  background: rgb(97, 134, 255);
}

.divInSideBar{
  width:100%;
  margin-top:70px;
  display:flex;
  flex-direction:column;
}
</style>