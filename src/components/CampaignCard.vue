<template>
  <article class="card">
    <div class="card-int">
      <span class="card__span">{{ date }}</span>
      <div class="img">
        <img :src="image" alt="image campagne" class="w-100" />
      </div>
      <div class="card-data">
        <p class="title">{{ title }}</p>
        <p>{{ location }}</p>
        <button class="button" @click="$router.push({ name: 'detailCampagne-patiente', params: { id: campagneId } })">Plus d'informations</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "CampaignCard",
  props: {
    image: String,
    title: String,
    date: String,
    location: String,
    campagneId: Number,
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}

.card {
  width: 300px;
  padding: 10px;
  background-image: linear-gradient(to right bottom, #5d0391, #7b05ae, #9b05cb, #bd00e7, #bd00e7);
  background-size: 200% 200%;
  border-radius: 15px 0px 15px 0px;
}

.card-int {
  position: relative;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  border-radius: 6px;
  background-color: white;
}

.img {
  width: 100%;
  height: 175px;
  background-color: pink;
}

.title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.card-data {
  padding: 20px;
  font-size: 14px;
}

.card__span {
  font-family: 'Lucida Sans' sans-serif;
  font-size: 11px;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 15px;
}

button {
  width: 100%;
  margin-top: 15px;
  background-image: linear-gradient(to right bottom, #5d0391, #7b05ae, #9b05cb, #bd00e7, #bd00e7);
  background-size: 200% 200%;
  border: none;
  padding: 8px 10px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  transition: transform 0.1s ease-in;
}

button:active {
  transform: translateY(3px);
}

.card:hover, button:hover {
  animation: gradient 0.8s ease-in 1;
}

@keyframes gradient {
  0% {
    background-position: 200% 200%;
  }

  100% {
    background-position: 400% 400%;
  }
}
</style>
