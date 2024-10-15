<template>
  <header
    :class="{
      sticky: !scrolled,
      'top-0': !scrolled,
      'bg-green': !scrolled,
      'shadow-lg': !scrolled,
    }"
    class="transition-all duration-300 ease-in-out"
  >
    <nav
      class="container flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
    >

      <!-- Burger menu button, placed in a separate div -->
      <div class="sm:hidden ml-auto">
        <button @click.stop="toggleBurgerMenu" class="block">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Burger menu -->
      <div v-if="burgerMenuOpen" class="burger-menu flex flex-col items-end">
        <ul>
          <li>
            <router-link
              to="/"
              class="text-m font-semibold leading-6 text-black block"
              >Forside</router-link
            >
          </li>
          <li>
            <router-link
              to="/portfolio"
              class="text-m font-semibold leading-6 text-black block"
              >Portfolio</router-link
            >
          </li>
          <li>
            <router-link
              v-if="user"
              to="/portfolioAdminView"
              class="text-m font-semibold leading-6 text-black"
              >Portfolio admin</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Regular menu (visible on larger screens) -->
      <div class="hidden sm:flex flex-row gap-4">
        <router-link to="/" class="text-m font-semibold leading-6 text-black"
          >Forside</router-link
        >
        <router-link
          to="/portfolio"
          class="text-m font-semibold leading-6 text-black"
          >Portfolio</router-link
        >
        <router-link
          v-if="user"
          to="/portfolioAdminView"
          class="text-m font-semibold leading-6 text-black"
        >
          Portfolio admin
        </router-link>
      </div>
      <div>
          <!-- Inputfelter vises kun, hvis brugeren ikke er logget ind -->
          <div v-if="!user">
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button class="btn3" @click="login">Login</button>
          </div>
          <!-- Hvis brugeren er logget ind, vises en logout-knap og en velkomstbesked -->
          <div v-else class="flex flex-col">
            <p>Hej {{ displayName }}</p>
            <button class="btn3" @click="logout">Logout</button>
          </div>
        </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useUsers } from "@/modules/useUsers";

const { user, login, logout, password, email, displayName } = useUsers();
const scrolled = ref(false);
const burgerMenuOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const toggleBurgerMenu = () => {
  burgerMenuOpen.value = !burgerMenuOpen.value;
};

// Listen to scroll events
window.addEventListener("scroll", handleScroll);

// Initially check scroll position
handleScroll();
</script>

<style scoped>
.burger-menu {
  display: flex; /* Brug flexbox for at arrangere elementer */
  flex-direction: column; /* Arranger elementerne lodret */
  text-align: right; /* Juster teksten til højre */
  position: absolute; /* Sørg for, at menuen kan placeres korrekt */
  right: 0; /* Juster til højre */
  top: 100%; /* Placer menuen under knappen */
  background-color: #ccd5c6; /* Giv baggrund for bedre synlighed */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Tilføj skygge for dybde */
  z-index: 10; /* Sørg for, at menuen er over andre elementer */
}
ul, menu {
    list-style: none;
    margin: 6px;
    padding: 0px;
}

li {
  padding: 10px 0; /* Tilføj lidt polstring til hver listeelement */
  border-bottom: 1px solid #000; /* Tilføj en sort grænse i bunden */
}

li:last-child {
  border-bottom: none; /* Fjern bunden grænse på det sidste element */
}


.sticky {
  position: sticky;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}

h1 {
  text-shadow: 2px 2px 4px #000000;
  /* Juster værdierne efter ønske */
}

/* From Uiverse.io by danilppzz */
input {
  background-color: #ccd5c6;
  border: 0.75px solid #000;
  border-radius: 8px;
  color: #000 !important;
  padding: 14px 24px;
  text-decoration: none;
  font-size: 10px;
  margin: 12px 14px;
  cursor: pointer;
}
</style>
