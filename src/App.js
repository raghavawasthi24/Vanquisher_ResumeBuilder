import { useEffect } from 'react';
import { ResumeProvider } from './Context';
import './App.css';
import Header from './components/Layouts/Header';
import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { Route,Routes } from 'react-router-dom';
import SelectTemplate from './components/SelectTemplate';
import WebFont from 'webfontloader';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Pacifico', 'Poppins']
      }
    });
  }, []);

  return (
    <>
      <ResumeProvider>
        {/* <Navbar /> */}
        {/* <Header /> */}
        <Routes>
         <Route path="/" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="/selectTemplate" element={<SelectTemplate/>}/>
        </Routes>
        
        
        {/* <Footer /> */}
      </ResumeProvider>
    </>
  );
}

export default App;
