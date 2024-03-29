const CommentForm = ({comment, setComment, addComment}) => {
    return (
        <form onSubmit={addComment}>
            <input type="text" className="form-control" placeholder="Write your comment here..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="btn btn-primary btn-sm btn-block mt-3">Submit</button>
        </form>
    )
};

export default CommentForm;
