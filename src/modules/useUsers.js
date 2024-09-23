import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";  
//onAuthStateChanged er en funktion der lytter til om der er en bruger logget ind eller ej
//signInWithEmailAndPassword er en funktion der logger en bruger ind med email og password

import {auth} from '../modules/firebase'; //importere auth fra firebase.js
import {ref} from 'vue'; //importere ref fra vue
import router from "@/router";

export const useUsers = () => {
    const user = ref(null); //ref er en funktion der kan bruges til at opdatere en variabel i html'en
    const email = ref('');
    const password = ref('');

    const login = async() => {
        try {
        await signInWithEmailAndPassword(auth, email.value, password.value); //prøver at logge ind med email og password
        } 
        catch (error) {
            console.log(error.message);
        }
    }

    //async gør at funktionen ikke skal vente på at en anden funktion er færdig, men kan hente data fra en anden funktion samtidigt

    const logout = async () => {    
        try{
            await signOut(auth); //prøver at logge brugeren ud
            router.push('/'); //router.push sender brugeren tilbage til forsiden ved logout
        }
        catch (error){
            console.log(error.message);
        }
        
    }

    onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser; //opdaterer user.value med den nuværende bruger
    
    })

    return{user, login, logout, email, password}
}



