
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA0BjRKF7mdYrKM-TmjSsa35-v7KxanRsU",
  authDomain: "newfirebase-1fe01.firebaseapp.com",
  projectId: "newfirebase-1fe01",
  storageBucket: "newfirebase-1fe01.appspot.com",
  messagingSenderId: "766991251511",
  appId: "1:766991251511:web:de846f163e0a886315a7b2",
  measurementId: "G-1QC3TFRYJS"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Tạo tham chiếu đến dịch vụ lưu trữ
// Được sử dụng để tham chiếu trong toàn bộ ứng dụng
const storage = getStorage(app);
export default storage;