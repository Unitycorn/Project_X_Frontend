import { BsHandThumbsUp } from "react-icons/bs";
import Like from "../Like";
import Avatar from "../Avatar";

export default function VideoComments({ comments }) {
  return (
    <div className="comment-section">
      <h3 className="text-2xl">{Object.keys(comments).length} Comments:</h3>
      {Object.values(comments).map((comment) => {
        return (
          <div className="comment">
            <Avatar />
            <p>{comment.by}</p>
            <p>{comment.comment}</p>
            <Like totalLikes={comment.likes} />
          </div>
        );
      })}
    </div>
  );
}
