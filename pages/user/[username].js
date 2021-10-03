import {useContext, useState, useEffect} from 'react'
import {Avatar, Card} from 'antd'
import moment from 'moment'
import {useRouter} from 'next/router'
import {UserContext} from '../../context'
import axios from 'axios'
import {RollbackOutlined} from "@ant-design/icons";
import Link from 'next/link';
import {toast} from "react-toastify";


const Username = () => {
    const [state, setState] = useContext(UserContext);
    const [user, setUser] = useState({});
    const router = useRouter();
    const {Meta} = Card;

    useEffect(() => {
        if (router.query.username) fetchUser();
    }, [router.query.username]);

    const fetchUser = async () => {
        try {
            const {data} = await axios.get(`/user/${router.query.username}`);
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    };

    const imageSource = (user) => {
        if (user.image) {
            return user.image.url;
        } else {
            return "/images/trees-6207925_640.jpg"
        }
    };


    const handleUnfollow = async (user) => {
        try {
            const {data} = await axios.put('user-unfollow', {_id: user._id});
            // update local storage //
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({...state, user: data});
            // update people state //
            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
            toast.info(`You have unfollowed ${user.name}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="row col-md-8 offset-2">
            {/*<pre>{JSON.stringify(user, null, 4)}</pre>*/}
            <div className="py-5">
                <Card hoverable cover={<img src={imageSource(user)} alt={user.name} />}  >
                    <Meta title={user.name} description={user.about}  />
                    <div className="d-flex justify-content-between">
                        <span className="btn btn-sm">
                            {user.followers && user.followers.length} Followers
                        </span>
                        <span className="btn btn-sm">
                            {user.following && user.following.length} Following
                        </span>
                    </div>

                </Card>

                <Link href="/user/dashboard">
                    <a className="d-flex justify-content-center pt-5">
                        <RollbackOutlined />
                    </a>
                </Link>
            </div>

        </div>
    );
};

export default Username;
