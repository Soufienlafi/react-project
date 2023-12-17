import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../../fireConfig';
import { useNavigate } from 'react-router-dom';

const ElementsArticleCard = (props) => {
  const { cartCount, cartDetails, addItem } = useShoppingCart();
  const navigate = useNavigate();
  const addToCart = (product) => {
    const target = {
      id: product.id,
      title: product.designation,
      image: product.imageartpetitf,
      price: product.prixVente,
      qtestock: product.qtestock,
      quantity: 1,
    };


    if (auth.currentUser) {
      addItem(target);
      console.log('Item added to cart:', target);
    } else {
      navigate('./loginClient');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const goUpButton = document.querySelector('.go-up-button');
    const cartContainer = document.querySelector('.cart-container');

    if (goUpButton) {
      if (window.scrollY > 200) {
        goUpButton.style.display = 'block';
      } else {
        goUpButton.style.display = 'none';
      }
    }

    if (cartContainer) {
      const sidebar = document.querySelector('.sidebar');
      const sidebarRect = sidebar.getBoundingClientRect();

      if (window.scrollY > sidebarRect.top) {
        cartContainer.style.position = 'fixed';
        cartContainer.style.top = '0';
      } else {
        cartContainer.style.position = 'static';
      }
    }
  };

  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleMouseOver = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseOut = () => {
    setHoveredProductId(null);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Button variant="primary">
                  <Link to="/cart" className="nav-link">
                    <ShoppingCartIcon fontSize="large" style={{ color: 'white' }} />
                    <span className="ml-1" style={{ color: 'white' }}>{cartCount} Items</span>
                  </Link>
                </Button>
              </li>
              {cartCount > 0 && (
                <li className="nav-item">
                  <div className="nav-link cart-container">
                    {Object.values(cartDetails).map((item) => (
                      <div key={item.id} className="d-flex align-items-center mb-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-thumbnail mr-2"
                          style={{ width: '50px', height: '50px' }}
                        />
                        <div>
                          <strong>{item.title}</strong>
                          <br />
                          {item.quantity} x {item.price} TND
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="row justify-content-center">
            {props.articles &&
              props.articles.map((product) => (
                <article
                  key={product.id}
                  className="col-sm-4 mb-4"
                  onMouseOver={() => handleMouseOver(product.id)}
                  onMouseOut={handleMouseOut}
                >
                  <div className="card">
                    <img
                      src={hoveredProductId === product.id ? product.image2 : product.imageartpetitf}
                      className="card-img-top p-5"
                      alt={product.designation}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <div>{product.designation.substr(0, 20)} ...</div>
                    <div>Prix : {product.prixVente} TND </div>
                  </div>
                  <div className="text-center mt-3">
                    <button
                      disabled={product.qtestock <= 1}
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </main>
      </div>
      <div className="go-up-button">
        <Button variant="primary" onClick={scrollToTop}>
          Go Up
        </Button>
      </div>
    </div>
  );
};

export default ElementsArticleCard;
