<template>
  <Header />
  <Menu />
  <Footer />
</template>

<script>
import { mapGetters } from "vuex";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Menu from "../components/Menu.vue";

export default {
  name: "Profil",
  components: {
    Header,
    Footer,
    Menu,
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
};
</script>
