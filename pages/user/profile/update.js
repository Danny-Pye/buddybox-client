import {useState, useContext, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Modal, Avatar} from "antd";
import Link from "next/link";
import AuthForm from "../../../components/forms/AuthForm"
import {UserContext} from "../../../context"
import {useRouter} from "next/router";
// import user from "../../../../server/models/user";
import {CameraOutlined, LoadingOutlined} from "@ant-design/icons";


const ProfileUpdate = () => {
    const [username, setUsername] = useState("");
    const [about, setAbout] = useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    // profile image
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    //
    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    //pre-populate form input fields with users data //
    useEffect(() => {
        if(state && state.user) {
            // console.log('user from state =>', state.user);
            setUsername(state.user.username);
            setEmail(state.user.email);
            setName(state.user.name);
            setAbout(state.user.about);
            setImage(state.user.image);
        }
    }, [state && state.user])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const {data} = await axios.put(`/profile-update`, {
                username, about, name, email, password, secret, image
            });

            if (data.error) {
                toast.error(data.error);
                setLoading(false);
            } else {

                toast.success('Profile updated');
                // update local storage //
                let auth = JSON.parse(localStorage.getItem("auth"));
                auth.user = data;
                localStorage.setItem("auth", JSON.stringify(auth));
                // update context //
                setState({...state, user: data});
                setOk(data.ok);
                setLoading(false);


            }
        }
        catch (err){
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    // if(state && state.token) router.push("/");
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


    return (
        <div className="container-fluid">
            <div className="row py-5 bg-secondary text-light">
                <div className="col text-center">
                    <h1 className="text-light" >Profile</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <label>
                        {image && image.url ? (
                            <Avatar size={60} src={image.url}/>
                        ) : uploading ? (<LoadingOutlined spin />) : (<CameraOutlined style={{ padding: '0 0 0 15px', fontSize: '25px', cursor: 'pointer'}} className="mt-2" />)}
                        <input onChange={handleImage} type="file" accept="images/*" hidden />
                    </label>
                    <AuthForm
                        profileUpdate={true}
                        handleSubmit={handleSubmit}
                        username={username}
                        setUsername={setUsername}
                        about={about}
                        setAbout={setAbout}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                        page="updateProfile"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal title="Congratulations!" visible={ok} footer={null} onCancel={() => setOk(false)} >
                        <p>Update successful. Nice!</p>
                    </Modal>
                </div>
            </div>

        </div>

    )
};

export default ProfileUpdate;