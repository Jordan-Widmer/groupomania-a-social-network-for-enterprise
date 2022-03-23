<template>
<body>
  <div class="wrapper">
    <h2>Registration Groupomania</h2>
    <form @submit.prevent="handleSignUp">
      <div class="input-box">
        <input type="text" v-model="user.name" placeholder="Enter your name" required />
      </div>
      <div class="input-box">
        <input type="email" placeholder="Enter your email" v-model="user.email" required />
      </div>
      <div class="input-box">
        <input type="password" placeholder="Create password" required v-model="user.password" />
      </div>
      <div class="input-box">
        <input
          type="password"
          placeholder="Confirm password"
          required
          v-model="user.conformPassword"
        />
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
import { mapActions } from "vuex";

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
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    handleSignUp() {
      this.signUp({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      });
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
  background: #000000;
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
</style>

