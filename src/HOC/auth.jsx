import React, { Component } from "react";
import { connect } from "react-redux";

import { accountAuth } from "../actions/accountAction";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {
        state = { loading: true };
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
                        if (accountDetail.staff.account.type === 2) {
                            this.props.history.push("/kitchen");
                        } else {
                            if (reload === false) {
                                // Public Route
                                this.props.history.push("/kitchen");
                            }
                        }
                    }
                    this.setState({ loading: false });
                })
                .catch((err) => {
                    this.props.history.push("/login");
                    this.setState({ loading: false });
                });
        }
        componentWillUnmount() {
            this.setState({ loading: false });
        }
        render() {
            if (this.state.loading) return <div>Loading......</div>;
            return <ComposedClass {...this.props} />;
        }
    }
    function mapStateToProps(state) {
        return {
            account: state.account,
        };
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}
