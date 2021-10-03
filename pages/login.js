


    import {useState, useContext} from "react";
    import axios from "axios";
    import {toast} from "react-toastify";
    import {Modal} from "antd";
    import Link from "next/link";
    import AuthForm from "../components/forms/AuthForm"
    import {useRouter} from "next/router";
    import {UserContext} from "../context/index";


    const Login = () => {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const router = useRouter();

        // state of user... logged in or not + json token. //
        const [state, setState] = useContext(UserContext);




        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                setLoading(true);
                const {data} = await axios.post(`/login`, {
                     email, password,
                });

                if(data.error) {
                    toast.error(data.error);
                    setLoading(false);
                } else {
                    // Update Context with user data after logged in //
                    setState({
                        user: data.user,
                        token: data.token,
                    })
                    // Save user data locally so doesn't log user out when refresh. //
                    window.localStorage.setItem('auth', JSON.stringify(data));

                    // ** Move to page once logged in ** //
                    await router.push("/user/dashboard");
                }
            }
            catch (err){
                toast.error(err.response.data);
                setLoading(false);
            }

        };

        if(state && state.token) router.push("/user/dashboard");

        return (
            <div className="container-fluid">
                <div className="row py-5 bg-secondary text-light">
                    <div className="col text-center">
                        <h1 className="text-light" >Login</h1>
                    </div>
                </div>

                <div className="row py-5">
                    <div className="col-md-6 offset-md-3">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            loading={loading}
                            page="login"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <p className="text-center">Not registered?
                            <Link href="/register">
                                <a>Register</a>
                            </Link></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="text-center">Forgot password?
                            <Link href="/forgot-password">
                                <a>Reset</a>
                            </Link></p>
                    </div>
                </div>

            </div>
        )
    };



export default Login;