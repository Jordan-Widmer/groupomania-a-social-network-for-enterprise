<template>
  <body>
    <div class="wrapper">
      <h2>Registration Groupomania</h2>
      <div class="alert" v-if="LoginError">{{ this.LoginErrorMessage }}</div>
      <form class="text-center" @submit.prevent="handleSignUp">
        <div class="input-box">
          <input
            type="text"
            v-model="user.name"
            placeholder="Enter your name"
          />
          <p class="error" v-if="error.name">{{ error.name }}</p>
        </div>
        <div class="input-box">
          <input
            type="email"
            placeholder="Enter your email"
            v-model="user.email"
          />
          <p class="error" v-if="error.email">{{ error.email }}</p>
        </div>
        <div class="input-box">
          <input
            type="password"
            placeholder="Create password"
            v-model="user.password"
          />
          <p class="error" v-if="error.password">{{ error.password }}</p>
        </div>
        <div class="input-box">
          <input
            type="password"
            placeholder="Confirm password"
            v-model="user.conformPassword"
          />
          <p class="error" v-if="error.conformPassword">
            {{ error.conformPassword }}
          </p>
        </div>
        <div class="policy">
          <input type="checkbox" />
          <h3>I accept all terms & condition</h3>
        </div>
        <div class="input-box button">
          <input type="Submit" value="Register Now" />
        </div>
        <div class="text">
          <h3>
            Already have an account?
            <a href="/login">Login now</a>
          </h3>
        </div>
      </form>
    </div>
  </body>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Sign",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        conformPassword: "",
      },
      error: {
        name: "",
        email: "",
        password: "",
        conformPassword: "",
      },
    };
  },
  computed: {
    ...mapState(["LoginError", "LoginErrorMessage"]),
  },
  methods: {
    ...mapActions(["signUp"]),
    validateForm() {
      if (this.user.name == "") {
        this.error.name = "Please enter your name";
        return false;
      }
      if (this.user.email == "") {
        this.error.email = "Please enter your email";
        return false;
      }
      if (this.user.password == "") {
        this.error.password = "Please enter your Password";
        return false;
      }
      if (this.user.password.length < 5) {
        this.error.password = "password should be more than 5 characters";
        return false;
      }
      if (this.user.conformPassword == "") {
        this.error.conformPassword = "Please conform your password";
        return false;
      }
      if (this.user.password != this.user.conformPassword) {
        this.error.conformPassword = "Your password does not match";
        return false;
      }
      return true;
    },
    handleSignUp() {
      console.log(this.validateForm());
      if (this.validateForm()) {
        this.signUp({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        });
      }
    },
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
  background-image: url("../assets/background.jpg");
  /* background: #000000; */
}
.wrapper {
  position: relative;
  max-width: 430px;
  width: 100%;
  background: #1b1b1b;
  padding: 34px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.wrapper h2 {
  position: relative;
  font-size: 35px;
  font-weight: 600;
  color: #e2e2e2;
}
.wrapper h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 38px;
  border-radius: 12px;
  background: #ff9000;
}
.wrapper form {
  margin-top: 30px;
}
.wrapper form .input-box {
  height: 52px;
  margin: 26px 0;
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
.error {
  color: red;
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
.error {
  text-align: left !important;
  padding: 3px 2px;
  color: #de5d5d;
  display: flex;
  font-size: 14px;
  justify-content: center;
}
.alert {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}
</style>

