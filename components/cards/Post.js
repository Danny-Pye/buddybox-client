import {useContext} from 'react';
import Link from 'next/link'
import renderHTML from 'react-render-html';
import moment from 'moment';
import {Avatar} from 'antd';
import {LikeOutlined, LikeFilled, DislikeOutlined, CommentOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {UserContext} from '../../context/index';
import {useRouter} from 'next/router';
import imageSource from '../../functions/imageSource'






const Post = ({post, handleDelete, handleUnlike, handleLike, handleComment, commentsCount = 2, removeComment, p, page, }) => {
    const [state] = useContext(UserContext);
    const router = useRouter();

    return (
        <>
            {post && post.postedBy && (<div key={post._id} className="card mb-5">
                <div className="card-header">
                    <div className="d-flex justify-content-between">
                        {/*{post.postedBy.name[0]}*/}
                        <Avatar src={imageSource(post.postedBy)} size={40} className="mb-2"/>


                        <span><h5>{post.postedBy.name}</h5></span>


                        <span>{moment(post.createdAt).fromNow()}</span>

                    </div>
                </div>
                <div className="card-body">
                    {renderHTML(post.content)}
                </div>
                <div className="card-footer p-3">
                    {post.image ? <img src={post.image && post.image.url}
                                       alt={post.postedBy.name}
                    /> : null}

                        {page !== "home" &&
                        <div className="like-unlike-edit-delete">


                            <p>like</p>
                            <span>{post.likes.length}</span>{state && state.user && post.likes && post.likes.includes(state.user._id) ?
                            <LikeFilled className="card-item"/> :
                            <LikeOutlined onClick={() => handleLike(post._id)} className="card-item"/>} <p>unlike</p>
                            <DislikeOutlined onClick={() => handleUnlike(post._id)} className="card-item"/> <Link
                            href={`/post/${post._id}`}><a>comments</a></Link><span>{post.comments.length}</span>
                            <CommentOutlined onClick={() => handleComment(post)} className="card-item"/>
                        {state && state.user && state.user._id === post.postedBy._id && (<>
                            <p>edit</p> <EditOutlined onClick={() => router.push(`/user/post/${post._id}`)}
                            className="card-item"/>  <p>delete</p> <DeleteOutlined
                            onClick={() => handleDelete(post)} className="card-item"/>
                            </>
                            )}

                    </div>}

                </div>
                {post.comments && post.comments.length > 0 && (
                    <ol className="list-group">
                        {post.comments.slice(0, commentsCount).map((c) => (
                            <li key={c._id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div><Avatar size={24} className="mb-1 mr3" src={imageSource(c.postedBy)}/><span
                                        className="px-4">{c.postedBy.name}</span></div>
                                    <div>{c.text}</div>
                                </div>
                                <span className="badge rounded-pill text-muted">{moment(c.created).fromNow()}
                                    {state && state.user && state.user._id === c.postedBy._id && p === 4 &&
                                        (<div className="ml-auto mt-1">
                                            <DeleteOutlined onClick={() => removeComment(post._id, c)} className="card-item text-danger" />
                                        </div>
                                    )}
                                </span>
                            </li>
                        ))}

                    </ol>
                )}
            </div>)}
        </>
    );
};

export default Post;