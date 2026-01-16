import { Link } from "react-router-dom";
import Like from "../Like";
import Avatar from "../Avatar";
import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { getTimeDifference, convertMilliseconds } from "../../Utilities";

import { FaTrashCan } from "react-icons/fa6";

export default function VideoComments(allComments) {
  const { user, isAuthenticated, isOwner } = useAuth();
  const [comments, setComments] = useState(allComments.comments);
  const [text, setText] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);

  function addComment(e) {
    e.preventDefault();

    const newComment = {
      by: { name: user.name, id: user.id, icon: user.icon },
      date: Date.now(),
      comment: text,
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setText("");
  }

  function requestDelete(comment) {
    console.log(comment);
    setCommentToDelete(comment);
  }

  function confirmDelete() {
    setComments((prev) =>
      prev.map((comment) =>
        comment.by.id === commentToDelete.by.id
          ? { ...comment, removing: true }
          : comment
      )
    );
    setTimeout(() => {
      setComments((prev) =>
        prev.filter((comment) => comment.by.id !== commentToDelete.by.id)
      );
    }, 250);

    setCommentToDelete(null);
  }

  function cancelDelete() {
    setCommentToDelete(null);
  }

  return (
    <div className="comment-section">
      {isAuthenticated ? (
        <form onSubmit={addComment} className="commentForm">
          <input
            type="text"
            placeholder="Add a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="button active">
            Add
          </button>
        </form>
      ) : null}

      <h3 className="text-2xl">
        {comments ? `${comments.length} Comments:` : "No comments yet"}
      </h3>
      {comments
        ? comments.map((comment) => {
            let milliseconds = getTimeDifference(comment.date);

            return (
              <div
                key={comment.id}
                className={`comment ${comment.removing ? "removing" : ""}`}
              >
                {comment.by.icon ? (
                  <Link to={`channel/${comment.by.id}`}>
                    <Avatar
                      src={comment.by.icon}
                      alt={comment.by.name}
                    ></Avatar>
                  </Link>
                ) : (
                  <Link to={`channel/${comment.by.id}`}>
                    <Avatar>{comment.by.name[0]}</Avatar>
                  </Link>
                )}
                <div>
                  <p>
                    <Link to="/channel">
                      <strong>@{comment.by.name}</strong>
                    </Link>
                    &emsp;
                    <small className="subsection">
                      {convertMilliseconds(milliseconds)}
                    </small>
                  </p>
                  <p>{comment.comment}</p>
                  <div className="actions">
                    <Like totalLikes={comment.likes} />
                    {isOwner(comment.by.id, user?.id) && (
                      <button onClick={() => requestDelete(comment)}>
                        <FaTrashCan />
                      </button>
                    )}
                  </div>
                </div>
                {commentToDelete && (
                  <div className="modal-backdrop">
                    <div className="modal">
                      <h3>Delete your comment?</h3>
                      <p>This action cannot be undone.</p>

                      <div className="modal-actions">
                        <button
                          className="button active"
                          onClick={cancelDelete}
                        >
                          Cancel
                        </button>
                        <button className="button" onClick={confirmDelete}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        : null}
    </div>
  );
}
