import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import {toast} from "react-toastify";
import Post from "../../components/cards/Post";
import Link from "next/link";
import {RollbackOutlined} from "@ant-design/icons";



const PostComments = () => {
    const [post, setPost] = useState({});
    const router = useRouter();
    const _id = router.query._id;

    useEffect(() => {
        if (_id) fetchPost();
    }, [_id]);

    const fetchPost = async () => {
        try {
            const {data} = await axios.get(`/user-post/${_id}`);
            setPost(data);
        } catch (err) {
            console.log(err);
        }
    };

    const removeComment = async (postId, comment) => {
        let answer = window.confirm("Are you sure?");
        if (!answer) return;
        try {
            const {data} = await axios.put("/remove-comment", {postId, comment,});
            // console.log("comment removed," data);
            fetchPost();
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="row">
            <div className="col-md-8 offset-2">
                <Post
                    post={post}
                    commentsCount={100}
                    removeComment={removeComment}
                    p={4}
                />
            </div>
            <div className="col-md-8 offset-2">
                <Link href="/user/dashboard">
                    <a className="card-item d-flex justify-content-center py-5">
                        <RollbackOutlined />
                    </a>
                </Link>
            </div>
        </div>
    );
};



export default PostComments;