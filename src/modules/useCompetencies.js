import { ref, onMounted } from 'vue';
import { db } from './firebase'; // Sørg for at importere db korrekt
import { onSnapshot, collection } from 'firebase/firestore'; // Sørg for at importere onSnapshot

export const useCompetencies = () => {
    const items = ref([]);
    
    // Hent elementerne fra Firestore ved mount
    onMounted(() => {
        const itemsCollection = collection(db, 'kompetencer'); // Referer til din Firestore-samling
        onSnapshot(itemsCollection, (snapshot) => {
        items.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        });
    });
    
    return {
        items,
    };
}