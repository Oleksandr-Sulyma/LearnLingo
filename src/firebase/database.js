import { db } from "./config";
import { 
  collection, 
  getDocs, 
  query, 
  limit, 
  startAfter, 
  orderBy, 
  where 
} from "firebase/firestore";

export const fetchAllTeachersForFilters = async () => {
  const teachersRef = collection(db, "teachers");
  const snapshot = await getDocs(teachersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchTeachers = async (lastDoc = null, filters = {}) => {
  const { language, price } = filters; 
  const teachersRef = collection(db, "teachers");

  let q = query(teachersRef, orderBy("name"));

  if (language) {
    q = query(q, where("languages", "array-contains", language));
  }

  if (price) {
    q = query(q, where("price_per_hour", "<=", Number(price)));
  }

  q = query(q, limit(4));
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { data, lastVisible };
};