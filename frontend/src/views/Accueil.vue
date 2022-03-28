<template>
  <Header />
  <div class="container">
    <form @submit.prevent="handleCreateFeed">
      <div class="write">
        <textarea name id cols="100" rows="5" v-model="text"></textarea>
        <div class="controlls">
          <div class="upload-btn-wrapper">
            <button class="btn">
              <i class="fa-solid fa-image"></i>
            </button>
            <input
              type="file"
              name="myfile"
              accept="image/*"
              @change="selectFile($event)"
            />
          </div>
          <input type="submit" class="send-button" value="Send" />
        </div>
        <div v-if="url">
          <img :src="url" alt width="100" height="100" />
        </div>
      </div>
    </form>
    <div class="feeds">
      <div class="feed-container" v-for="(item, index) in feeds" :key="index">
        <div class="single-feed">
          <div class="feed-meta">
            <img
              :src="`http://localhost:5000/api/uploads/${item.addedBy[0].imageAvatar}`"
              width="50"
              height="50"
            />
            <div class="feed-meta-user-info">
              <h5>{{ item.addedBy[0].name }}</h5>
              <p>{{ formateDate(item.addedAt) }}</p>
            </div>
          </div>
          <div class="feed-body">
            <p>{{ item.Text }}</p>
            <img
              :src="`http://localhost:5000/api/uploads/${item.image}`"
              alt="hello"
              width="500"
            />
            <div class="feed-status">
              <div class="feed-likes">
                <i class="fa-solid fa-thumbs-up"></i>
                {{ item.like }}
              </div>

              <div class="feed-comments">
                <i class="fa-regular fa-message"></i>
                {{ item.comments.length }}
              </div>
            </div>
            <div class="border">
              <div class="feed-buttons">
                <button type="button" @click="handleLikePost(item._id)">
                  <i class="fa-regular fa-thumbs-up"></i> Like
                </button>
                <button @click="handleCommentClick(item._id)">
                  <i class="fa-regular fa-message"></i> Comment
                </button>
              </div>
            </div>
            <div
              class="comments-container"
              v-if="showCommentForm == true && item._id == commentOf"
            >
              <div
                class="comments"
                v-for="(comment, index) in item.comments"
                :key="index"
              >
                <div class="comment">
                  <img
                    :src="`http://localhost:5000/api/uploads/${comment.commentBy.imageAvatar}`"
                  />
                  <div class="comment-user-info">
                    <h5>{{ comment.commentBy.name }}</h5>
                    <p>{{ comment.Comment }}</p>
                  </div>
                </div>
              </div>

              <div class="comment-filed">
                <input type="text" v-model="comment" />
                <button @click="handleAddComment(item._id)">
                  <i class="fa-regular fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Connexion",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      text: "",
      file: "",
      url: null,
      feeds: [],
      comment: "",
      showCommentForm: false,
      commentOf: "",
    };
  },
  computed: {
    ...mapGetters(["getLoggedUser", "getFeeds"]),
  },
  mounted() {
    this.getAllFeeds().then((res) => {
      console.log(res);
      this.feeds = res.data;
    });
  },
  methods: {
    ...mapActions(["CreateFeed", "getAllFeeds", "likeFeed", "addComment"]),
    selectFile(e) {
      console.log(e.target.files[0]);
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    formateDate(date) {
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const d = new Date(date);
      let monthName = month[d.getMonth()];
      let datee = d.getDate();
      let year = d.getFullYear();

      return `${datee} ${monthName}, ${year}`;
    },
    handleCreateFeed() {
      this.CreateFeed({
        text: this.text,
        file: this.file,
        id: this.getLoggedUser._id,
      });
    },
    handleLikePost(id) {
      this.likeFeed(id).then((res) => {
        this.feeds.map((feed) => {
          if (feed._id == id) {
            feed.like = feed.like + 1;
          }
        });
      });
    },
    handleAddComment(id) {
      this.addComment({
        id,
        Comment: this.comment,
        commentBy: this.getLoggedUser._id,
      }).then((res) => {
        console.log(res.data);
      });
    },
    handleCommentClick(id) {
      this.commentOf = id;
      this.showCommentForm = true;
    },
  },
};
</script>
<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
.write {
  margin: 10px 0px;
  position: relative;
}
.write textarea {
  width: 100%;
}

.controlls {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  outline: none;
  border: 0px;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 15px;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.send-button {
  color: #111;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
  padding: 10px 14px;
  border: 0px;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
}

.feed {
  width: 80%;
  background-color: #ffff;
  padding: 10px 12px;
  text-align: left;
}
.feed-meta {
  display: flex;
  align-items: center;
  /* height: 50px; */
}
.feed-meta img {
  border-radius: 50%;
}
.feed-meta-user-info {
  margin-left: 20px;
  text-align: left;
}
.feed-meta-user-info h5 {
  padding: 0px;
  margin: 0px;
  font-size: 14px;
}
.feed-meta-user-info p {
  padding: 0px;
  margin: 0px;
  font-size: 11px;
  opacity: 0.9;
}
.feed-container {
  width: 80%;
  margin: 0 auto;
}
.feed-body img {
  margin-top: 14px;
  width: 100%;
  height: 400px;
}
.feed-body p {
  text-align: left;
}
.single-feed {
  margin-bottom: 20px;
}
.border {
  margin-top: 15px;
  border-bottom: 1px solid #333;
  border-top: 1px solid #333;
}
.feed-buttons {
  margin: 14px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.feed-buttons button {
  border: none;
  background: none;
  font-weight: bold;
}
.feed-likes {
  color: blue;
  text-align: left;
  margin: 10px 0px;
}
.comments-container {
  background-color: #eee;
}
.comment-filed {
  width: 100%;
  margin: 0 auto;
  height: 60px;
  /* background-color: #eee; */
  border-radius: 10px;
  position: relative;
}
.comment-filed input {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #333;
}
.comment-filed input:active {
  border: 1px solid #333;
}
.comment-filed button {
  position: absolute;
  top: 0;
  right: 0px;
  height: 44px;
  background: none;
  width: 50px;
  font-size: 20px;
  border: none;
}
.comments {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
}
.comment {
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  text-align: left;
  background-color: #fff;
  width: auto;
  border-radius: 9px;
}
.comment img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #eeee;
}
.comment-user-info h5 {
  padding: 0;
  margin: 0;
}
.comment-user-info p {
  padding: 0;
  margin: 0;
}
.feed-status {
  display: flex;
  align-items: center;
}
.feed-comments {
  margin-left: 10px;
}
</style>
