<template>
  <body>
    <div class="wrapper">
      <form action="#" @submit.prevent="handleUpdateProfile">
        <div class="alert" v-if="profileUpdate">{{ profileUpdateMessage }}</div>
        <h2>Mon profil</h2>
        <img
          :src="url"
          v-if="url"
          width="100"
          height="100"
          class="image-profile"
          alt
        />
        <br />
        <div class="upload-btn-wrapper">
          <button class="btn">Upload a file</button>
          <input type="file" accept="image/*" @change="selectFile($event)" />
        </div>
        <div class="input-box">
          <input
            type="text"
            placeholder="Change name"
            ref="userName"
            v-model="user.name"
            pattern="^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
          />
          <p class="error" v-if="error.name">{{ error.name }}</p>
        </div>
        <div class="input-box">
          <input
            type="email"
            placeholder="Change email"
            v-model="user.email"
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          />
          <p class="error" v-if="error.email">{{ error.email }}</p>
        </div>
        <div class="input-box">
          <input
            type="password"
            placeholder="Change password"
            v-model="user.password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          />
          <p class="error" v-if="error.password">{{ error.password }}</p>
        </div>
        <div class="input-box button">
          <input type="Submit" value="Mettre à jour" />
        </div>
        <div class="input-box button">
          <input
            type="button"
            @click="handleDeleteProfile"
            value="Supprimer profil"
          />
        </div>
      </form>
    </div>
  </body>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      error: {
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
      if (this.validateForm()) {
        this.UpdateProfile({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          id: this.getLoggedUser.id,
          file: this.file,
        });
      }
    },
    validateForm() {
      if (this.user.name == "") {
        this.error.name = "Please enter your name";
      }
      if (this.user.email == "") {
        this.error.email = "Please enter your email";
        return false;
      }
      return true;
    },
    handleDeleteProfile() {
      this.DeleteProfile(this.getLoggedUser.id);
    },
    selectFile(e) {
      console.log(e.target.files[0]);
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
  },
  computed: {
    ...mapState(["profileUpdate", "profileUpdateMessage"]),
    ...mapGetters(["getLoggedUser"]),
  },
  mounted() {
    console.log("mounting hook");
    console.log(this.getLoggedUser);
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
  /* background: #000000; */
  background-image: url("../assets/background.jpg");
}
.wrapper {
  max-width: 430px;
  width: 100%;
  background: #1b1b1b;
  padding: 34px;
  border-radius: 6px;
}
.wrapper h2 {
  font-size: 35px;
  font-weight: 600;
  color: #e2e2e2;
}
.wrapper form {
  margin-top: 0px;
}
.wrapper form .input-box {
  height: 52px;
  margin: 20px 0;
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
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  margin: 10px 0px 10px 0px;
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
.alert {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: black;
  background-color: #86ffa4;
  border-color: #0bff07;
}
.error {
  text-align: left !important;
  padding: 6px 2px;
  color: red;
}
</style>

