import React, { Component } from 'react';
import './login.css';


export default class Login extends Component {
    render() {
        return (
            <div>
                <form>
                    <h3 style={{ fontFamily: "fantasy" }}>Sign In</h3>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="form-group row">
                        <div className="custom-control custom-checkbox ">
                            <div style={{ width: "150px", float: "left" }}>
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>

                </form>
            </div>
        )
    }
}
