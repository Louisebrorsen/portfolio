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

  <div>
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
        <div
          class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          <!-- PDF, som fylder 1/3 på større skærme, men 100% på små -->
          <div class="col-span-1 flex py-6 justify-center">
            <embed
              :src="pdfURL"
              type="application/pdf"
              width="100%"
              height="500px"
            />
          </div>
          <!-- Video, som fylder 2/3 på større skærme, men 100% på små -->
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

    <section class="bg-white">
      <div class="container py-6">
        <h2 class="text-4xl font-bold text-center py-8">Mine kompetencer</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card-s bg-gray-200 shadow-md rounded-lg overflow-hidden">
            <div class="card-s__content p-6">
              <p class="card-s__title font-bold text-xl mb-2">Mine skills</p>
              <p class="card-s__description">
                Bevæg musen over og se hvilke apps jeg har erfaring med at
                benytte.
              </p>
            </div>

            <img
              v-if="image3"
              :src="image3"
              alt="Billede 3"
              class="rounded img"
            />
          </div>
          <div class="card-s bg-gray-200 shadow-md rounded-lg overflow-hidden">
            <div class="card-s__content p-6">
              <p class="card-s__title font-bold text-xl mb-2">
                5 ord omkring mig
              </p>
              <p class="card-s__description">
                Bevæg musen over for at se hvilke 5 keywords der vil beskrive
                mig
              </p>
            </div>
            <img
              v-if="image2"
              :src="image2"
              alt="Billede 2"
              class="rounded img"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Sørg for at importere ref og onMounted
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useCompetencies } from "../modules/useCompetencies"; // Importer din useCompetencies fil
import { Icon } from "@iconify/vue";
const pdfURL =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-louisebrorsen-39afb.appspot.com/o/Home%2Fcv%20-%20Louise%20Brorsen.pdf?alt=media&token=4ba90066-7dbc-4559-8ba2-8e62ede423b5";

// Storage reference
const storage = getStorage();

// Fetch competencies from Firestore
const { items } = useCompetencies(); // Brug items fra din useCompetencies.js

const image1 = ref("");
const image2 = ref("");
const image3 = ref("");

// Firebase Storage setup

const loadImages = async () => {
  try {
    const image1URL = await getDownloadURL(
      storageRef(
        storage,
        "https://firebasestorage.googleapis.com/v0/b/portfolio-louisebrorsen-39afb.appspot.com/o/Home%2Fmig.jpg?alt=media&token=bf8c00fa-fcbc-47f3-a296-4c1389fd529b"
      )
    );
    const image2URL = await getDownloadURL(
      storageRef(
        storage,
        "https://firebasestorage.googleapis.com/v0/b/portfolio-louisebrorsen-39afb.appspot.com/o/Home%2Fkeywords.png?alt=media&token=d05d6879-e253-47a1-b4a0-f33fbf919abc"
      )
    );
    const image3URL = await getDownloadURL(
      storageRef(
        storage,
        "https://firebasestorage.googleapis.com/v0/b/portfolio-louisebrorsen-39afb.appspot.com/o/Home%2Fskils.png?alt=media&token=0c61bccc-10d4-4d2f-989a-73a708e034a1"
      )
    );

    image1.value = image1URL;
    image2.value = image2URL;
    image3.value = image3URL;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

onMounted(() => {
  loadImages(); // Henter billederne når komponenten er mounted
});

function openCV() {
  const pdfURL =
    "https://firebasestorage.googleapis.com/v0/b/portfolio-louisebrorsen-39afb.appspot.com/o/Home%2Fforside%2Fcv%20-%20Louise%20Brorsen.pdf?alt=media&token=e54606c9-f7fb-4729-ac3a-c21370be76d0"; // URL til dit CV
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

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 350px; /* Juster højden efter behov */
}

.card img {
  max-width: 200px; /* Juster størrelsen efter behov */
  max-height: 100px;
}

.card2 img {
  max-width: 100px; /* Juster størrelsen efter behov */
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

.card-s {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 200px;
  background-color: #ccd5c6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 0 0 5px #ffffff80;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-s:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card-s__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #ccd5c6;
  transform: rotateX(0deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-s__title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.card-s__description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}

.card-s img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: rotateX(-90deg);
}

.card-s:hover img {
  transform: rotateX(0deg);
}
</style>
