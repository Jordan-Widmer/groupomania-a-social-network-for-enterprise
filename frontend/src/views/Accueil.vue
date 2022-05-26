<template>
  <body>
    <Header />
    <div class="container">
      <form
        @submit.prevent="handleCreateFeed"
        style="display: flex; justify-content: center"
      >
        <div class="write" style="cursor: pointer">
          <textarea
            name
            id
            cols="100"
            rows="5"
            v-model="text"
            placeholder="Write your post"
          ></textarea>
          <div class="controlls">
            <div class="upload-btn-wrapper">
              <button class="btn">
                <i class="fa-solid fa-paperclip"></i>
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
          <div class="image-preview" v-if="url">
            <img :src="url" alt width="100" height="100" />
          </div>
        </div>
      </form>
      <div class="feeds">
        <div class="feed-container" v-for="(item, index) in feeds" :key="index">
          <div class="single-feed">
            <div class="feed-meta">
              <img
                class="image-profile"
                v-if="item.addedBy"
                :src="`http://localhost:5000/api/uploads/${item.img}`"
                width="50"
                height="50"
              />
              <div class="feed-meta-user-info">
                <h5 v-if="item.addedBy">{{ item.name }}</h5>
                <div
                  v-if="isMyPost(item.addedBy, getLoggedUser.id) == true || getLoggedUser.isAdmin == 1"
                  class="comment-controlls"
                >
                  <a to="#" @click="handleOnEditPost(item.id)">Edit</a>
                  <a to="#" @click="handleDeleteFeed(item.id, comment.id)"
                    >Delete</a
                  >
                </div>
              </div>
            </div>
            <div class="feed-body">
              <p>{{ item.text }}</p>
              <img
                class="feed-images"
                v-if="returnImage(item.image)"
                :src="`http://localhost:5000/api/uploads/${item.image}`"
                alt="hello"
                width="500"
              />
              <div class="feed-status">
                <div class="feed-likes">
                  <i class="fa-solid fa-thumbs-up"></i>
                  {{ item.likes.length > 0 ? item.likes.length : 0 }}
                </div>

                <div class="feed-comments">
                  <i class="fa-regular fa-message"></i>
                  {{ item.comments.length > 0 ? item.comments.length : 0 }}
                </div>
              </div>
              <div class="border">
                <div class="feed-buttons">
                  <button
                    type="button"
                    v-if="isLiked(item, getLoggedUser.id) === false"
                    @click="!handleLikePost(item.id, getLoggedUser.id)"
                  >
                    <i class="fa-regular fa-thumbs-up"></i> Like
                  </button>
                  <button
                    v-else
                    type="button "
                    @click="handleDisLikePost(item.id, getLoggedUser.id)"
                    class="feed-likes"
                  >
                    <i class="fa-solid fa-thumbs-up"></i> Liked
                  </button>

                  <button @click="handleCommentClick(item.id)">
                    <i class="fa-regular fa-message"></i> Comment
                  </button>
                </div>
              </div>
              <div
                class="comments-container"
                v-if="showCommentForm == true && item.id == commentOf"
              >
                <div
                  class="comments"
                  v-for="(comment, index) in item.comments"
                  :key="index"
                >
                  <div class="comment">
                    <div class="sectionComment">
                      <img
                        class="sectionComImg"
                        v-if="comment.img"
                        :src="`http://localhost:5000/api/uploads/${comment.img}`"
                      />
                      <h5 class="sectionComHfive">{{ comment.name }}</h5>
                    </div>
                    <div class="comment-user-info">
                      <p>{{ comment.comment }}</p>
                      <div
                        v-if="
                          isMyComment(comment.userid, getLoggedUser.id) == true
                        "
                        class="comment-controlls"
                      >
                        <a to="#" @click="handleOnEdit(item.id, comment.id)"
                          >Edit</a
                        >
                        <a
                          @click="
                            handleDeleteComment(comment.id, comment.userid)
                          "
                          to="#"
                          >Delete</a
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="comment-filed">
                  <input
                    type="text"
                    v-model="comment"
                    placeholder="Write your comment"
                  />
                  <button @click="handleAddComment(item.id)">
                    <i class="fa-regular fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space"></div>
    <Footer />
  </body>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";

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
      comment: "",
      showCommentForm: false,
      commentOf: "",
      edit: false,
      currentEditComment: {
        postId: "",
        commentId: "",
      },
      editFeed: false,
      currentFeed: {},
    };
  },
  computed: {
    ...mapGetters(["getLoggedUser", "getFeeds"]),
    ...mapState(["feeds"]),
  },
  mounted() {
    this.getAllFeeds();
  },
  methods: {
    ...mapActions([
      "CreateFeed",
      "getAllFeeds",
      "likeFeed",
      "addComment",
      "dislikedFeed",
      "deleteComment",
      "EditComment",
      "EditFeed",
      "deleteFeed",
    ]),

    isMyPost(postaddedBy, userId) {
      if (postaddedBy == userId) {
        return true;
      }
      return false;
    },
    returnImage(image) {
      if (image === '""') {
        return false;
      }
      return true;
    },
    isLiked(post, userid) {
      for (var i = 0; i < post.likes.length; i++) {
        if (post.likes.length > 0) {
          console.log(post.likes[i].user_id);
          if (post.likes[i].user_id == userid) {
            return true;
            break;
          }
        }
      }
      return false;
    }, // console.log(post.likes[0].length); // console.log(post.likes[0].length);
    isMyComment(postid, userid) {
      console.log(postid + " " + userid);
      if (postid == userid) {
        return true;
      }
      return false;
    },
    selectFile(e) {
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
      if (this.editFeed == true) {
        const feed = {};
        feed.text = this.text;
        feed.id = this.currentFeed.id;
        if (this.file) {
          feed.file = this.file;
        }
        this.EditFeed({ ...feed });
        this.editFeed = false;
        this.currentFeed = {};
        this.text = "";
        this.url = null;
        this.file = [];
        return;
      }
      if (this.text != "") {
        this.CreateFeed({
          text: this.text,
          file: this.file,
          id: this.getLoggedUser.id,
        });
        this.text = "";
        this.file = "";
        this.url = "";
      }
    },
    handleOnEdit(postId, commentId) {
      this.edit = true;
      this.currentEditComment.postId = postId;
      this.currentEditComment.commentId = commentId;

      const currentpost = this.feeds.filter((f) => f.id == postId);
      currentpost[0].comments.map((f) => {
        console.log(f);
      });

      const comments = currentpost[0].comments.filter((c) => c.id == commentId);
      console.log(comments);
      this.comment = comments[0].comment;
    },
    handleLikePost(id, likedBy) {
      this.likeFeed({ id, likedBy });
    },
    handleDisLikePost(id, dislikedBy) {
      this.dislikedFeed({ id, dislikedBy });
    },
    handleAddComment(id) {
      if (this.comment !== "") {
        if (this.edit == true) {
          this.EditComment({
            id: this.currentEditComment.commentId,
            comment: this.comment,
          });
          this.edit = false;
          this.comment = "";
          return;
        }
        this.addComment({
          id,
          Comment: this.comment,
          commentBy: this.getLoggedUser.id,
        });
        console.log(this.getLoggedUser);
        this.comment = "";
      }
    },
    handleDeleteComment(id, commentid) {
      this.deleteComment({ id, commentid });
    },
    handleCommentClick(id) {
      this.commentOf = id;
      this.showCommentForm = true;
    },
    handleOnEditPost(feedId) {
      this.currentFeed = this.feeds.filter((f) => f.id == feedId)[0];
      this.editFeed = true;
      this.text = this.currentFeed.text;
      if (this.currentFeed.image !== '""') {
        this.url =
          "http://localhost:5000/api/uploads/" + this.currentFeed.image;
      }
    },
    handleDeleteFeed(feedId) {
      this.deleteFeed({ id: feedId });
    },
  },
};
</script>
<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
body {
  background: #111;
}
.space {
  margin-top: 90px;
}
.write {
  margin: 44px 0px;
  position: relative;
  background: #1b1b1b;
  border-radius: 14px;
  padding: 10px 18px 8px;
  border: solid 1px lightgrey;
}
.write:hover {
  border: 1px solid #2c3c5c;
  background: #212020;
  transition: 0.3s;
}
.write textarea {
  width: calc(820px - 18px);
  border: 2px solid #333;
  height: 60px;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 13px;
  outline: none;
}
.controlls {
  display: flex;
  align-content: center;
  justify-content: space-evenly;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  outline: none;
  border: 0px;
  color: lightgrey;
  background: linear-gradient(-135deg, #142644, #2c3c5c);
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
  cursor: pointer;
  color: lightgrey;
  background: linear-gradient(-135deg, #142644, #2c3c5c);
  border: 0px;
  width: 55px;
  height: 33px;
  font-weight: 500;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
}

.feed {
  width: 100%;
  background-color: #ffff;
  padding: 10px 12px;
  text-align: left;
  background-color: #e8f1f3;
}
.feed-meta {
  display: flex;
  align-items: center;
  /* height: 50px; */
}
.feed-meta img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.feed-meta-user-info {
  margin-left: 20px;
  text-align: left;
}
.feed-meta-user-info h5 {
  padding: 0px;
  text-transform: capitalize;
  margin: 0px;
  margin-bottom: 2px;
  color: lightgrey;
  font-size: 16px;
  font-weight: 400;
  font-family: "Poppins";
}
.comment-user-info h5 {
  padding: 0;
  margin: 0;
}
.feed-meta-user-info p {
  padding: 0px;
  margin: 0px;
  color: lightgrey;
  font-family: "Poppins";
  font-size: 12px;
}
.feed-container {
  width: 700px;
  border: 1px solid lightgray;
  margin: 0 auto;
  margin-bottom: 16px;
  background: #1b1b1b;
  border-radius: 14px;
}
.feed-container:hover {
  transition: 0.3s;
  border: 1px solid #2c3c5c;
  background: #212020;
  cursor: pointer;
}
.feed-body {
  margin: 0px 6px;
}
.feed-body img {
  max-height: 500px;
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}
.feed-body p {
  text-align: left;
  color: lightgrey;
  font-family: "Poppins";
  margin-bottom: 8px;
  margin-top: 24px;
  /* text-align: center; */
  word-wrap: break-word;
}
.single-feed {
  margin-bottom: 20px;
  padding: 10px 20px 10px;
}
.border {
  margin-top: 15px;
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
  color: lightgrey;
  font-family: "Poppins";
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.3s ease;
}
.feed-buttons button:hover {
  /* color: #111; */
  background: linear-gradient(-135deg, #142644, #2c3c5c);
}
.feed-likes {
  color: lightgrey;
  text-align: left;
  /* margin: 10px 0px; */
}
.comments-container {
  border-radius: 13px;
  padding: 0px 10px;
}
.fa-message,
.fa-thumbs-up {
  margin-right: 8px;
}
.comment-filed {
  width: 100%;
  margin: 0 auto;
  height: 60px;
  border-radius: 10px;
  position: relative;
  margin-top: 10px;
}
.sectionComment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sectionComImg {
  margin-right: 18px;
}
.sectionComHfive {
  text-transform: capitalize;
  color: lightgrey;
  font-size: 15px;
  font-weight: 400;
  font-family: "Poppins";
}
.comment-filed input {
  width: 100%;
  height: 40px;
  font-size: 16px;
  outline: none;
  padding-left: 10px;
  border-radius: 10px;
  border: 1px solid #333;
  box-sizing: border-box;
  padding-right: 45px;
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
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px lightgrey solid;
}
.comment {
  padding: 5px 10px;
  align-items: center;
  /* background-color: #1b1b1b; */
  width: 100%;
  border-radius: 9px;
}
.comment img {
  width: 50px;
  object-fit: cover;
  height: 50px;
  margin-bottom: 4px;
  border-radius: 50%;
}
.comment-user-info {
  width: 100%;
}
.comment-user-info p {
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  word-wrap: break-word;
  text-align: center;
}
.feed-status {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 24px;
}
.feed-comments {
  margin-left: 10px;
  color: lightgrey;
}
.image-preview img {
  width: 200px;
  height: 200px;
  margin-top: 20px;
  object-fit: cover;
  border-radius: 50%;
}
@media (max-width: 920px) {
  .feed-container {
    width: 100%;
  }
  .write textarea {
    width: calc(100% - 18px);
  }
}
@media (max-width: 570px) {
  .feed-images {
    width: 100%;
    height: 200px !important;
  }
  .image-profile {
    width: 45px;
    height: 45px;
  }
}
.post-controlls a,
.comment-controlls a {
  text-decoration: none;
  margin-right: 10px;
  font-size: 13px;
  font-family: "Poppins";
  color: lightgrey;
  cursor: pointer;
  transition: all 0.3s ease;
}
.post-controlls a,
.comment-controlls a:hover {
  color: #111;
  font-weight: 500;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
  padding: 0px 8px;
  border-radius: 3px;
}
</style>