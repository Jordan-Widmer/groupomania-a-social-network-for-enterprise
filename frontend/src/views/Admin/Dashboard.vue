<template>
  <body>
    <Header />
    <div class="container">
      <h1>Dashboard</h1>
      <div class="row">
        <div class="col-8">
          <h5 style="color: lightgrey">Most Active Users</h5>
          <div class="card-contaienr">
            <div class="card" v-for="(user, index) in activeUsers" :key="index">
              <div class="card-header">
                <img
                  class="card-image"
                  :src="`http://localhost:5000/api/uploads/${user.img}`"
                  alt="user-image"
                />
                <h4>{{ user.name }}</h4>
              </div>
              <div class="card-posts">
                <h3>Total Posts</h3>
                <h3>{{ user.totalPosts }}</h3>
              </div>
              <div class="card-date">
                <h5>{{ user.lastpost }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <h5 style="color: lightgrey">Recent Posts</h5>
          <div class="recent-post-card-container">
            <ul class="recent-post-list">
              <li
                class="recent-post-list-item"
                v-for="(post, index) in recentPosts"
                :key="index"
              >
                <img
                  :src="`http://localhost:5000/api/uploads/${post.img}`"
                  class="card-image"
                  alt="user logo"
                />
                <div class="post-info">
                  <h3>{{ post.name }}</h3>
                  <p class="post-title">{{ post.text }}</p>
                  <p>{{ post.date }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-8">
          <h5 style="color: lightgrey">Registered Users</h5>
          <table>
            <thead>
              <tr>
                <th scope="col">Email Address</th>
                <th scope="col">Name</th>
                <th scope="col">Total Posts</th>
                <th scope="col">Last Post</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in registeredUsers" :key="index">
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.totalPosts }}</td>
                <td>{{ user.lastpost }}</td>
                <td>
                  <button @click="deleteUser(user.id)" class="delete-user">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </body>
</template>
<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";

export default {
  name: "Dashboard",
  components: { Header, Footer },
  data() {
    return {
      activeUsers: [],
      recentPosts: [],
      registeredUsers: [],
    };
  },
  mounted() {
    let URL1 = "http://localhost:5000/api/user/activeuserstats";
    let URL2 = "http://localhost:5000/api/user/mostrecentPosts";
    let URL3 = "http://localhost:5000/api/user/registeredusers";

    const activeUsers = axios.get(URL1);
    const recentPosts = axios.get(URL2);
    const registeredUsers = axios.get(URL3);

    Promise.all([activeUsers, recentPosts, registeredUsers]).then((values) => {
      //   console.log(values);
      this.activeUsers = values[0].data;
      this.recentPosts = values[1].data;
      this.registeredUsers = values[2].data;
      console.log(this.registeredUsers);
    });
  },
  computed: {},

  methods: {
    deleteUser(id) {
      axios.delete(`http://localhost:5000/api/user/${id}`).then((res) => {
        this.registeredUsers = this.registeredUsers.filter((f) => f.id !== id);
        this.recentPosts = this.recentPosts.filter((f) => f.id !== id);
        this.activeUsers = this.activeUsers.filter((f) => f.id !== id);
      });
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  text-align: left;
  background-color: #111;
}
.row {
  display: flex;
}
.col-8 {
  width: 70%;
}
.col-4 {
  width: 30%;
  margin-left: 10px;
}
.card-contaienr {
  display: flex;
  margin-left: 20px;
}
.card {
  width: 30%;
  cursor: pointer;
  min-height: 100px;
  padding: 10px 15px;
  border-radius: 15px;
  background: #1b1b1b;
  font-family: "Poppins", sans-serif;
  border: 1px solid lightgray;
  color: lightgrey;
  transition: all 0.3s ease;
}
.card:hover {
  border: #ff9000 1px solid;
}
.card:not(:last-child) {
  margin-right: 10px;
}
.card-header {
  display: flex;
  align-items: center;
}
.card-image {
  width: 30px;
  height: 30px;
  margin-right: 20px;
  border-radius: 50%;
}
.card-posts {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-date h5 {
  font-size: 16px;
  font-weight: 400;
  margin-top: 0px;
}
.recent-post-card-container {
  width: 90%;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #1b1b1b;
  font-family: "Poppins", sans-serif;
  border: 1px solid lightgrey;
  border-radius: 15px;
}
.recent-post-card-container:hover {
  border: #ff9000 1px solid;
}
.recent-post-list {
  list-style: none;
}
.recent-post-list-item {
  display: flex;
  align-items: center;
}
.recent-post-list-item img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  align-self: flex-start;
  margin-top: 20px;
  margin-right: 10px;
}
.post-info h3 {
  color: lightgrey;
  margin: 0px 0px;
  margin-top: 20px;
}
.post-info p {
  color: #ff9000;
  margin: 2px 0px;
}
.post-title {
  white-space: nowrap;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
}

h1 {
  margin-top: 0;
  margin-left: 30px;
  margin-bottom: 0;
  padding-top: 60px;
  font-size: 36px;
  font-weight: 500;
  color: lightgrey;
  font-family: "Poppins", sans-serif;
}
h3 {
  font-weight: 400;
  color: #ff9000;
}
h4 {
  font-weight: 400;
  font-size: 18.5px;
}
h5 {
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 400;
  color: #ff9000;
  font-family: "Poppins", sans-serif;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  margin-bottom: 90px;
  margin-left: 20px;
  padding: 0;
  width: 96% !important;
  table-layout: fixed;
}

table tr {
  background-color: #1b1b1b;
  color: lightgray;
  border: 1px solid lightgrey;
  padding: 0.35em;
  height: 50px;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
  font-family: "Poppins";
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }
}
.delete-user {
  transition: all 0.3s ease;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
  color: #111;
  font-family: "Poppins", sans-serif;
  outline: none;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.delete-user:hover {
  transform: scale(0.95);
}
</style>