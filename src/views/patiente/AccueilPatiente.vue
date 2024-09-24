<template>
<Layout>
      <!-- Appointment Section -->
      <section class="appointment">
        <h2>Prochain rendez-vous</h2>
        <div class="appointment-cards">
          <AppointmentCard 
            v-for="appointment in appointments" 
            :key="appointment.id" 
            :date="appointment.date" 
            :time="appointment.time" 
          />
        </div>
      </section>

      <!-- Campaigns Section -->
      <section class="campaigns">
        <h2>Campagne <a href="#">Voir tous</a></h2>
        <div class="campaign-cards">
          <CampaignCard 
            v-for="campaign in campaigns" 
            :key="campaign.id" 
            :image="campaign.image" 
            :title="campaign.title" 
            :date="campaign.date" 
            :location="campaign.location" 
          />
        </div>
      </section>

      <!-- Advice Section -->
      <section class="advice">
        <h2>Conseil <a href="#">Voir tous</a></h2>
        <div class="advice-videos">
          <AdviceVideo 
            v-for="video in adviceVideos" 
            :key="video.id" 
            :image="video.image" 
          />
        </div>
      </section>
    </Layout>
</template>

<script>
import Sidebar from '/src/components/layouts/Sidebar.vue';
import Header from '/src/components/layouts/Header.vue';
import AppointmentCard from '/src/components/AppointmentCard.vue';
import CampaignCard from '/src/components/CampaignCard.vue';
import AdviceVideo from '/src/components/AdviceVideo.vue';
import Layout from '@/components/layouts/Layout.vue';

export default {
  components: {
    Sidebar,
    Header,
    AppointmentCard,
    CampaignCard,
    AdviceVideo,
    Layout,
  },
  data() {
    return {
      appointments: [
        { id: 1, date: '25 janvier 2032', time: '08 h 30' },
        { id: 2, date: '25 janvier 2032', time: '08 h 30' }
      ],
      campaigns: [
        { id: 1, image: '/assets/images/campaign-image.jpg', title: 'Santé mère enfant', date: '28 juin 2024', location: 'Devant la mairie' },
        { id: 1, image: '/assets/images/campaign-image.jpg', title: 'Santé mère enfant', date: '28 juin 2024', location: 'Devant la mairie' },
        { id: 1, image: '/assets/images/campaign-image.jpg', title: 'Santé mère enfant', date: '28 juin 2024', location: 'Devant la mairie' },
       
      ],
      adviceVideos: [
        { id: 1, image: '/assets/images/advice-image1.jpg' },
        { id: 2, image: '/assets/images/advice-image2.jpg' }
      ]
    };
  }
};
</script>

<style>
/* Add your CSS here, similar to the style provided earlier */
</style>
