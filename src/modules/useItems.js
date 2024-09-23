import { ref, onMounted } from 'vue';
import { db, ItemsCollection, ItemsFirebaseCollectionRef } from './firebase';
import {onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';

export const useItems = () => {
    // step 1: create a new movie title and store it in the newMovieTitle variable
    const newItemTitle = ref('');

    // step 2: create a list of movies and store it in a ref
    const Items = ref([]);


    // step 3: create a function to retrive a new movie to the list of movies
    onMounted(() => {
    onSnapshot(ItemsCollection, (snapshot) => {
      Items.value = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data() // spread operator  
  /* title: doc.data().title /* Dette skal gøres for hvert field der er lavet for doc. */
      }))
    })
    })
  /* Map is like a v-loop */
  
  // step 4: create a function to add a new movie to the list of movies
  // () skal være blankt, da vi ikke skal have nogen parametre med
  // hvis den skulle slette vil den skulle igennem en parameter som er id
  // trim vil fjerne overflødige mellemrum
  const addItem = async () => {
    if(newItemTitle.value.trim() ==='') return; //check if input is empty, return (stop function)
    
    await addDoc (ItemsCollection, {
      title: newItemTitle.value
    })
    newItemTitle.value = ''; // clear input field 
  }
  
  // step 5: create a function to delete a movie from the list of movies
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, ItemsFirebaseCollectionRef, id))
  }

    return {
        Items,
        newItemTitle,
        addItem,
        deleteItem
    }




}