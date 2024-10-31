<template>
  <div class="container py-5 justify-center">
    <h1>Portfolio Admin</h1>
    <div class="about">
      <!-- Add New Portfolio Item -->
      <input
        type="text"
        v-model="newItemTitle"
        placeholder="Add a new Item Title"
      />
      <input
        type="text"
        v-model="newItemDescription"
        placeholder="Add a new Item Description"
      />

      <!-- Upload File Input -->
      <!-- Upload Multiple Files Input -->
      <input type="file" @change="handleFileUpload" multiple />
      <input type="text" v-model="newItemLink" placeholder="Add a Link" />
      <input
        type="text"
        v-model="newItemCategory"
        placeholder="Add a Category"
      />
      <button class="btn2" @click="addNewItem">Add Item</button>
    </div>
  </div>

  <div class="main py-3">
    <div class="project-card-grid py-4">
      <div v-for="item in items" :key="item.id" class="project-card">
        <div class="card">
          <div class="card-image">
            <img
              :src="item.images[0]"
              alt="Portfolio Image"
              v-if="item.images && item.images.length"
            />
            <span v-else>Image not available</span>
          </div>

          <div class="card-content content-evenly">
            <h3 class="font-bold">{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <a :href="item.link" target="_blank" v-if="item.link">Visit Link</a>
          </div>
        </div>

        <div class="btn-grid button-wrapper py-4">
          <button class="btn2" @click="startEditItem(item)">Edit</button>
          <button class="btn2" @click="deleteItem(item.id)">Delete</button>
        </div>

        <div class="about">
          <!-- Edit Form for Selected Item -->
          <template v-if="editingItem && editingItem.id === item.id">
            <input
              type="text"
              v-model="editingItem.title"
              placeholder="Edit Title"
            />
            <input
              type="text"
              v-model="editingItem.description"
              placeholder="Edit Description"
            />
            <input
              type="text"
              v-model="editingItem.link"
              placeholder="Edit Link"
            />
            <input
              type="text"
              v-model="editingItem.category"
              placeholder="Edit category"
            />
            <!-- Knapperne bliver kun vist, når et item redigeres -->
            <div
              class="btn-grid"
              v-if="editingItem && editingItem.id === item.id"
            >
              <button class="btn2" @click="saveItem">Save</button>
              <button class="btn2" @click="cancelEdit">Cancel</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/modules/firebase";
import { useItems } from "@/modules/useItems";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const { items, deleteItem, editingItem, startEditItem, saveItem } =
      useItems();

    const newItemTitle = ref("");
    const newItemDescription = ref("");
    const newItemLink = ref("");
    const newItemImages = ref([]); // Gemmer flere billedfiler
    const newItemCategory = ref("");

    // Håndterer upload af flere filer
    const handleFileUpload = (event) => {
      newItemImages.value = Array.from(event.target.files); // Gemmer alle valgte filer
    };

    // Tilføjer nyt item med flere billeder
    const addNewItem = async () => {
      if (!newItemImages.value.length) {
        alert("Please select one or more image files to upload.");
        return;
      }

      try {
        // Upload hver fil og gem URL'erne i Firestore som et array
        const imageUrls = await Promise.all(
          newItemImages.value.map(async (file) => {
            const fileRef = storageRef(storage, `portfolio/${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            return await getDownloadURL(snapshot.ref);
          })
        );

        // Gemmer itemet i Firestore
        await addDoc(collection(db, "portfolio"), {
          title: newItemTitle.value,
          description: newItemDescription.value,
          images: imageUrls, // Gemmer billed-URL'erne som et array
          link: newItemLink.value || "",
          category: newItemCategory.value || "",
        });

        // Nulstil inputfelterne
        newItemTitle.value = "";
        newItemDescription.value = "";
        newItemLink.value = "";
        newItemImages.value = [];
        newItemCategory.value = "";
      } catch (error) {
        console.error(
          "Error uploading files or adding item to Firestore:",
          error
        );
      }
    };

    const cancelEdit = () => {
      editingItem.value = null;
    };

    return {
      items,
      newItemTitle,
      newItemDescription,
      newItemLink,
      newItemImages, // Returnerer newItemImages her
      newItemCategory,
      handleFileUpload,
      addNewItem,
      deleteItem,
      editingItem,
      startEditItem,
      saveItem,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.project-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .project-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.btn-grid {
  display: flex;
  justify-content: space-evenly;
}

.project-card {
  margin-bottom: 20px;
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
  object-fit: scale-down;
}

.card-content {
  padding: 20px;
  text-align: center;
}

input[type="text"],
input[type="description"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="description"]:focus {
  border-color: #007bff;
  outline: none;
}
</style>
