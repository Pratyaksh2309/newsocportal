import { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // States for registration
  // role: 1 for mentor, 0 for mentee
  const [profile, setProfile] = useState({
    name: "",
    roll_number: "",
    phone_number: "",
    password: "",
    year: "",
    department: "",
  });

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [years, setYears] = useState([]);
  const [isMentor, setIsMentor] = useState(true);
  const [departments, setDepartments] = useState([]);

  const role = isMentor ? "mentor" : "mentee"; // Dynamically set role
  const baseUrl = process.env.REACT_APP_BACKEND_URL + `/accounts`;

  useEffect(() => {
    api
      .get(`${baseUrl}/years`)
      .then((res) => {
        setYears(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get(`${baseUrl}/departments`)
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handling the name change
  const handleProfile = (e) => {
    const { id, value } = e.target;
    // console.log(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    console.log(profile);
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", isMentor ? "mentor" : "mentee");

    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });

    if (
      profile.name === "" ||
      profile.password === "" ||
      profile.phone_number === "" ||
      profile.roll_number === "" ||
      profile.year === "" ||
      profile.department === ""
    ) {
      setError(true);
      setError1(false);
    } else {
      setSubmitted(true);
      setError(false);
      setError1(false);
    }
    api
      .post(`${baseUrl}/register/`, formData)
      .then((res) => {
        navigate("/registerSuccess");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error === "User already exists") {
          setError1(true);
        }
      });
  };

  // Showing success message
  // const successMessage = () => {
  //     return (
  //         <>
  //             <div
  //                 className="success"
  //                 style={{
  //                     display: submitted ? '' : 'none',
  //                 }}>
  //                 <h1>You have successfully registered as an SoC mentee!!</h1>
  //             </div>
  //         </>
  //     );
  // };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <div
          role="alert"
          className="rounded border-s-4 border-red-500 bg-red-50 p-4"
        >
          <div className="flex items-center gap-2 text-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <strong className="block font-medium"> All fields required </strong>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage1 = () => {
    return (
      <div
        className="error"
        style={{
          display: error1 ? "" : "none",
        }}
      >
        <div
          role="alert"
          className="rounded border-s-4 border-red-500 bg-red-50 p-4"
        >
          <div className="flex items-center gap-2 text-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <strong className="block font-medium"> User already exists </strong>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="form  dark:bg-gray-800 dark:text-white">
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {errorMessage1()}
        {/* {successMessage()} */}
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            &lt;/&gt;Seasons of Code&lt;/&gt;
          </h1>

          <div className="flex justify-center gap-4 my-4">
            <button
              className={`px-4 py-2 font-medium ${
                isMentor ? "bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              } rounded`}
              onClick={() => {setIsMentor(true);}}
            >
              Mentor
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                !isMentor ? "bg-indigo-600 text-white dark:bg-indigo-600 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              } rounded`}
              onClick={() => {setIsMentor(false);}}
            >
              Mentee
            </button>
            
          </div>
            

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-2xl sm:p-6 lg:p-8  dark:bg-slate-700"
          >
            <p className="text-center text-lg font-medium">Registration Form</p>

            {/* <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                            <div>
                                <label
                                    for="Option1"
                                    className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                    tabindex="0"
                                >
                                    <input className="sr-only" id="Option1" type="radio" tabindex="-1" name="option" onClick={role0} defaultChecked />

                                    <span className="text-sm"> Mentee </span>
                                </label>
                            </div>

                            <div>
                                <label
                                    for="Option2"
                                    className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                    tabindex="0"
                                >
                                    <input className="sr-only" id="Option2" type="radio" tabindex="-1" name="option" onClick={role1} />

                                    <span className="text-sm"> Mentor </span>
                                </label>
                            </div>
                        </div> */}

            <div>
              <label for="name">Name</label>

              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800"
                  placeholder="Enter Your Name"
                  onChange={handleProfile}
                  required
                />
              </div>
            </div>

            <div>
              <label for="roll_number">IITB Roll No.</label>

              <div className="relative">
                <input
                  type="text"
                  id="roll_number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800"
                  placeholder="Enter Roll No."
                  onChange={handleProfile}
                  required
                />
              </div>
            </div>

            <div>
              <label for="phone">Phone No.</label>

              <div className="relative">
                <input
                  type="tel"
                  id="phone_number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800"
                  placeholder="Enter Mobile No.(preferably WhatsApp)"
                  onChange={handleProfile}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800"
                  placeholder="Enter Password"
                  onChange={handleProfile}
                  required
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <svg
                      width="24"
                      height="24"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.5 10.6771C10.1888 11.0296 10 11.4928 10 12C10 13.1045 10.8954 14 12 14C12.5072 14 12.9703 13.8112 13.3229 13.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.36185 7.5611C5.68002 8.73968 4.27894 10.4188 3 12C4.88856 14.991 8.2817 18 12 18C13.5499 18 15.0434 17.4772 16.3949 16.6508"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 6C16.0084 6 18.7015 9.1582 21 12C20.6815 12.5043 20.3203 13.0092 19.922 13.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21 12C19.1114 14.991 15.7183 18 12 18C8.2817 18 4.88856 14.991 3 12C5.29855 9.15825 7.99163 6 12 6C16.0084 6 18.7015 9.1582 21 12Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <style jsx>{`
                  input::-ms-reveal,
                  input::-ms-clear {
                    display: none;
                  }
                  input::-webkit-clear-button,
                  input::-webkit-password-toggle {
                    display: none;
                    -webkit-appearance: none;
                  }
                `}</style>
              </div>
            </div>

            <div className="inline-block relative w-full">
              <label for="year">Year of Study</label>
              <select
                id="year"
                onChange={handleProfile}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800"
                required
              >
                <option disabled selected>
                  Select Year of Study
                </option>
                {years
                  .flat()
                  .filter((year, index, self) => self.indexOf(year) === index)
                  .map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>
            <div className="inline-block relative w-full">
              <label for="department">Department</label>
              <select
                id="department"
                onChange={handleProfile}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800"
                required
              >
                <option disabled selected>
                  Select Department
                </option>
                {departments
                  .flat()
                  .filter(
                    (department, index, self) =>
                      self.indexOf(department) === index
                  )
                  .map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-white">
              Already Registered ?{" "}
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
