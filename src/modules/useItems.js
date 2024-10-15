import { ref, onMounted } from 'vue';
import { db } from './firebase'; // Ensure 'db' is imported correctly
import { onSnapshot, addDoc, doc, deleteDoc, updateDoc, collection } from 'firebase/firestore'; // Ensure 'updateDoc' is imported

export const useItems = () => {
  const items = ref([]);
  const newItemTitle = ref('');
  const editingItem = ref(null); // To track the item being edited

  // Fetch the items from Firestore on mount
  onMounted(() => {
    const itemsCollection = collection(db, 'portfolio'); // Reference to your Firestore collection
    onSnapshot(itemsCollection, (snapshot) => {
      items.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  });

  // Add a new item
  const addItem = async () => {
    if (newItemTitle.value.trim() === '') return;
    await addDoc(collection(db, 'portfolio'), {
      title: newItemTitle.value
    });
    newItemTitle.value = '';
  };

  // Delete an item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'portfolio', id));
  };

  // Start editing an item
  const startEditItem = (item) => {
    editingItem.value = { ...item }; // Make a copy of the item to edit
  };

  // Save the edited item
  const saveItem = async () => {
    if (editingItem.value) {
      const itemDoc = doc(db, 'portfolio', editingItem.value.id);
      await updateDoc(itemDoc, {
        title: editingItem.value.title, // Update the title
        description: editingItem.value.description // Add description if needed
      });
      editingItem.value = null; // Clear the editing item after saving
    }
  };

  return {
    items,
    newItemTitle,
    editingItem, // Expose editingItem for editing state
    addItem,
    deleteItem,
    startEditItem,
    saveItem // Expose saveItem to save edited item
  };
};
