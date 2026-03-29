import { Link } from "react-router-dom";

const IssueCard = ({ issue , onUpvote}) => {
  return (
    <div>
      {issue.imageUrl && (
        <img
          src={issue.imageUrl}
          alt={issue.title}
          style={{ width: "200px", height: "auto" }}
        />
      )}

      <h3><Link to={`/issues/${issue._id}`}>{issue.title}</Link></h3>
      <p>{issue.description}</p>
      <p>Category: {issue.category}</p>
      <p>Status: {issue.status}</p>
      <p>Upvotes: {issue.upvotesCount}</p>

      <button onClick={() => onUpvote(issue._id)}>↑ Upvote</button>
    </div>
  );
};

export default IssueCard;