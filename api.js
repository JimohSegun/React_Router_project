import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"


const firebaseConfig = {
  apiKey: "AIzaSyCS0Mw8nq5to_J1UQfn1XY7h7O0FZSNaIU",
  authDomain: "vans-cb5ee.firebaseapp.com",
  projectId: "vans-cb5ee",
  storageBucket: "vans-cb5ee.appspot.com",
  messagingSenderId: "193395461566",
  appId: "1:193395461566:web:d45663e2fa8165109d3def",
  measurementId: "G-REYV6K3S1T"
};




// const firebaseConfig = {
//     apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
//     authDomain: "vanlife-a1af5.firebaseapp.com",
//     projectId: "vanlife-a1af5",
//     storageBucket: "vanlife-a1af5.appspot.com",
//     messagingSenderId: "803007000356",
//     appId: "1:803007000356:web:446cd3a1ca406839258db1"
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}