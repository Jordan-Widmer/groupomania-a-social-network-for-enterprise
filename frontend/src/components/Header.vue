<template>
  <body>
    <nav>
      <div class="logo">
        <img src="../assets/icon-left-font-monochrome-white.png" alt />
      </div>
      <input type="checkbox" id="click" />
      <label for="click" class="menu-btn">
        <i class="fa-solid fa-bars"></i>
      </label>
      <ul class="navbar-list">
        <li>
          <router-link class="active" to="/acceuil">Home</router-link>
        </li>
        <li v-if="getLoggedUser.isAdmin == 0">
          <router-link to="/acceuil" class="nav-link">Actualités</router-link>
        </li>
        <li v-if="getLoggedUser.isAdmin == 1">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/profil" class="nav-link">Profil</router-link>
        </li>
        <li>
          <router-link to="#" @click="handleLogout">
            <i class="mdi mdi-logout"></i>Déconnexion
          </router-link>
        </li>

        <li>
          <div class="half">
            <label for="profile2" class="profile-dropdown">
              <input type="checkbox" id="profile2" />
              <img
                :src="`http://localhost:5000/api/uploads/${getLoggedUser.img}`"
                width="40"
                height="40"
              />
            </label>
          </div>
        </li>
      </ul>
    </nav>
  </body>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  methods: {
    ...mapActions(["LogOut"]),
    handleLogout() {
      this.LogOut();
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
}
body {
  font-family: "Poppins", sans-serif;
}
p {
  color: red;
}
@media (max-width: 550px) {
  .navbar-list {
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    flex: 40% !important;
  }
  .nav ul li {
    margin: 20px 0px !important;
  }
  .profile-dropdown input[type="checkbox"]:checked ~ ul {
    margin-left: 15px !important;
  }
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
nav ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
nav ul li {
  margin: 0 5px;
}
nav ul li a {
  color: lightgrey;
  text-decoration: none;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 5px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
nav ul li a.active,
nav ul li a:hover {
  /* color: #111; */
  background: linear-gradient(-135deg, #142644, #2c3c5c);
}
nav .menu-btn i {
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: none;
}
input[type="checkbox"] {
  display: none;
}
@media (max-width: 1000px) {
  nav {
    padding: 0 40px 0 50px;
  }
}
@media (max-width: 920px) {
  nav .menu-btn i {
    display: block;
  }
  .profile-dropdown img {
    width: 6rem !important;
    height: 6rem !important;
  }
  #click:checked ~ .menu-btn i:before {
    content: "\f00d";
  }
  nav ul {
    position: fixed;
    top: 80px;
    left: -100%;
    background: #1b1b1b;
    height: 100vh;
    width: 100%;
    text-align: center;
    display: block;
    transition: all 0.3s ease;
  }
  #click:checked ~ ul {
    left: 0;
    display: unset;
  }
  nav ul li {
    width: 100%;
    margin: 10px 0;
  }
  nav ul li a {
    width: 100%;
    margin-left: -100%;
    display: block;
    font-size: 20px;
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  #click:checked ~ ul li a {
    margin-left: 0px;
  }
  nav ul li a.active,
  nav ul li a:hover {
    background: none;
    color: #ff9000;
  }
  nav .logo img {
    height: 180px;
  }
}

.profile-dropdown {
  display: inline-block;
  position: relative;
  margin: auto;
  font-size: 18px;
  border-radius: 3px;
}
.profile-dropdown * {
  -webkit-user-select: none;
  /* Chrome all / Safari all */
  -moz-user-select: none;
  /* Firefox all */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* Likely future */
}
.profile-dropdown input[type="checkbox"] {
  display: none;
}
.profile-dropdown input[type="checkbox"]:checked ~ ul {
  display: block;
  animation: pulse 0.5s;
  z-index: 20000;
}
.profile-dropdown input[type="checkbox"]:checked ~ label i {
  color: #f2f2f2;
}
.profile-dropdown input[type="checkbox"]:checked ~ label:after {
  content: "";
  position: absolute;
  top: 100%;
  right: calc(50% - 10px);
  display: block;
  border-style: solid;
  border-width: 7px 10px 0 10px;
  /* border-color: orange transparent transparent transparent; */
  width: 0;
  height: 0;
}
.profile-dropdown img {
  display: inline-block;
  object-fit: cover;
  background: #d9d9d9;
  height: 3.2rem;
  width: 3.2rem;
  vertical-align: middle;
  margin-right: 1rem;
  margin: 0.5rem 0.75rem 0.5rem 0.5rem;
  border-radius: 50%;
}
.profile-dropdown span {
  display: inline-block;
  vertical-align: sub;
  width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
  /* text-align: right; */
}
.profile-dropdown ul {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  border-radius: 3px;
}
.profile-dropdown ul li a {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}
.profile-dropdown ul li a i {
  font-size: 1.3rem;
  vertical-align: middle;
  margin: 0 0.75rem 0 -0.25rem;
}

.profile-dropdown ul li:first-child a:hover {
  border-radius: 3px 3px 0 0;
}
.profile-dropdown ul li:last-child a:hover {
  border-radius: 0 0 3px 3px;
}
.profile-dropdown > label {
  position: relative;
  height: 3.5rem;
  display: block;
  text-decoration: none;
  background: transparent;
  color: #333;
  box-sizing: border-box;
  padding: 0.9rem;
  float: right;
  border-radius: 0 3px 3px 0;
}
.profile-dropdown > label i {
  color: #b2b2b2;
  font-size: 1.75rem;
}
.profile-dropdown:after {
  content: "";
  display: table;
  clear: both;
}
body {
  background: #2c3e50;
  font-family: Lato;
}
h1 {
  text-align: center;
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  margin: 2rem 0 0;
  letter-spacing: 0.5rem;
}
.container {
  width: 80%;
  margin: 4rem auto 2rem;
}
.container .half {
  width: 50%;
  float: left;
  margin-bottom: 2rem;
}
.container:after {
  content: "";
  display: table;
  clear: both;
}
p.subtitle {
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0 2rem;
  letter-spacing: 0.1rem;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.25;
  z-index: -1;
  background: url(https://ar1web-com.googlecode.com/svn/Bg/bg63.gif);
}
.navbar-list {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1b1b1b;
  z-index: 20000;
}
</style>

