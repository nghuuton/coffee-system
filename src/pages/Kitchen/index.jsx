import { ExportOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { accountLogout } from "../../actions/accountAction";
import { deleteRequirement, getInvoiceProduct } from "../../actions/invoiceAction";
import LeftKitchen from "../../components/Left_Right_Kitchen/left";
import RightKitchen from "../../components/Left_Right_Kitchen/right";

const KitChen = (props) => {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const setupSocket = () => {
        const token = localStorage.getItem("token");
        if (token && !socket) {
            const newSocket = io("http://localhost:3001", {
                query: {
                    token: `${token}`,
                },
            });

            newSocket.on("connect", () => {
                console.log("Socket Ready");
            });
            newSocket.on("disconnect", () => {
                setSocket(null);
            });
            setSocket(newSocket);
        }
    };

    useEffect(() => {
        setupSocket();
        return () => {
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        else socket.emit("JOIN_ROOM");
    }, [socket]);

    const logOut = async () => {
        localStorage.removeItem("token");
        await dispatch(accountLogout());
        props.history.push("/login");
    };

    return (
        <div className="content_kitchen">
            <LeftKitchen socket={socket} />
            <RightKitchen />
            <Button onClick={logOut} className="btn_logOut">
                <ExportOutlined /> Đăng xuất
            </Button>
        </div>
    );
};

export default KitChen;
