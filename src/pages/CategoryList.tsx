import React, { FC, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { IonCard, IonItem, IonTitle, IonLabel, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { Link } from "react-router-dom";

interface CategoryListProps { }

const CategoryList: FC<CategoryListProps> = () => {

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    ProductService.getCategories().then((resp) => {
      setCategories(resp);
    });
  }, []);

  const categoryCard = (category: string) => {
    return (
      <IonCard>
        <Link to={{ pathname: `/${category}` }} style={{ textDecoration: 'none' }}>
          <IonItem lines="none">
            <IonLabel>{category.toUpperCase()}</IonLabel>
            <IonIcon slot="end" icon={arrowForwardOutline} />
          </IonItem>
        </Link>
      </IonCard>
    );
  }

  return (
    <AppContext.Consumer>
      {
        ({ isAuthenticated }) => {
          if (isAuthenticated) {
            return (
              <div>
                <IonTitle className="page-title">
                  Product Categories
                </IonTitle>
                {categories &&
                  categories
                    .map((category, index) => (
                      <div key={index}>
                        {categoryCard(category)}
                      </div>
                    ))}
              </div>)
          }
          return <Navigate to="/login" replace />
        }
      }
    </AppContext.Consumer>
  )
};

export default CategoryList;
