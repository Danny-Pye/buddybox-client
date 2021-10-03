import {SyncOutlined} from "@ant-design/icons";

const ForgotPasswordForm = ({
                      handleSubmit,
                      email,
                      setEmail,
                      newPassword,
                      setNewPassword,
                      secret,
                      setSecret,
                      loading,
                      page }) => (
    <form onSubmit={handleSubmit}>

        {/***** EMAIL *****/}
        <div className="form-group p-2">
            <small><label className="text-muted">Email</label></small>
            <input value={email}  onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email" />
        </div>

        {/***** PASSWORD *****/}
        <div className="form-group p-2">
            <small><label className="text-muted">New password</label></small>
            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" placeholder="New password" />
        </div>

        {/***** SECRET QUESTION *****/}
        <div className="form-group p-2">
            <small><label className="text-muted">Pick a question</label></small>
            <select className="form-control">
                <option>What is your favorite animal?</option>
                <option>What is your favourite place?</option>
                <option>Who is your favourite person?</option>
            </select>
            <small className="form-text text-muted">Use this to help reset your password.</small>
        </div>

        <div className="form-group p-2">
            <input value={secret} onChange={(e) => setSecret(e.target.value)} type="text" className="form-control" placeholder="Write answer here.."/>
        </div>

        <div className="form-group p-2">
            <button disabled={ !email || !newPassword || !secret || loading} className="btn btn-primary col-12">
                {loading ? <SyncOutlined spin className="py-1"/> : (page === "login" ? "login" : "Submit")}
            </button>
        </div>

    </form>)

export default ForgotPasswordForm;
