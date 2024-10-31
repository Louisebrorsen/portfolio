<template>
  <hero>
    <div class="container py-10">
      <h1 class="text-6xl font-bold underline text-center text-green">
        Velkommen
      </h1>
      <h2 class="text-2xl font-bold text-center py-5">
        Jeg er en grafisk designer <br />
        Engageret og Kreativ
      </h2>
      <p class="text-center">
        Jeg hedder
        <span class="underline md:decoration-2 decoration-green"
          >Louise Brorsen</span
        >. Jeg er en dedikeret kreativ designer, med en passion for kvalitet.
        <br />
        Jeg er målrettet for at lave originale elementer, og tilpasse kundernes
        behov.
      </p>
    </div>
    <div class="flex flex-row items-center justify-center py-4 gap-x-6">
      <img v-if="image1" :src="image1" alt="Billede 1" class="rounded img" />
    </div>

    <div class="flex flex-row items-center justify-center py-6 gap-x-6">
      <button class="btn" id="mitcv-btn" @click="openCV">
        Mit CV <Icon icon="material-symbols-light:download-rounded" />
      </button>
    </div>
  </hero>

  <section class="bg-green">
    <div class="container pb-10 py-6">
      <h2 class="text-4xl font-bold text-center py-8">Mine kompetencer</h2>
      <div v-if="items.length === 0" class="text-center">Loading...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          class="card2 flex flex-col items-center"
          v-for="item in items"
          :key="item.id"
        >
          <img
            class="size-52 rounded"
            :src="item.Image"
            alt="Kompetence billede"
          />
          <div class="card-body">
            <h3 class="text-2xl font-bold">{{ item.Title }}</h3>
            <p class="text-center">{{ item.Description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hero class="bg-gray-100 py-20">
    <div class="container py-10">
      <h3 class="text-5xl py-3 font-bold underline text-left text-green">
        En smule mere om mig:
      </h3>

      <h3 class="text-xl font-semibold text-left py-1">
        Jeg hedder Louise Norman Brorsen
      </h3>
      <p>
        Jeg er en passioneret og alsidig Freelance Grafisk Designer med
        erfaring inden for servicebranchen. Med min uddannelse og akademiske
        baggrund er jeg dedikeret til at levere kreative løsninger af høj
        kvalitet. Jeg har en dyb passion for æstetik, detaljer og
        funktionalitet, og jeg nyder at finpudse mit arbejde, så alt spiller
        perfekt.
      </p>
      <h2 class="font-semibold py-1">Mine kompetencer omfatter:</h2>
      <h1 class="font-medium py-1">Grafisk design:</h1>
      <p>
        Jeg mestrer Adobe-programmerne og er dygtig til at skabe visuelle
        identiteter, branding materialer og reklamemateriale, altid med øje
        for kvalitet og kreativitet.
      </p>
      <h1 class="font-medium py-1">Kundepleje:</h1>
      <p>
        Jeg har en stærk evne til at forstå kundens behov og levere
        skræddersyede løsninger, der matcher deres forventninger.
      </p>
      <h1 class="font-medium py-1">Fleksibilitet og produktivitet:</h1>
      <p>
        Jeg er i stand til at tilpasse mig forskellige projektkrav og
        opretholde en høj grad af produktivitet, selv under pressede
        deadlines.
      </p>
    </div>
  </hero>

  <section class="bg-green">
    <div class="container py-6">
      <h2 class="text-4xl font-bold text-center py-8">Mit CV</h2>
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div class="col-span-1 flex py-6 justify-center">
          <embed
            :src="pdfURL"
            type="application/pdf"
            width="100%"
            height="500px"
          />
        </div>
        <div class="col-span-2 flex py-6 justify-center">
          <iframe
            class="pb-4"
            width="100%"
            height="500px"
            src="https://www.youtube.com/embed/Eks1BUKrLKg?si=eBTv_Eeyzrpz_J1C"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useCompetencies } from "../modules/useCompetencies";
import { Icon } from "@iconify/vue";

const pdfURL =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-louisebrorsen-39afb.appspot.com/o/Home%2Fcv%20-%20Louise%20Brorsen.pdf?alt=media&token=4ba90066-7dbc-4559-8ba2-8e62ede423b5";

const storage = getStorage();
const { items } = useCompetencies();

const image1 = ref("");

const loadImages = async () => {
  try {
    const image1URL = await getDownloadURL(
      storageRef(
        storage,
        "https://firebasestorage.googleapis.com/v0/b/portfolio-louisebrorsen-39afb.appspot.com/o/Home%2Fmig.jpg?alt=media&token=bf8c00fa-fcbc-47f3-a296-4c1389fd529b"
      )
    );

    image1.value = image1URL;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

onMounted(() => {
  loadImages();
});

function openCV() {
  window.open(pdfURL);
}
</script>

<style scoped>
.img {
  width: 260px;
  height: auto;
  object-fit: cover;
  border-radius: 2rem;
}

.card2 img {
  max-width: 100px;
  max-height: 100px;
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#mitcv-btn {
  display: flex;
  align-items: center;
}

.pdf-embed {
  width: 100%;
  height: 500px;
}

@media (max-width: 768px) {
  .pdf-embed {
    height: 300px;
  }
}
</style>
