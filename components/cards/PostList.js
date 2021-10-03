import {useContext, useEffect, useState} from 'react';
import Link from 'next/link'
import renderHTML from 'react-render-html';
import moment from 'moment';
import {Avatar} from 'antd';
import {LikeOutlined, LikeFilled, DislikeOutlined, CommentOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {UserContext} from '../../context/index';
import {useRouter} from 'next/router';
import imageSource from '../../functions/imageSource'
import Post from "../../components/cards/Post";

import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection: true,
});



export const PostList = ({posts, handleDelete, handleUnlike, handleLike, handleComment}) => {
    const [state, setState] = useContext(UserContext);
    const router = useRouter();
    const [newsFeed, setNewsFeed] = useState ([]);


    useEffect(() => {
        // console.log("socket", socket);
        socket.on('new-post', (newPost) => {
            setNewsFeed([newPost, ...posts]);

        });
    }, [posts]);

    const collection = newsFeed.length > 0 ? newsFeed : posts;

    return (
        <>
            {posts && collection.map((post) => (
                <Post
                    key={post._id}
                    post={post}
                    handleDelete={handleDelete}
                    handleUnlike={handleUnlike}
                    handleLike={handleLike}
                    handleComment={handleComment}
                />

            ))}
        </>
    );
};

















export default PostList;

// <div key={post._id} className="card mb-5">
//     <div className="card-header">
//         <div className="d-flex justify-content-between">
//             {/*{post.postedBy.name[0]}*/}
//             <Avatar src={imageSource(post.postedBy)} size={40} className="mb-2" />
//
//
//             <span><h5>{post.postedBy.name}</h5></span>
//             <span>{moment(post.createdAt).fromNow()}</span>
//
//         </div>
//     </div>
//     <div className="card-body">
//         {renderHTML(post.content)}
//     </div>
//     <div className="card-footer p-3">
//         {post.image ? <img src={post.image && post.image.url}
//                            alt={post.postedBy.name}
//         /> : null }
//
//         <div className="like-unlike-edit-delete">
//             <p>like</p><span>{post.likes.length}</span>{state && state.user && post.likes && post.likes.includes(state.user._id) ? <LikeFilled className="card-item" /> : <LikeOutlined onClick={() => handleLike(post._id)} className="card-item"/>} <p>unlike</p> <DislikeOutlined onClick={() => handleUnlike(post._id)} className="card-item" /> <Link href={`/post/${post._id}`}><a>comments</a></Link><span>{post.comments.length}</span> <CommentOutlined onClick={() => handleComment(post)} className="card-item" />
//             {state && state.user && state.user._id === post.postedBy._id && ( <>
//                     <p>edit</p> <EditOutlined onClick={() => router.push(`/user/post/${post._id}`)} className="card-item" />  <p>delete</p> <DeleteOutlined onClick={() => handleDelete(post)} className="card-item" />
//                 </>
//             )}
//
//         </div>
//
//     </div>
//     {post.comments && post.comments.length > 0 && (
//         <ol className="list-group">
//             {post.comments.map((c) => (
//                 <li className="list-group-item d-flex justify-content-between align-items-start">
//                     <div className="ms-2 me-auto">
//                         <div><Avatar size={24} className="mb-1 mr3" src={imageSource(c.postedBy)} /><span className="px-4">{c.postedBy.name}</span></div>
//                         <div>{c.text}</div>
//                     </div>
//                     <span className="badge rounded-pill text-muted">{moment(c.created).fromNow()}</span>
//                 </li>
//             ))}
//
//         </ol>
//     )}
// </div>