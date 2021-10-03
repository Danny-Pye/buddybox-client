// user dashboard page contains posts and sidebar //

import {useContext, useState, useEffect} from "react";
import {UserContext} from "../../context/index";
import {useRouter} from "next/router";
import axios from 'axios';
import {toast} from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import Link from 'next/link';
import {Modal, Pagination} from 'antd';
import io from 'socket.io-client';

// socket.io
const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {path: "/socket.io"}, {
    reconnection: true,
});


// UserRoute protects routes from non-authenticated persons //
import UserRoute from '../../components/routes/UserRoute'
// component //
import PostForm from "../../components/forms/PostForm";
import CommentForm from "../../components/forms/CommentForm";
import Search from "../../components/Search";



const Dashboard = () => {
    // context used to set global state so json web token available across all pages //
    const [state, setState] = useContext(UserContext);
    //state
    const [content, setContent] = useState("");
    const [image, setImage] =useState({});
    const [uploading, setUploading] =useState(false);
    // Posts in here
    const [posts, setPosts] =useState([]);
    const [people, setPeople] =useState([]);
    const [comment, setComment] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    // Pagination
    const [totalPosts, setTotalPosts] = useState(0);
    const [page, setPage] = useState(1);


    const router = useRouter();

    useEffect(() => {
        if(state && state.token) {
            newsFeed();
            window.scrollTo(0, 0);
            findPeople();
        }
    }, [state && state.token, page]);

    useEffect(() => {
        try {
            axios.get("/total-posts").then(({data}) => setTotalPosts(data));
        } catch (err) {
            console.log(err);
        }
    }, []);

// All posts //

    // const fetchUserPosts = async () => {
    //     try {
    //         const {data} =await axios.get('/user-posts');
    //         // console.log('user posts =>', data);
    //         setPosts(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

// Friends only posts //
    const newsFeed = async () => {
        try {
            const {data} = await axios.get(`/news-feed/${page}`);
            // console.log('user posts =>', data);
            setPosts(data);
        } catch (err) {
            console.log(err);
        }
    };

    const findPeople = async () => {
        try {
            const {data} = await axios.get('/find-people');
            setPeople(data);
        }catch (err) {
            console.log(err);
        }
    };

    // function to save post in database
    const postSubmit = async (e) => {
        // stops page from reloading //
        e.preventDefault();
        try {
            // axios sends the data from text area saved to value={content} to the back end, to endpoint created in server/routes/auth.js //
            const {data} = await axios.post('/create-post', {content, image});
            if (data.error) {
                toast.error(data.error);
            } else {
                setPage(1);
                newsFeed();
                toast.success('Post created');
                setContent("");
                setImage({});
                // socket.io
                socket.emit('new-post', data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const {data} = await axios.post("/upload-image", formData);
            // put res data in state as an image //
            setImage({
                url: data.url,
                public_id: data.public_id,
            });
            setUploading(false);
        } catch (err) {
            console.log(err);
            setUploading(false);
        }
    };

    const handleDelete = async (post) => {
        try {
            const answer = window.confirm('Are you sure you want to delete this post?')
            if (!answer) return;
            const {data} = await axios.delete(`/delete-post/${post._id}`);
            toast.error('Post deleted.');
            newsFeed();
        } catch (err) {
            console.log(err);
        }
    };

    const handleFollow = async (user) => {
        // console.log('add this user to list', user);
        try {
            const {data} = await axios.put("/user-follow", {_id: user._id});
            // console.log("handle follow response =>", data);
            // update local storage //
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({...state, user: data});
            // update people state //
            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
            // re-render posts //
            newsFeed();
            toast.success(`Following ${user.name}`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async (_id) => {
        try {
            const {data} = await axios.put("/like-post", {_id});
            newsFeed();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async (_id) => {
        try {
            const {data} = await axios.put("/unlike-post", {_id});
            newsFeed();
        } catch (err) {
            console.log(err);
        }
    };

    const handleComment = (post) => {
        setCurrentPost(post);
        setVisible(true);
    };

    const addComment = async (e) => {
        e.preventDefault();
        // console.log(currentPost._id);
        // console.log(comment);
        try {
            const {data} = await axios.put("/add-comment", {
                postId: currentPost._id, comment,
            });
            setComment("");
            setVisible(false);
            newsFeed();

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <UserRoute>
            <div className="container-fluid colour-for-dashboard">
                <div className="row">
                    <div className="col">
                        <h1 className="display-1 text-center py-5">Dashboard</h1>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-md-8">
                        <PostForm
                        content={content}
                        setContent={setContent}
                        postSubmit={postSubmit}
                        handleImage={handleImage}
                        uploading={uploading}
                        image={image}
                        />
                        <br/>
                        <PostList
                            handleComment={handleComment}
                            addComment={addComment}
                            handleLike={handleLike}
                            handleUnlike={handleUnlike}
                            posts={posts}
                            handleDelete={handleDelete}

                        />
                        <Pagination className="pb-3" current={page} total={totalPosts} defaultPageSize={10} onChange={(value) => setPage(value)} />
                    </div>

                    <div className="col-md-4">
                        <Search />
                        <br />
                        {state && state.user && state.user.following && <Link href={`/user/following`}><a className="h6">Following {state.user.following.length} people</a></Link>}
                        <People
                            people={people}
                            handleFollow={handleFollow}
                        />
                    </div>
                </div>
                <Modal visible={visible} onCancel={() => setVisible(false)} title="Comment" footer={null} >
                <CommentForm
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                />
                </Modal>
            </div>
        </UserRoute>
    );
};

export default Dashboard;