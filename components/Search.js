import {useState, useContext} from 'react';
import {UserContext} from '../context';
import axios from 'axios';
import People from '../components/cards/People';
import {toast} from "react-toastify";

const Search = () => {
    const [state, setState] = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const searchUser = async (e) => {
      e.preventDefault();
      try {
          const {data} = await axios.get(`/search-user/${query}`);
          // console.log("search user response =>", data);
          setResult(data);
      } catch (err) {
          console.error(err);
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
            let filtered = result.filter((p) => p._id !== user._id);
            setResult(filtered);
            // re-render posts //
            // newsFeed();
            toast.success(`Following ${user.name}`);
        } catch (err) {
            console.log(err);
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
            let filtered = result.filter((p) => p._id !== user._id);
            setResult(filtered);
            toast.info(`You have unfollowed ${user.name}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form className="form-inline row" onSubmit={searchUser}>
                <div className="col-8">
                    <input onChange={(e) => {
                        setQuery(e.target.value);
                        setResult([]);
                    }} value={query} className="form-control" placeholder="Search people" type="search"/>
                </div>
                <div className="col-4">
                    <button className="btn btn-outline-primary " type="submit" >Search</button>
                </div>
            </form>
            {result && result.map((r) => <People key={r._id} people={result} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />)}
        </>
    )
};

export default Search;