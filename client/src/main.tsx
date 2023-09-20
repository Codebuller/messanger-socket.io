import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './components/AppRoutes';
import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <div className='container'>
    <AppRoutes/> 
    </div>
  </Router>
 
 
)
