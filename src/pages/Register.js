import React from 'react';

function Register() {
  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-header">
          <h4 className="mb-0">Register</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Create Password" />
            </div>
            <button type="submit" className="btn btn-success w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;