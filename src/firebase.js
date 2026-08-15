import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBw_W-PlWx_qZskdXd483Xvg83m_X815Ec',
  authDomain: 'comptoir-81d18.firebaseapp.com',
  projectId: 'comptoir-81d18',
  storageBucket: 'comptoir-81d18.firebasestorage.app',
  messagingSenderId: '365687115414',
  appId: '1:365687115414:web:020d011005b4e137a03cb7',
  measurementId: 'G-46LHW1JR4J'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = isSupported().then(ok => ok ? getAnalytics(app) : null)
export default app
