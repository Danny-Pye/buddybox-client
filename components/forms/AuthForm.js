import {SyncOutlined} from "@ant-design/icons";

const AuthForm = ({
                      handleSubmit,
                      username,
                      setUsername,
                      about,
                      setAbout,
                      name,
                      setName,
                      email,
                      setEmail,
                      password,
                      setPassword,
                      secret,
                      setSecret,
                      loading,
                      page }) => (
<form onSubmit={handleSubmit}>

    {/***** USERNAME *****/}
    {page !== "login" && <div className="form-group p-2">
        <small><label className="text-muted">Username</label></small>
        <input disabled={page === "updateProfile"} value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control"
               placeholder="Enter Username"/>
    </div>}

    {/***** ABOUT *****/}
    {page === "updateProfile" && <div className="form-group p-2">
        <small><label className="text-muted">About me</label></small>
        <input value={about} onChange={(e) => setAbout(e.target.value)} type="text" className="form-control"
               placeholder="Tell us about yourself..."/>
    </div>}

    {/***** NAME *****/}
    {page !== "login" && <div className="form-group p-2">
        <small><label className="text-muted">Your Name</label></small>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control"
               placeholder="Enter Name"/>
    </div>}

    {/***** EMAIL *****/}
    <div className="form-group p-2">
        <small><label className="text-muted">Email</label></small>
        <input disabled={page === "updateProfile"} value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control"
               placeholder="Enter Email"/>
    </div>

    {/***** PASSWORD *****/}
    <div className="form-group p-2">
        <small><label className="text-muted">Password</label></small>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" />
    </div>

    {/***** SECRET QUESTION *****/}
    {page !== "login" && <div className="form-group p-2">
        <small><label className="text-muted">Pick a question</label></small>
        <select className="form-control">
            <option>What is your favorite animal?</option>
            <option>What is your favourite place?</option>
            <option>Who is your favourite person?</option>
        </select>
        <small className="form-text text-muted">Use this to help reset your password.</small>
    </div>}

    {page !== "login" && <div className="form-group p-2">
        <input value={secret} onChange={(e) => setSecret(e.target.value)} type="text" className="form-control" placeholder="Write answer here.."/>
        </div>}

    <div className="form-group p-2">
        <button disabled={page === "login" ? !email || !password || loading : page === "register" ? !name || !email || !password || !secret || loading : !about && !name && !password || loading } className="btn btn-primary col-12">
            {loading ? <SyncOutlined spin className="py-1"/> : (page === "login" ? "login" : "Submit")}
        </button>
    </div>

</form>)

export default AuthForm;
