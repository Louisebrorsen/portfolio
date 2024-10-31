<template>
  <div class="container">
    <div v-if="project" class="grid">
      <div class="left-column">
        <h1 class="text-4xl font-bold text-center py-6 text-green">{{ project.title }}</h1>
        <div class="description">
          <p>{{ project.description }}</p>
        </div>
        <div v-if="project.link" class="button-container">
          <button class="btn" @click="goToLink(project.link)">
            Gå til
          </button>
        </div>
        <div v-if="project.pdfURL" class="button-container">
          <a :href="project.pdfURL" target="_blank" class="btn">
            Se PDF
          </a>
        </div>
        <router-link to="/portfolio" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
            <path fill="black" fill-rule="evenodd" d="m2.87 7.75l1.97 1.97a.75.75 0 1 1-1.06 1.06L.53 7.53L0 7l.53-.53l3.25-3.25a.75.75 0 0 1 1.06 1.06L2.87 6.25h9.88a3.25 3.25 0 0 1 0 6.5h-2a.75.75 0 0 1 0-1.5h2a1.75 1.75 0 1 0 0-3.5z" clip-rule="evenodd" />
          </svg>
          <span class="back-text">Tilbage</span>
        </router-link>
      </div>
      <div class="right-column">
        <div class="slider-container flex flex-col items-center">
          <div class="slider relative w-[600px] h-[400px] mx-auto overflow-hidden">
            <template v-for="(image, index) in project.images" :key="index">
              <transition name="fade">
                <img
                  :src="image"
                  :alt="'Image ' + (index + 1)"
                  class="w-full h-full object-contain"
                  v-if="index === currentSliderIndex"
                />
              </transition>
            </template>
          </div>

          <!-- Knapperne under slideren, kun vises hvis der er mere end ét billede -->
          <div v-if="project.images && project.images.length > 1" class="button-row flex justify-center mt-4 space-x-4">
            <button class="slider-button" @click="prevSlide">‹</button>
            <button class="slider-button" @click="nextSlide">›</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-lg text-center">Porteføljepunktet blev ikke fundet.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/modules/firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  setup() {
    const project = ref({});
    const route = useRoute();
    const projectId = route.params.id;

    // State til billedslideren
    const currentSliderIndex = ref(0);

    const nextSlide = () => {
      currentSliderIndex.value =
        (currentSliderIndex.value + 1) % project.value.images.length;
    };

    const prevSlide = () => {
      currentSliderIndex.value =
        (currentSliderIndex.value - 1 + project.value.images.length) %
        project.value.images.length;
    };

    onMounted(async () => {
      const projectDoc = await getDoc(doc(db, "portfolio", projectId));
      if (projectDoc.exists()) {
        project.value = {
          ...projectDoc.data(),
          images: projectDoc.data().images || [], // Sikre at images er en tom array, hvis den ikke findes
        };
      } else {
        console.error("No such document!");
      }
    });

    const goToLink = (link) => {
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    };

    return { project, goToLink, currentSliderIndex, nextSlide, prevSlide };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  box-sizing: content-box;
  margin-top: -60px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}

.right-column {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.slider-container {
  width: 100%;
  max-width: 100%;
}

.slider {
  width: 100%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 3 / 2;
  overflow: hidden;
}

.slider img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.slider-button {
  font-size: 2rem;
  color: black;
  cursor: pointer;
  background-color: #ccd5c6;
  padding: 10px;
  border-radius: 6px;
  border: none;
  outline: none;
  z-index: 1;
}

.slider-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* Skaler knapperne og tekststørrelserne ned på mindre skærme */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 1.5rem;
  }

  .slider-button {
    font-size: 1.5rem;
    padding: 8px;
  }
}

</style>
