<template>
  <Layout>
    <section class="appointment">
      <h2>Conseils</h2>
      <div class="conseil-cards">
        <AdviceVideo
          v-for="video in adviceVideos"
          :key="video.id"
          :image="video.image"
        ></AdviceVideo>
      </div>
    </section>
  </Layout>
</template>

<script>
import AdviceVideo from "@/components/AdviceVideo.vue";
import AppointmentCard from "@/components/AppointmentCard.vue";
import Header from "@/components/layouts/Header.vue";
import Layout from "@/components/layouts/Layout.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";

export default {
  components: {
    Layout,
    AdviceVideo,
  },
  data() {
    return {
      adviceVideos: [
        { id: 1, image: "/assets/images/advice-image1.jpg" },
        { id: 2, image: "/assets/images/advice-image2.jpg" },
        { id: 2, image: "/assets/images/advice-image2.jpg" },
        { id: 2, image: "/assets/images/advice-image2.jpg" },
        { id: 2, image: "/assets/images/advice-image2.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
.conseil-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
