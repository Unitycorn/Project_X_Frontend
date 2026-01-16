import { useAuth } from "../context/UserContext";

export default function Upload() {
  const { user } = useAuth();

  function handleUpload(e) {
    e.preventDefault;
  }

  return (
    <section className="upload">
      <p className="text-2xl">{`${user.name}, create a new experience for your audience:`}</p>
      <br />
      <br />
      <br />
      <form action={handleUpload}>
        <input type="hidden" name="user_id" value={user.id} />
        <label htmlFor="video-title">1. Give your video a title:</label>
        <input type="text" name="video-title"></input>
        <label htmlFor="video-input">2. Choose the video file:</label>
        <input type="file" id="file-input" name="video-input" />
        <label htmlFor="video-description">3. Add a thumbnail:</label>
        <input type="file" name="video-thumbnail"></input>
        <label htmlFor="video-description">
          4. Give it some context by adding a description:
        </label>
        <textarea name="video-description"></textarea>
        <label htmlFor="video-tags">
          5. Lastly, add some tags, separated by commas:
        </label>
        <input
          type="text"
          name="video-tags"
          placeholder="Music, Educational, ..."
        ></input>
        <button type="submit" className="button active">
          Create experience
        </button>
      </form>
    </section>
  );
}
