import React from "react";
import { useAuth } from "../context/UserContext";
import { Formik, Field, Form } from "formik";

const backend = import.meta.env.VITE_BACKEND_URL;

export default function Upload() {
  const { user } = useAuth();

  return (
    <section className="upload">
      <p className="text-2xl">{`${user.name}, create a new experience for your audience:`}</p>
      <br />
      <br />
      <br />

      <Formik
        initialValues={{
          title: "",
          description: "", 
          tags: "",       
          video: null,
        }}
        onSubmit={async (values, actions) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("tags", values.tags);
            formData.append("user_id", user.id);
            formData.append("video", values.video);

            const response = await fetch(`${backend}/upload`, {
              method: "POST",
              body: formData, // ❗ do NOT set Content-Type
            });

            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Upload failed:", error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <Field name="title" placeholder="Video title" className="border p-2" />
            
            <Field as="textarea" name="description" placeholder="Video description" className="border p-2" />
            
            {/* Added input for tags */}
            <Field name="tags" placeholder="Tags (comma separated)" className="border p-2" />

            <input
              type="file"
              name="video"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={(event) => {
                setFieldValue("video", event.currentTarget.files[0]);
              }}
            />

            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 mt-4">
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
