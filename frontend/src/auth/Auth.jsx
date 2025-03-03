import React, { useState } from "react";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    userType: "",
    age: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API call or authentication logic here
  };

  return (
    <div
      className="card p-4 shadow-lg border-0 mx-auto"
      style={{
        maxWidth: "400px",
        width: "100%",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
      }}
    >
      <h2 className="text-center mb-3 text-primary fw-bold">
        {isRegister ? "Sign Up" : "Login"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row gy-3">
          {isRegister && (
            <>
              <div className="col-12">
                <input
                  type="text"
                  name="fullName"
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="username"
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="col-12">
            <input
              type="email"
              name="email"
              className="form-control rounded-pill shadow-sm"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <input
              type="password"
              name="password"
              className="form-control rounded-pill shadow-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {isRegister && (
            <>
              <div className="col-12">
                <select
                  name="userType"
                  className="form-select rounded-pill shadow-sm"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="col-12">
                <input
                  type="number"
                  name="age"
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <input
                  type="file"
                  name="profilePic"
                  className="form-control rounded-pill shadow-sm"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill shadow-sm fw-bold"
              style={{ padding: "10px" }}
            >
              {isRegister ? "Sign Up" : "Login"}
            </button>
          </div>
          <div className="col-12 text-center">
            <p
              className="text-primary mt-3 fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
