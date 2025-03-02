import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebase/firebaseInit';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
// 
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
console.log(user);
// 

const createUser = (email, pass)=>{
    return createUserWithEmailAndPassword(auth, email, pass)
}
// 
const loginUser= (email, pass)=>{
    return signInWithEmailAndPassword(auth, email, pass)
}
// 
const googleLoginIn = ()=>{
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider)
}
// 
const logOut =()=>{
    return signOut(auth);
}

// 
useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
        if(currentUser){
          setUser(currentUser);
          setLoading(false);
        }
        else{
            setUser('');
            setLoading(false)
        }
    })
   
    return ()=>unSubscribe();

},[])


// 
const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLoginIn,
    logOut,
}

  // 
  return (
     <AuthContext.Provider value={authInfo}>
          {children}
     </AuthContext.Provider>
  )
}

export default AuthProvider