import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/index";
import axios from 'axios';
import Post from "../components/cards/Post";
import Head from 'next/head';
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {path: "/socket.io"}, {
    reconnection: true,
});

const Home = ({posts}) => {
    // context used to set global state so json web token available across all pages //
    const [state, setState] = useContext(UserContext);
    const [newsFeed, setNewsFeed] = useState ([]);

    useEffect(() => {
        // console.log("socket", socket);
        socket.on('new-post', (newPost) => {
            setNewsFeed([newPost, ...posts]);
        });
    }, []);

    const collection = newsFeed.length > 0 ? newsFeed : posts;

    return (
        <>
            <Head>
                <title>buddybox - a social network for everyone</title>
                <meta name="buddybox" content="social media platform for people who don't like their data being collected, alternative to facebook or twitter" />
                <meta property="og:description" content="social media platform for people who don't like their data being collected, alternative to facebook or twitter" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="buddybox" />
                <meta property="og:image:secure_url" content="https://buddybox.co.uk/images/default.jpg" />
            </Head>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col"
                         style={{backgroundImage: "url(" + "/images/default.jpg" + ")",
                             backgroundAttachment: "fixed",
                             padding: "100px 0 75px 0",
                             backgroundRepeat: "no-repeat",
                             backgroundSize: "cover",
                             display: "block",
                             backgroundPosition: "center center",
                         }}
                    >

                        <h1 className="display-1 text-center py-5 text-light font-weight-bold" style={{textShadow: "2px 2px 8px #000000"}}>Buddybox</h1>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                                {collection.map((post) => (<Post key={post._id} post={post} page="home" />))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export async function getServerSideProps() {
    const {data} = await axios.get("/posts");
    // console.log(data);
    return {
        props: {
            posts: data,
        },
    };
}

export default Home;