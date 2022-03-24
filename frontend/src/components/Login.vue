<template>
<body>
  <div class="wrapper">
    <h2 class="title">Login Groupomania</h2>
    <form @submit.prevent="handleLogIn">
      <div class="alert" v-if="LoginError">{{this.LoginErrorMessage}}</div>
      <div class="field">
        <input type="email" placeholder="Email Address" v-model="user.email" />
        <p class="error" v-if="error.email">{{error.email}}</p>
      </div>
      <div class="field">
        <input type="password" placeholder="Password" v-model="user.password" />
        <p class="error" v-if="error.password">{{error.password}}</p>
      </div>
      <div class="content">
        <div class="checkbox">
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">Remember me</label>
        </div>
        <div class="pass-link">
          <a href="#">Forgot password?</a>
        </div>
      </div>
      <div class="field">
        <input type="submit" value="Login" />
      </div>
      <div class="signup-link">
        Not a member?
        <a href="/sign">Signup now</a>
      </div>
    </form>
  </div>
</body>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapState(["LoginError", "LoginErrorMessage"]),
  },
  methods: {
    ...mapActions(["Login"]),
    handleLogIn() {
      if (this.validateForm()) {
        this.Login({ ...this.user });
      }
    },
    validateForm() {
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
      return true;
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      error: {
        email: "",
        password: "",
      },
    };
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
html,
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  padding: 30px;
}
::selection {
  background: #4158d0;
  color: #fff;
}
.wrapper {
  width: 380px;
  background: #1b1b1b;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
}
.wrapper .title {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  color: #000000;
  user-select: none;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
}
.wrapper form {
  padding: 10px 30px 50px 30px;
}
::placeholder {
  color: lightgrey;
}
.wrapper form .field {
  height: 50px;
  width: 100%;
  margin-top: 40px;
  position: relative;
}
.wrapper form .field input {
  height: 100%;
  background: #363636;
  width: 100%;
  outline: none;
  font-size: 17px;
  padding-left: 20px;
  color: lightgrey;
  border: 1px solid lightgrey;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.wrapper form .field input:focus {
  border-color: #ff9000;
}
form .content {
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 16px;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
}
form .content .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}
form .content input {
  width: 15px;
  height: 15px;
  background: red;
}
form .content label {
  color: #e2e2e2;
  user-select: none;
  padding-left: 5px;
}
form .content .pass-link {
  color: "";
}
form .field input[type="submit"] {
  color: #000000;
  border: none;
  padding-left: 0;
  margin-top: -10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
  transition: all 0.3s ease;
}
form .field input[type="submit"]:active {
  transform: scale(0.95);
}
form .signup-link {
  color: #e2e2e2;
  margin-top: 20px;
  text-align: center;
}
form .pass-link a,
form .signup-link a {
  color: #ff9000;
  text-decoration: none;
}
form .pass-link a:hover,
form .signup-link a:hover {
  text-decoration: underline;
}
@media (max-width: 415px) {
  html,
  body {
    padding: unset;
  }
  form .content label {
    font-size: 14px;
  }
  form .pass-link a,
  form .signup-link a {
    font-size: 14px;
  }
  .wrapper .title {
    border-radius: unset;
    font-size: 33px;
  }
  .wrapper {
    border-radius: unset;
    width: 100%;
  }
}
@media (max-width: 340px) {
  .wrapper .title {
    border-radius: unset;
    font-size: 31px;
  }
}
.error {
  text-align: left !important;
  padding: 6px 2px;
  color: red;
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

