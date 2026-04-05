import "./IssueCardSkeleton.css";

const IssueCardSkeleton = () => {
  return (
    <div className="issue-skeleton">
      <div className="issue-skeleton__reporter shimmer"></div>
      <div className="issue-skeleton__title shimmer"></div>
      <div className="issue-skeleton__image shimmer"></div>

      <div className="issue-skeleton__footer">
        <div className="issue-skeleton__badges">
          <div className="issue-skeleton__badge shimmer"></div>
          <div className="issue-skeleton__badge shimmer"></div>
        </div>
        <div className="issue-skeleton__button shimmer"></div>
      </div>
    </div>
  );
};

export default IssueCardSkeleton;