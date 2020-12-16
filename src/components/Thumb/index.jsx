import React, { Component } from "react";
import { Image, Space } from "antd";

class Thumb extends Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    componentWillUnmount() {
        this.setState({ loading: false, thumb: undefined });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) {
            return null;
        }

        if (loading) {
            return <p>loading...</p>;
        }

        return (
            <Space size={5} className="wrapper_image">
                <Image width={150} height={150} src={thumb} alt={file.name} />
            </Space>
        );
    }
}

export default Thumb;
