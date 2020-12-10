import React, { Component } from "react";
import { connect } from "react-redux";

import { accountAuth } from "../actions/accountAction";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {
        componentDidMount() {
            this.props
                .dispatch(accountAuth())
                .then((res) => {
                    const { accountDetail } = this.props.account;
                    if (!accountDetail.loginSuccess) {
                        if (reload) {
                            // Private Route
                            this.props.history.push("/login");
                        }
                    } else {
                        if (adminRoute && accountDetail.account.type === 0) {
                            this.props.history.push("/login");
                        } else {
                            if (reload === false) {
                                // Public Route
                                this.props.history.push("/");
                            }
                        }
                    }
                })
                .catch((err) => {
                    this.props.history.push("/login");
                });
        }

        render() {
            return <ComposedClass {...this.props} user={this.props.account} />;
        }
    }
    function mapStateToProps(state) {
        return {
            account: state.account,
        };
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}