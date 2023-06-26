import { useState, createContext } from "react";
import { get, post } from "../services/authService";
import axios from "axios";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [product, setProduct] = useState([]);
    const [allUsers, setAllUsers] = useState([])


    const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
        setMessage('')
      }, 1000)
    }


      return (
        <LoadingContext.Provider value={{ allUsers, setAllUsers, product, setProduct, setUser, user, setIsLoading, setMessage, setTimedMessage }}>
          {children}
        </LoadingContext.Provider>
      );


}

export { LoadingContext, LoadingProvider }
