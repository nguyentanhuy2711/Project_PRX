import React, { Component } from "react";
export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3 style={{ fontFamily: "fantasy" }}>Sign Up</h3>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right" style={{ textAlign: "center" }}>
                    Already registered <a href="#">Sign in?</a>
                </p>
            </form>
        );
    }
}