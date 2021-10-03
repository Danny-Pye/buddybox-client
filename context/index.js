// Used to create a global state so json token available on all pages. //

import {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import {useRouter} from "next/router";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [state, setState] = useState({
        user: {},
        token: "",
    });
// useEffect runs when loaded or refreshed. It will look in local storage for the json token (saved in page/login.js) //
    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("auth")));
    }, []);

    const router = useRouter();

    const token = state && state.token ? state.token : "";

    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios.interceptors.response.use(
        function (response) {
            // do something before request is sent//
            return response;
        },
        function (error) {
            // do something with request error
            let res = error.response;
            // 401 is unauthorised error //
            if(res.status === 401 && res.config && !res.config._isRetryRequest) {
                // Logging user out by force when token is expired //
                setState(null);
                // remove user details from local storage //
                window.localStorage.removeItem("auth");
                router.push("/login");
            }
        }
    );


    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
};

export {UserContext, UserProvider};