<template>
  <div class="main py-3">
    <div class="project-card-grid py-4">
      <div v-for="item in items" :key="item.id" class="project-card">
        <div class="card shadow-green-sm">
          <div class="card-image">
            <img :src="item.image" alt="Portfolio Image" v-if="item.image" />
            <span v-else>Image not available</span>
          </div>
          <div class="card-content">
            <h3 class="font-bold">{{ item.title }}</h3>
            <p>{{ truncateText(item.description, 80) }}</p>
          </div>
        </div>
        <div class="button-wrapper"> <!-- Wrapper for the button -->
  <button class="btn2" @click="navigateToDetail(item.id)">
    View Project
  </button>
</div>

      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/modules/firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export default {
  setup() {
    const items = ref([]);
    const router = useRouter();

    onMounted(() => {
      const itemsCollection = collection(db, 'portfolio');
      onSnapshot(itemsCollection, (snapshot) => {
        items.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      });
    });

    const navigateToDetail = (id) => {
  // Naviger til PortfolioDetailView med ID som parameter
  router.push({ name: 'portfolioDetailView', params: { id } });
};


    const truncateText = (text) => {
  const screenWidth = window.innerWidth;

  let length;
  if (screenWidth > 768) {
    length = 80; // Standard længde
  } else if (screenWidth > 480) {
    length = 50; // Kortere længde for mindre skærme
  } else {
    length = 30; // Endnu kortere for de mindste skærme
  }

  return text.length > length ? text.substring(0, length) + '...' : text;
};


    return {
      items,
      navigateToDetail,
      truncateText
    };
  }
};
</script>


<style scoped>
.button-wrapper {
  display: flex;               /* Use flexbox for centering */
  justify-content: center;     /* Center the button */
  width: 100%;                /* Ensure it takes full width of card */
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
    grid-template-columns: repeat(2, 1fr); /* 2 kort pr. række på mindre skærme */
  }
}

.project-card {
  margin-bottom: 20px;
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
  background-color: #CCD5C6;
  color: white;
}

  </style>
  


