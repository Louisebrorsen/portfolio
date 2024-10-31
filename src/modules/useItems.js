import { ref } from "vue";
import { db } from "@/modules/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export function useItems() {
  const items = ref([]);
  const editingItem = ref(null);

  const loadItems = async () => {
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    items.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };


  const startEditItem = (item) => {
    editingItem.value = { ...item }; // Clone the item for editing
  };

  const saveItem = async () => {
    if (editingItem.value) {
      const itemRef = doc(db, "portfolio", editingItem.value.id);

      // Update the Firestore document with title, description, and link
      await updateDoc(itemRef, {
        title: editingItem.value.title,
        description: editingItem.value.description,
        link: editingItem.value.link, // Include the link field here
        category: editingItem.value.category,
      });

      // Update the local item list
      const index = items.value.findIndex((item) => item.id === editingItem.value.id);
      if (index !== -1) {
        items.value[index] = { ...editingItem.value };
      }

      // Clear editing mode
      editingItem.value = null;
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "portfolio", id));
    items.value = items.value.filter((item) => item.id !== id);
  };

  // Load items on setup
  loadItems();

  return {
    items,
    editingItem,
    startEditItem,
    saveItem,
    deleteItem,
  };
}