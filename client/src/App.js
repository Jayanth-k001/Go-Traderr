import { Routes,Route, } from 'react-router-dom';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Home } from './components/home';
import { Display } from './components/display';
import {BuyStock} from './components/buy';
import { Transhis } from './components/history';
import { Portfolio } from './components/portfolio';
import { Sell } from './components/sell';

function App() {
  return (
    <>
    <Routes>
       <Route path='/' element={<Login/>}></Route>
       <Route path='/register' element={<Signup/>}></Route>
       <Route path='/home' element={<Home/>}></Route>
       <Route path='/display' element={<Display/>}></Route>
       <Route path='/buy' element={<BuyStock/>}></Route>
       <Route path='/transhis' element={<Transhis/>}></Route>
       <Route path='/dash' element={<Portfolio/>}></Route>
       <Route path='/sell' element={<Sell/>}></Route>
    </Routes>
    </>
  )
}

export default App;
