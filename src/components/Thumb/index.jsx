import { Image, Space } from "antd";
import React, { useEffect, useState } from "react";

const Thumb = ({ file }) => {
    const [loading, setLoading] = useState(true);
    const [thumb, setThumb] = useState(undefined);

    useEffect(() => {
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onloadend = () => {
            setLoading(false);
            setThumb(reader.result);
        };
        reader.readAsDataURL(file);
        return () => {
            setThumb(undefined);
        };
    }, [file]);

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
};

export default Thumb;
