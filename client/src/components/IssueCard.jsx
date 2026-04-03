import { Link } from "react-router-dom";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import "./IssueCard.css";

const IssueCard = ({ issue, onUpvote, onDelete, editLink }) => {
  //here article , is a semantic html for content card/post.
  return (
    <article className="issue-card">
      <div className="issue-card__header">
        <p className="issue-card__reporter">
          Reported by {issue.reportedBy?.name || "Anonymous"}
        </p>

        {(editLink || onDelete) && (
          <div className="issue-card__actions">
            {editLink && (
              <Link to={editLink} className="issue-card__edit">
                <FiEdit2 />
              </Link>
            )}

            {onDelete && (
              <button
                type="button"
                className="issue-card__delete"
                onClick={() => onDelete(issue._id)}
              >
                <FiTrash2 />
              </button>
            )}
          </div>
        )}
      </div>

      <h3 className="issue-card__title">
        <Link to={`/issues/${issue._id}`}>{issue.title}</Link>
      </h3>

      {issue.imageUrl && (
        <Link to={`/issues/${issue._id}`} className="issue-card__image-link">
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="issue-card__image"
          />
        </Link>
      )}

      <div className="issue-card__footer">
        <div className="issue-card__meta">
          <span className="issue-card__badge">{issue.category}</span>
          <span className={`issue-card__status issue-card__status--${issue.status}`}> {issue.status} </span>
        </div>

        {onUpvote && (
          <button
            type="button"
            className="issue-card__upvote"
            onClick={() => onUpvote(issue._id)}
          >
            ⬆️ Upvote ({issue.upvotesCount})
          </button>
        )}
      </div>
    </article>
  );
};

export default IssueCard;
