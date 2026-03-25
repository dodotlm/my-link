import { db } from "./firebase";
import { 
  doc, getDoc, setDoc, updateDoc, collection, addDoc, 
  deleteDoc, getDocs, query, orderBy, where, serverTimestamp 
} from "firebase/firestore";
import { User } from "firebase/auth";

export interface LinkItem {
  id: string;
  url: string;
  title: string;
  createdAt: any;
  clicks: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  bio: string;
  nickname: string;
  photoURL?: string;
}

export const createUserDocument = async (user: User) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    const email = user.email || "";
    const defaultNickname = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    
    await setDoc(userRef, {
      uid: user.uid,
      email,
      displayName: user.displayName || "User",
      bio: "Hello! This is my MyLink page.",
      nickname: defaultNickname, // Used for /nickname URL
      photoURL: user.photoURL || "",
      createdAt: serverTimestamp(),
    });
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    return snapshot.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
};

export const getUserByNickname = async (nickname: string): Promise<UserProfile | null> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].data() as UserProfile;
  }
  return null;
};

// Links Sub-collection CRUD
export const getUserLinks = async (uid: string): Promise<LinkItem[]> => {
  const linksRef = collection(db, "users", uid, "links");
  const q = query(linksRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LinkItem));
};

export const addLink = async (uid: string, url: string, title: string) => {
  const linksRef = collection(db, "users", uid, "links");
  await addDoc(linksRef, {
    url,
    title,
    clicks: 0,
    createdAt: serverTimestamp(),
  });
};

export const updateLink = async (uid: string, linkId: string, data: Partial<LinkItem>) => {
  const linkRef = doc(db, "users", uid, "links", linkId);
  await updateDoc(linkRef, data);
};

export const deleteLink = async (uid: string, linkId: string) => {
  const linkRef = doc(db, "users", uid, "links", linkId);
  await deleteDoc(linkRef);
};
