import React, { useState, useEffect } from 'react';
import './App.css';
import '@ionic/react/css/core.css';
import { setupIonicReact, IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import CategoryList from './pages/CategoryList';
import ProductList from './pages/ProductList';
import { AppContext } from './context/AppContext';
import { cartOutline } from 'ionicons/icons';

function App() {
  setupIonicReact();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const value = { isAuthenticated, setIsAuthenticated, cart, setCart };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <div>
      <AppContext.Provider value={value}>
        <IonHeader>
          <IonToolbar>
            <IonTitle slot="start">Sample App</IonTitle>
            <IonItem lines="none">
              <IonIcon slot="end" icon={cartOutline} />
              <IonLabel slot="end">
                Total: {cart.length}
              </IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <div className="app">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<CategoryList />} />
              <Route path="/:category" element={<ProductList />} />
            </Routes>
          </Router>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
