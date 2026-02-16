import React from "react";
import { useAuth } from "../context/UserContext";
import { Formik, Field, Form } from "formik";

const backend = import.meta.env.VITE_BACKEND_URL;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
          video: null,
        }}
        onSubmit={async (values, actions) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("video", values.video);

            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData, // ❗ do NOT set Content-Type
            });

            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error(error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <Field name="title" placeholder="Video title" />

            <input
              type="file"
              name="video"
              onChange={(event) => {
                setFieldValue("video", event.currentTarget.files[0]);
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
