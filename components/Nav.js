import {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {UserContext} from "../context";
import {useRouter} from "next/router";
import {MenuOutlined} from '@ant-design/icons';


const Nav = () => {
// getting the current page by reading the /example part of href from browser window //
    const [current, setCurrent] = useState("");
       useEffect(() => {
           process.browser && setCurrent(window.location.pathname)
       }, [process.browser && window.location.pathname]);


    const [state, setState]= useContext(UserContext);
    const router = useRouter();

    const logout = () => {
        window.localStorage.removeItem('auth');
        setState(null);
        router.push('/login');
    }

    return (
        <nav className="nav bg-dark d-flex justify-content-center">

            <Link href="/">
                <a className={`nav-link text-light ${current === "/" && "active"}`}>Home</a>
            </Link>





            {state === null && <Link href="/login">
                <a className={`nav-link text-light ${current === "/login" && "active"}`}>Login</a>
            </Link>}

            {state === null && <Link href="/register">
                <a className={`nav-link text-light ${current === "/register" && "active"}`}>Register</a>
            </Link>}

            {state !== null && <Link href="/user/dashboard">
                <a className={`nav-link text-light ${current === "/user/dashboard" && "active"}`}>{state && state.user && state.user.name}</a>
            </Link>}

            {/*{state !== null && <a onClick={logout} className="nav-link text-light">Logout</a>}*/}

            {state !== null && <div className="dropdown d-flex text-align-center">
                <a className="btn dropdown-toggle " href="#" role="button" id="dropdownMenuLink"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    <MenuOutlined style={{color: "white"}} className="dropdown-icon"/>
                </a>


                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link href="/user/profile/update"><a className="dropdown-item">Update Profile</a></Link></li>
                    {/*<li><a className="dropdown-item" href="#">Another action</a></li>*/}
                    <li><a onClick={logout} className="nav-link color-black">Logout</a></li>
                </ul>
            </div>}

        </nav>
    )
}

export default Nav;