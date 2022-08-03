import React, { FC, useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { IonButton, IonCard, IonItem, IonTitle, IonText, IonIcon, IonGrid, IonRow, IonCol, IonThumbnail } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { Link, useParams } from "react-router-dom";
import Product from '../types/Product';

interface ProductListProps { }

const ProductList: FC<ProductListProps> = () => {

    const { category } = useParams();

    const [products, setProducts] = useState<Product[]>();
    const { cart, setCart } = useContext(AppContext);

    useEffect(() => {
        if (category) {
            ProductService.getProductsByCategory(category).then((resp) => {
                const productResponse: Product[] = resp as Product[];
                setProducts(productResponse);
            });
        }
    }, []);

    const isItemInCart = (itemId: number) => {
        return cart.includes(itemId);
    }

    const addItem = (itemId: number) => {
        setCart([...cart, itemId]);
    }

    const removeItem = (itemId: number) => {
        let tempCart = [...cart];
        const index = tempCart.indexOf(itemId);
        if (index !== -1) {
            tempCart.splice(index, 1);
            setCart(tempCart);
        }
    }

    const backButton = () => {
        return (
            <Link
                to={{ pathname: "/" }}
                style={{ textDecoration: 'none' }}
            >
                <IonButton className="back-button" color="light">
                    <IonIcon slot="start" icon={arrowBackOutline} />
                    Back to Categories
                </IonButton>
            </Link>
        );
    }

    const productCard = (product: Product) => {
        return (
            <IonCard className="product-card">
                <IonItem lines="none">
                    <IonThumbnail slot="start">
                        <img className="product-thumbnail" src={product.image} />
                    </IonThumbnail>
                    <IonText>{product.title}</IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonButton slot="start" disabled={!isItemInCart(product.id)} color="danger" onClick={() => removeItem(product.id)}>
                        Remove from cart
                    </IonButton>
                    <IonButton slot="end" onClick={() => addItem(product.id)}>
                        Add to cart
                    </IonButton>
                </IonItem>
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
                                {backButton()}
                                <IonTitle className="page-title">
                                    {category?.toUpperCase()} Product List
                                </IonTitle>
                                <IonGrid>
                                    <IonRow>
                                        {products && products.map((product, index) => (
                                            <IonCol size="6" key={index}>
                                                {productCard(product)}
                                            </IonCol>
                                        ))}
                                    </IonRow>
                                </IonGrid>
                            </div>)
                    }
                    return <Navigate to="/login" replace />
                }
            }
        </AppContext.Consumer>
    )
};

export default ProductList;
