import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";  
import { auth } from '../modules/firebase'; // importere auth fra firebase.js
import { ref, computed } from 'vue'; // importere ref og computed fra vue
import router from "@/router";

export const useUsers = () => {
    const user = ref(null); // ref til at opdatere en variabel i html'en
    const email = ref('');
    const password = ref('');

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value); // forsøger at logge ind med email og password
        } 
        catch (error) {
            console.log(error.message);
        }
    }

    const logout = async () => {    
        try {
            await signOut(auth); // forsøger at logge brugeren ud
            router.push('/'); // router.push sender brugeren tilbage til forsiden ved logout
        }
        catch (error) {
            console.log(error.message);
        }
    }

    onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser; // opdaterer user.value med den nuværende bruger
    });

    // Computed property for at vise delen af e-mailen før '@'
    const displayName = computed(() => {
        if (user.value && user.value.email) {
            return user.value.email.split('@')[0]; // Returnerer den del før '@'
        }
        return ''; // Hvis ingen bruger er logget ind
    });

    return {
        user,
        login,
        logout,
        email,
        password,
        displayName // Tilføj displayName til return-objektet
    };
};
