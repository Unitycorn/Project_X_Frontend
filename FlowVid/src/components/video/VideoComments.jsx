import { Link } from "react-router-dom";
import Like from "../Like";
import Avatar from "../Avatar";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import {
  getTimeDifference,
  convertMilliseconds,
  requestJson,
} from "../../Utilities";

import { FaTrashCan } from "react-icons/fa6";

export default function VideoComments({ allComments, videoId }) {
  const { user, isAuthenticated, isOwner } = useAuth();
  const [comments, setComments] = useState(allComments);
  const [text, setText] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [error, setError] = useState(null);

  async function saveCommentToDb(comment) {
    return requestJson(
      `${import.meta.env.VITE_BACKEND_URL}/video/${videoId}/comment/add`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      },
      "Failed to add comment",
    );
  }

  async function deleteCommentFromDb(comment) {
    return requestJson(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${comment.id}/delete`,
      {},
      "Failed to delete comment",
    );
  }

  async function addComment(e) {
    e.preventDefault();
    setError(null);

    if (!text.trim()) {
      return;
    }

    const newComment = {
      by: user.name,
      channelId: user.id,
      icon: user.icon || "",
      date: new Date().toISOString(),
      comment: text,
      likes: 0,
    };

    try {
      const savedComment = await saveCommentToDb(newComment);
      const persistedComment =
        savedComment && typeof savedComment === "object"
          ? { ...newComment, ...savedComment }
          : newComment;
      setComments((prev) => [persistedComment, ...(prev || [])]);
      setText("");
    } catch (err) {
      setError(err.message || "Failed to add comment");
    }
  }

  function requestDelete(comment) {
    setCommentToDelete(comment);
  }

  async function confirmDelete() {
    if (!commentToDelete) {
      return;
    }

    setError(null);

    try {
      await deleteCommentFromDb(commentToDelete);
      setComments((prev) =>
        (prev || []).filter((comment) => comment.id !== commentToDelete.id),
      );
      setCommentToDelete(null);
    } catch (err) {
      setError(err.message || "Failed to delete comment");
    }
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
      {error ? <p aria-live="assertive">{error}</p> : null}

      <h3 className="text-2xl">
        {comments ? `${comments.length} Comment(s):` : "No comments yet"}
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
                  <Link to={`/channel/${comment.channelId}`}>
                    <Avatar
                      src={`../images/${comment.icon}`}
                      alt={`${comment.by}'s logo`}
                    ></Avatar>
                  </Link>
                ) : (
                  <Link to={`/channel/${comment.channelId}`}>
                    <Avatar>{comment.by[0] ? comment.by[0] : ""}</Avatar>
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
