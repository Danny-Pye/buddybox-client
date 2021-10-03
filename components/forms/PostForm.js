import {Avatar} from "antd";
// dynamic used to load react quill npm package into a variable, as it doesnt like next.js //
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});
import {CameraOutlined, LoadingOutlined} from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";



const PostForm = ({content, setContent, postSubmit, handleImage, uploading, image}) => {
    return (
        <div className="card">
            <div className="card-body pb-3">
                <form className="form-group">
                    <ReactQuill theme="snow" value={content} onChange={(e) => setContent(e)} className="form-control" placeholder="Write something here" />

                </form>
            </div>

            <div className="card-footer d-flex justify-content-between text-muted">
                <button disabled={!content} onClick={postSubmit} className="btn btn-primary px-2 py-1 btn-sm">Post</button>
                <label>
                    {image && image.url ? (
                       <Avatar size={30} src={image.url}/>
                    ) : uploading ? (<LoadingOutlined spin />) : (<CameraOutlined style={{ fontSize: '20px', cursor: 'pointer'}} className="mt-2" />)}
                    <input onChange={handleImage} type="file" accept="images/*" hidden />
                </label>
            </div>
        </div>
    )
};

export default PostForm;