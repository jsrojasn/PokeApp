import { Formik, Form, Field } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validations";
import {LOCAL_STORAGE_USER} from "../utils/constants"

const Login = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_USER);
  const navigate = useNavigate();
  if (user) {
    return <Navigate to="/pokemons" replace />;
  }

  return (
    <div className="w-full h-screen border flex items-center justify-center">
      <div className="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="text-center mb-3 font-black text-2xl">Login</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            localStorage.setItem(LOCAL_STORAGE_USER, values.email);
            navigate("/pokemons");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <p className="block text-grey-darker text-sm font-bold mb-2">
                  Email
                </p>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  name="email"
                  validate={validateEmail}
                />
                {errors.email && touched.email && (
                  <p className="text-rose-700 text-xs italic py-1 text-right">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <p className="block text-grey-darker text-sm font-bold mb-2">
                  Password
                </p>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  name="password"
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <p class="text-rose-700 text-xs italic py-1 text-right">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-sky-900 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
