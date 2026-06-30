import React from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { requestJson } from "../Utilities";

const backend = import.meta.env.VITE_BACKEND_URL;

export default function Register() {
  const [error, setError] = React.useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  {
    return (
      <div className="container">
        <h2 className="text-2xl">The registration has been deactivated</h2>
        <p>
          This feature has been deactivated in the live demo to prevent abuse
        </p>
      </div>
    );
    /*return (
    <div className="container">
      <h1 className="text-2xl">Register a new account</h1>
      {error && <p>There was an error: {error}</p>}
      <Formik
        initialValues={{
          name: "",
          email: "",
          image: null,
          password: "",
        }}
        onSubmit={async (values, actions) => {
          setError(null);

          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);
            formData.append("email", values.email);
            formData.append("password", values.password);

            await requestJson(
              `${backend}/register`,
              {
                method: "POST",
                body: formData,
              },
              "Registration failed"
            );

            await login({
              email: values.email,
              password: values.password,
            });
            navigate("/");
          } catch (error) {
            setError(error.message || "Registering failed");
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <Field
              name="name"
              placeholder="Desired channel name"
              className="border p-2"
            />

            <input
              type="file"
              name="image"
              accept="jpg/jpeg/avif/bmp/*"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
            />

            <Field
              name="email"
              placeholder="Your email"
              className="border p-2"
            />

            <Field
              name="password"
              placeholder="Password"
              className="border p-2"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 mt-4"
            >
              {isSubmitting ? "Registering profile..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
*/
  }
}
