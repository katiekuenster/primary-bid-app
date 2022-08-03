import React, { FC, useState, useContext } from 'react';
import LoginService from '../services/LoginService';
import { IonTitle, IonButton } from '@ionic/react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { IonItem, IonInput, IonLabel } from "@ionic/react";

interface LoginProps { }

const Login: FC<LoginProps> = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = async () => {
    LoginService.postLogin().then((resp) => {
      localStorage.setItem("token", resp.token);
      setIsAuthenticated(true);
    });
  }

  const loginInput = (label: string, onChange: ((arg0: string) => void), type?: "password" | undefined,) => {
    return (
      <IonItem id={`input-${label.toLowerCase()}`}>
        <IonLabel position="floating">
          {label}
        </IonLabel>
        <IonInput type={type} onIonChange={e => onChange(e.detail.value!)} />
      </IonItem>
    );
  }

  return (
    <AppContext.Consumer>
      {
        ({ isAuthenticated }) => {
          if (isAuthenticated) {
            return (
              <Navigate to="/" replace />
            )
          }
          return (<div className="login-page">
            <IonTitle>Log in</IonTitle>
            <div className="login-inputs">
              {loginInput("Username", setUsername)}
              {loginInput("Password", setPassword, "password")}
            </div>
            <IonButton disabled={!(username && password)} onClick={login}>Login</IonButton>
          </div>)
        }
      }
    </AppContext.Consumer>
  )
};

export default Login;
