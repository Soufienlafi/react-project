import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'use-shopping-cart';
import Menu from './components/Menu';
import ListCards from './components/ClientSide/ListCards';
import LoginClient from './components/authentificationClient/loginClient';
import ListArticles from './components/ListeArticle';
import AjoutArticle from './components/AjoutArticle';
import Client from './components/Client';
import ListrClient from './components/ListrClient';
import EditArticle from './components/EditArticle';
import Cart from './components/ClientSide/Cart';
import Signup from './components/authentificationClient/Signup';
import PaymentPage from './components/ClientSide/PaymentPage';

function App() {

  return (
    <>


        <CartProvider>
          <Router>
            <Menu />
            <Routes>
              <Route path="/" element={<ListCards />} />
              <Route path="/loginclient" element={<LoginClient />} />
              <Route path="/articles" element={<ListArticles />} />
              <Route path="/AjoutArticle" element={<AjoutArticle />} />
              <Route path="/Client" element={<Client />} />
              <Route path="/ListrClient" element={<ListrClient />} />
              <Route path="/EditArticle/:id" element={<EditArticle />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </Router>
        </CartProvider>

    </>
  );
}

export default App;