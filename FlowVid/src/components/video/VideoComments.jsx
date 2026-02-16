import { Link } from "react-router-dom";
import Like from "../Like";
import Avatar from "../Avatar";
import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { getTimeDifference, convertMilliseconds } from "../../Utilities";

const backend = import.meta.env.VITE_BACKEND_URL;

import { FaTrashCan } from "react-icons/fa6";

export default function VideoComments({ allComments, videoId }) {
  const { user, isAuthenticated, isOwner } = useAuth();
  const [comments, setComments] = useState(allComments);
  const [video, setVideo] = useState(videoId);
  const [text, setText] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);

  async function saveCommentToDb(comment) {
    const res = await fetch(`${backend}/video/${video}/comment/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await res.json();
    if (res.error) {
      throw {
        message: res.error,
        statusText: res.error,
        status: res,
      };
    }
    return data;
  }

  async function deleteCommentFromDb(comment) {
    const res = await fetch(`${backend}/comments/${comment.id}/delete`);
    const data = await res.json();
    console.log(data);
    if (res.error) {
      throw {
        message: res.error,
        statusText: res.error,
        status: res,
      };
    }
    return data;
  }

  function addComment(e) {
    e.preventDefault();

    const newComment = {
      by: user.name,
      channelId: user.id,
      icon: user.icon,
      date: new Date().toISOString(),
      comment: text,
      likes: 0,
    };
    saveCommentToDb(newComment);
    setComments((prev) => [newComment, ...prev]);
    setText("");
  }

  function requestDelete(comment) {
    setCommentToDelete(comment);
  }

  function confirmDelete() {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentToDelete.id
          ? { ...comment, removing: true }
          : comment
      )
    );
    setTimeout(() => {
      setComments((prev) =>
        prev.filter((comment) => comment.id !== commentToDelete.id)
      );
    }, 250);
    deleteCommentFromDb(commentToDelete);
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
                {comment.icon ? (
                  <Link to={`channel/${comment.channelId}`}>
                    <Avatar
                      src={`../images/${comment.icon}`}
                      alt={`${comment.by}'s logo`}
                    ></Avatar>
                  </Link>
                ) : (
                  <Link to={`channel/${comment.channelId}`}>
                    <Avatar>{comment.by[0]}</Avatar>
                  </Link>
                )}
                <div>
                  <p>
                    <Link to={`/channel/${comment.channelId}`}>
                      <strong>@{comment.by}</strong>
                    </Link>
                    &emsp;
                    <small className="subsection">
                      {convertMilliseconds(milliseconds)}
                    </small>
                  </p>
                  <p>{comment.comment}</p>
                  <div className="actions">
                    <Like totalLikes={comment.likes} />
                    {isOwner(comment.channelId, user?.id) && (
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
