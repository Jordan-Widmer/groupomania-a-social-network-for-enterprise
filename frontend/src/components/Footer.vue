<template>
  <body>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>Compagnie</h4>
            <ul>
              <li><a href="#">à propos</a></li>
              <li><a href="#">nos services</a></li>
              <li><a href="#">confidentialité</a></li>
              <li><a href="#">programme d'affiliation</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>obtenir de l'aide</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">expédition</a></li>
              <li><a href="#">retour</a></li>
              <li><a href="#">commande</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Place du marché</h4>
            <ul>
              <li><a href="#">ordinateur</a></li>
              <li><a href="#">composant</a></li>
              <li><a href="#">périphérique</a></li>
              <li><a href="#">réseau</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Suivez-nous</h4>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
.container {
  max-width: 1170px;
  margin: auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
body {
  line-height: 1.5;
  font-family: "Poppins", sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
.footer {
  background-color: #1b1b1b;
  padding: 70px 0;
}
.footer-col {
  width: 25%;
  padding: 0 15px;
  margin-bottom: 10px;
}
.footer-col h4 {
  font-size: 18px;
  color: #e2e2e2;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
}
.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}
.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: lightgrey;
  display: block;
  transition: all 0.3s ease;
}
.footer-col ul li a:hover {
  color: #ff9000;
  padding-left: 8px;
}
.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}
.footer-col .social-links a:hover {
  color: #24262b;
  background: linear-gradient(-135deg, #ff9000, #c46f00);
}
.ukraine-help {
  color: lightgrey;
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: lightgrey;
  transition: all 0.3s ease;
}

.ukraine-help:hover {
  color: #ff9000;
  padding-left: 8px;
}
/*responsive*/
@media (max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}
@media (max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}
</style>

