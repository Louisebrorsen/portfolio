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
      <input type="file" @change="handleFileUpload" />
      <input type="text" v-model="newItemLink" placeholder="Add a Link" />
      <button class="btn2" @click="addNewItem">Add Item</button>
    </div>
  </div>

  <div class="main py-3">
    <div class="project-card-grid py-4">
      <div v-for="item in items" :key="item.id" class="project-card">
        <div class="card">
          <div class="card-image">
            <img :src="item.image" alt="Portfolio Image" v-if="item.image" />
            <span v-else>Image not available</span>
          </div>
          <div class="card-content content-evenly">
            <h3 class="font-bold">{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>

        <div class="btn-grid button-wrapper">
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
import { db, storage } from "@/modules/firebase"; // Import Firestore and Storage
import { useItems } from "@/modules/useItems"; // Import the custom useItems hook
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

export default {
  setup() {
    // Use custom useItems hook to manage portfolio items
    const { items, deleteItem, editingItem, startEditItem, saveItem } =
      useItems();

    // New item inputs
    const newItemTitle = ref("");
    const newItemDescription = ref("");
    const newItemLink = ref("");
    const newItemImage = ref(null);

    // Handle file upload and store it in Firebase Storage
    const handleFileUpload = (event) => {
      newItemImage.value = event.target.files[0];
    };

    // Add a new item to Firestore and upload image to Firebase Storage
    const addNewItem = async () => {
      if (!newItemImage.value) {
        alert("Please select an image file to upload.");
        return;
      }

      try {
        // Upload image to Firebase Storage
        const fileRef = storageRef(
          storage,
          `portfolio/${newItemImage.value.name}`
        );
        const snapshot = await uploadBytes(fileRef, newItemImage.value);
        const imageUrl = await getDownloadURL(snapshot.ref);

        // Add new item to Firestore
        await addDoc(collection(db, "portfolio"), {
          title: newItemTitle.value,
          description: newItemDescription.value,
          image: imageUrl,
          link: newItemLink.value || "",
        });

        // Clear input fields
        newItemTitle.value = "";
        newItemDescription.value = "";
        newItemLink.value = "";
        newItemImage.value = null;
      } catch (error) {
        console.error(
          "Error uploading file or adding item to Firestore:",
          error
        );
      }
    };

    // Cancel editing mode
    const cancelEdit = () => {
      editingItem.value = null; // Clear the editing item
    };

    return {
      items,
      newItemTitle,
      newItemDescription,
      newItemLink,
      newItemImage,
      handleFileUpload,
      addNewItem,
      deleteItem,
      editingItem,
      startEditItem, // Use startEditItem from useItems
      saveItem, // Use saveItem from useItems
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.button-wrapper {
  display: flex;               /* Use flexbox for centering */
  justify-content: center;     /* Center the button */
  width: 100%;                /* Ensure it takes full width of card */
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.project-card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 cards per row */
  gap: 20px;
}

@media (max-width: 768px) {
  .project-card-grid {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 cards per row on smaller screens */
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
  -o-object-fit: cover;
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
