import {useContext, useState, useEffect} from 'react'
import {Avatar, List} from 'antd'
import moment from 'moment'
import {useRouter} from 'next/router'
import {UserContext} from '../../context'
import axios from 'axios'
import {RollbackOutlined} from "@ant-design/icons";
import Link from 'next/link';
import {toast} from "react-toastify";


const Following = () => {
    const [state, setState] = useContext(UserContext);
    const [people, setPeople] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (state && state.token) fetchFollowing();
    }, [state && state.token]);

    const fetchFollowing = async () => {
        try {
            const {data} = await axios.get("/user-following");
            setPeople(data);
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
            {/*<pre>{JSON.stringify(people, null, 4)}</pre>*/}
            <List
                itemLayout="horizontal"
                dataSource={people}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={imageSource(user)} />}
                            title={
                                <div className="d-flex justify-content-between">
                                    {user.username} <span onClick={() => handleUnfollow(user)} className="text-primary cursor_pointer">Unfollow</span>
                                </div>
                            }
                        />

                    </List.Item>
                )}
            />
            <Link href="/user/dashboard">
                <a className="d-flex justify-content-center pt-5">
                    <RollbackOutlined />
                </a>
            </Link>

        </div>
    );
};

export default Following;
