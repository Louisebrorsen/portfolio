<template>
  <!-- Kategori-filteret -->
  <div class="container">
    <div class="radio-inputs py-5">
      <div v-for="category in categories" :key="category" class="radio">
        <input
          type="radio"
          :value="category"
          v-model="selectedCategory"
          :id="category"
        />
        <label :for="category" class="name">{{ category }}</label>
      </div>
    </div>
  </div>

  <!-- Grid til filtrerede items -->
  <div class="main py-3">
    <div class="project-card-grid py-4">
      <div v-for="item in filteredItems" :key="item.id" class="project-card">
        <div class="card shadow-green-sm">
          <div class="card-image">
            <img
              :src="item.images[0]"
              alt="Portfolio Image"
              v-if="item.images && item.images.length"
            />
            <span v-else>Image not available</span>
          </div>
          <div class="card-content">
            <h3 class="font-bold">{{ item.title }}</h3>
            <p>{{ truncateText(item.description, 80) }}</p>
          </div>
        </div>
        <div class="button-wrapper">
          <button class="btn2" @click="navigateToDetail(item.id)">
            View Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/modules/firebase";
import { onSnapshot, collection } from "firebase/firestore";

export default {
  setup() {
    const items = ref([]);
    const categories = ref(["All", "Grafik", "Case"]); // Definer dine kategorier her
    const selectedCategory = ref("All"); // Holder styr på den valgte kategori
    const router = useRouter();

    onMounted(() => {
      const itemsCollection = collection(db, "portfolio");
      onSnapshot(itemsCollection, (snapshot) => {
        items.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    });

    const navigateToDetail = (id) => {
      router.push({ name: "portfolioDetailView", params: { id } });
    };

    const truncateText = (text) => {
      const screenWidth = window.innerWidth;
      let length = screenWidth > 768 ? 80 : screenWidth > 480 ? 50 : 30;
      return text.length > length ? text.substring(0, length) + "..." : text;
    };

    // Computed property til at filtrere items baseret på den valgte kategori
    const filteredItems = computed(() => {
      if (selectedCategory.value === "All") return items.value;
      return items.value.filter(
        (item) => item.category === selectedCategory.value
      );
    });

    return {
      items,
      categories,
      selectedCategory,
      filteredItems,
      navigateToDetail,
      truncateText,
    };
  },
};
</script>

<style scoped>
.button-wrapper {
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center the button */
  width: 100%; /* Ensure it takes full width of card */
}

.btn2 {
  margin-top: 10px; /* Give a little space above the button */
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.project-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 kort pr. række */
  gap: 20px; /* Afstand mellem kortene */
}

@media (max-width: 768px) {
  .project-card-grid {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 kort pr. række på mindre skærme */
  }
}

.project-card {
  margin-bottom: 20px;
}
/* From Uiverse.io by Yaya12085 */
.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #eee;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 300px;
  font-size: 14px;
  margin-top: 30px;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0;
  color: #ccd5c6;
  transition: all 0.15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: #fff;
  font-weight: 600;
}

.btn2 {
  margin-top: 10px; /* Give a little space above the button */
  align-self: center; /* Center the button */
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 325px;
}

.card-image {
  display: flex;
  justify-content: center;
  height: 200px;
  width: auto;
  overflow: hidden;
}

.card-image img {
  width: auto;
  max-width: 240px;
  max-height: 200px;
  min-height: 100px;
  -o-object-fit: cover;
  object-fit: scale-down;
}

.card-content {
  padding: 20px;
  text-align: center;
}

.active {
  background-color: #ccd5c6;
  color: white;
}
.container {
  display: flex;
  justify-content: center; /* Centrerer filteret horisontalt */
  align-items: center; /* Centrerer filteret vertikalt, hvis behøvet */
  width: 100%;
}
</style>
