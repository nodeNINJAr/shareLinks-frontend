import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebase/firebaseInit';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
const axiosPublic = useAxiosPublic();
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
    const unSubscribe = onAuthStateChanged(auth, async(currentUser)=>{
        if(currentUser){
          setUser(currentUser);
          setLoading(false);
          try{
            await axiosPublic.post('/auth/login',{uid:currentUser?.uid, email:currentUser?.email});
          }catch(err){
             console.log(err);
          }
        }
        else{
            setUser('');
            setLoading(false);
            try{
              await axiosPublic.post('/auth/logout');
              }catch(err){
                 console.log(err);
              }
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