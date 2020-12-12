import { ExportOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { accountLogout } from "../../actions/accountAction";
import LeftKitchen from "../../components/Left_Right_Kitchen/left";
import RightKitchen from "../../components/Left_Right_Kitchen/right";

const KitChen = (props) => {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const [requireMent, setRequireMent] = useState([]);
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

    const logOut = async () => {
        localStorage.removeItem("token");
        await dispatch(accountLogout());
        props.history.push("/login");
    };

    useEffect(() => {
        setupSocket();
        return () => {
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit("JOIN_ROOM");
        socket.on("JOIN_ROOM_SUCCESS", (data) => {});
        socket.on("NOTIFICATION_SUCCESS", (data) => {
            const requirementOf = requireMent.findIndex(
                (item) => item.table._id === data.table._id
            );
            if (requirementOf >= 0) {
                const requirementIndex = requireMent.find(
                    (item) => item.table._id === data.table._id
                );
                requirementIndex.products = data.products;
                setRequireMent([
                    ...requireMent.slice(0, requirementOf),
                    { ...requirementIndex },
                    ...requireMent.slice(requirementOf + 1),
                ]);

                message.success({
                    content: `${data.table.name} có thay đổi`,
                    style: {
                        position: "relative",
                        top: 10,
                        right: "-80vh",
                    },
                });
            } else {
                setRequireMent([...requireMent, data]);
            }
        });
    }, [socket, requireMent]);

    return (
        <div className="content_kitchen">
            <LeftKitchen socket={socket} requireMent={requireMent} />
            <RightKitchen />
            <Button onClick={logOut} className="btn_logOut">
                <ExportOutlined /> Đăng xuất
            </Button>
        </div>
    );
};

export default KitChen;
