// PortfolioDetailView.vue
<template>
  <div>
    <!-- Vis detaljer om porteføljepunktet her -->
    <h1>{{ project.title }}</h1>
    <img :src="project.image" alt="Project Image" />
    <p>{{ project.description }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/modules/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default {
  setup() {
    const project = ref({});
    const route = useRoute();
    const projectId = route.params.id;

    onMounted(async () => {
      const projectDoc = await getDoc(doc(db, 'portfolio', projectId));
      if (projectDoc.exists()) {
        project.value = projectDoc.data();
      } else {
        console.error('No such document!');
      }
    });

    return { project };
  }
};
</script>


<style scoped>
.detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.detail-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%; /* Juster bredden som ønskes */
  max-width: 600px; /* Sæt en maksimal bredde */
  overflow: hidden;
}

.detail-image {
  display: flex;
  justify-content: center;
  height: 300px;
  overflow: hidden;
}

.detail-image img {
  width: auto;
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.detail-content {
  padding: 20px;
  text-align: center;
}
</style>
