// import { useState, createContext } from "react";
// import { get, post } from "../services/authService";
// import axios from "axios";

// const LoadingContext = createContext();

// const LoadingProvider = ({ children }) => {

//     const [isLoading, setIsLoading] = useState(false);
//     const [user, setUser] = useState(null);
//     const [message, setMessage] = useState('');
//     const [sample, setSample] = useState([]);
//     const [pack, setPack] = useState([])
//     const [allUsers, setAllUsers] = useState([])


//     const setTimedMessage = (newMessage) => {
//       setMessage(newMessage);
//       setTimeout(() => {
//         setMessage('')
//       }, 1000)
//     }


//       return (
//         <LoadingContext.Provider value={{ allUsers, setAllUsers, pack, setPack, sample, setSample, setUser, user, setIsLoading, setMessage, setTimedMessage }}>
//           {children}
//         </LoadingContext.Provider>
//       );


// }

// export { LoadingContext, LoadingProvider }
