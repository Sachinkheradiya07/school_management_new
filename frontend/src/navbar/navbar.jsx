import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/admin"
                >
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="faculty">
                  Faculty
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="/student">
                  student
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
