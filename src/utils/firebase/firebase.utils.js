import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect,
   signInWithPopup, 
   GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

//firestore
import {getFirestore,
doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBALvUcUYJ--GRTfkdWqD3o_uc6asV7LsY",
    authDomain: "e-commerce-1-2c2df.firebaseapp.com",
    projectId: "e-commerce-1-2c2df",
    storageBucket: "e-commerce-1-2c2df.appspot.com",
    messagingSenderId: "684625599822",
    appId: "1:684625599822:web:f7876ed13ca281c628d21f"
  };

  const firebaseApp = initializeApp(firebaseConfig);

//--------------------authentication

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup =()=> signInWithPopup(auth, provider);

//access to firestore

export const db = getFirestore();  

//doc is we store user to db

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
   const userDocRef = doc(db, "users", userAuth.uid)

   console.log(userDocRef);

   //userSnapShot gets the doc and allows us the access to data
   const userSnapshot = await getDoc(userDocRef)
   console.log(userSnapshot);
   console.log(userSnapshot.exists());

   if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date(); 

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }catch (error) {
      console.log('error making the user', error.message);
    }
   }

   return userDocRef;
}

export const createAuthUserWithEmailANdPassword =async(email, password)=> {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser =async()=> await signOut(auth);

export const onAuthStateChangedListener =(callback)=> onAuthStateChanged(auth, callback)