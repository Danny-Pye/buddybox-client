import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {SyncOutlined} from "@ant-design/icons";
import {UserContext} from "../../context";

const UserRoute = ({children}) => {
    const [ok, setOk] = useState(false);
    const router = useRouter();
    const [state] = useContext(UserContext);

    useEffect(() => {
        if (state && state.token) getCurrentUser()
    }, [state && state.token]);

    // sending token in header //
    const getCurrentUser = async () => {
        try {
            const {data} = await axios.get(`/current-user`);
            if (data.ok) setOk(true);
        } catch (err) {
            await router.push('/login');
        }
    };
    // setting time out for re-direct if user has no token //
    process.browser && state === null && setTimeout(() => {
        getCurrentUser();
    }, 1000);

    return !ok ? (<SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5" />) : (<>{children}</>);
};


export default UserRoute;