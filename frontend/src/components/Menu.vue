<template>
<body>
  <div class="wrapper">
    <form action="#" @submit.prevent="handleUpdateProfile">
      <img :src="url" v-if="url" width="100" height="100" class="image-profile" alt />
      <br />
      <div class="upload-btn-wrapper">
        <button class="btn">Upload a file</button>
        <input type="file" accept="image/*" @change="selectFile($event)" />
      </div>
      <h2>Mon profil</h2>
      <div class="input-box">
        <input type="text" placeholder="Change name" ref="userName" v-model="user.name" required />
      </div>
      <div class="input-box">
        <input type="email" placeholder="Change email" v-model="user.email" required />
      </div>
      <div class="input-box">
        <input type="password" placeholder="Change password" v-model="user.password" required />
      </div>
      <div class="input-box button">
        <input type="Submit" value="Mettre à jour" />
      </div>
      <div class="input-box button">
        <input type="button" @click="handleDeleteProfile" value="Supprimer profil" />
      </div>
    </form>
  </div>
</body>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      file: [],
      url: null,
    };
  },
  methods: {
    ...mapActions(["UpdateProfile", "DeleteProfile"]),
    handleUpdateProfile() {
      this.UpdateProfile({
        ...this.user,
        id: this.getLoggedUser._id,
        file: this.file,
      });
    },
    handleDeleteProfile() {
      this.DeleteProfile(this.getLoggedUser._id);
    },
    selectFile(e) {
      console.log(e.target.files[0]);
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  mounted() {
    this.user.name = this.getLoggedUser.name;
    this.user.email = this.getLoggedUser.email;
    this.user.password = this.getLoggedUser.password;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
}
.wrapper {
  max-width: 430px;
  width: 100%;
  background: #1b1b1b;
  padding: 34px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.wrapper h2 {
  font-size: 35px;
  font-weight: 600;
  color: #e2e2e2;
}
.wrapper form {
  margin-top: 30px;
}
.wrapper form .input-box {
  height: 52px;
  margin: 18px 0;
}
::placeholder {
  color: lightgrey;
}
p {
  color: lightgrey;
  font-size: 11.5px;
}
form .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: lightgrey;
  background: #363636;
  border: 1px solid lightgrey;
  border-bottom-width: 2.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.input-box input:focus,
.input-box input:valid {
  border-color: #ff9000;
}
form .policy {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
form h3 {
  color: #e2e2e2;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}
.input-box.button input {
  color: #000000;
  letter-spacing: 1px;
  font-size: 20px;
  font-weight: 500;
  border: none;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
  cursor: pointer;
  transition: all 0.3s ease;
}
form .field input[type="submit"]:active {
  transform: scale(0.95);
}
.input-box.button input[type="submit"]:active {
  transform: scale(0.95);
}
form .text h3 {
  color: #e2e2e2;
  width: 100%;
  text-align: center;
}
form .text h3 a {
  color: #ff9000;
  text-decoration: none;
}
form .text h3 a:hover {
  text-decoration: underline;
}
nav {
  display: flex;
  height: 80px;
  width: 100%;
  background: #1b1b1b;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 100px;
  flex-wrap: wrap;
}
nav .logo {
  display: flex;
  align-items: center;
  height: 60px;
}
nav .logo img {
  height: 230px;
}
.mat-raised-button {
  height: 23px;
  width: 100px;
}
.mat-primary {
  background: linear-gradient(-135deg, #ff9000, #c46f00);
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  cursor: pointer;
  color: #000000;
  border: none;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 3px;
}
.image-profile {
  border-radius: 50%;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid #ff9000;
  color: #000000;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>

