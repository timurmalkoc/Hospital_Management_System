import Navbar from './components/Navbar'
import Login from './components/Login';
import { Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';

function App(props) {





  return (
    <>
    <Navbar/>

      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>

    <Footer/>
    </>
  );
}

export default App;
