export default function VideoInfo({ uploadDate, description, views }) {
  return (
    <div className="description-box">
      <p>
        <strong>
          {views} Views &emsp;{uploadDate}
        </strong>
        <br />
        <br />
      </p>
      <h3>{description}</h3>
    </div>
  );
}
