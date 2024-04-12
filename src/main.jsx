import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
      <App />
      <ToastContainer/>
    </RecoilRoot>
    
  
)
