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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!socket) return;
        else socket.emit("JOIN_ROOM");
    }, [socket]);

    const [requireMent, setRequireMent] = useState([]);

    const remove = (tableId) => {
        const newRequirement = requireMent.filter((item) => item.table._id !== tableId);
        dispatch(deleteRequirement());
        setRequireMent(newRequirement);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on("JOIN_ROOM_SUCCESS", (data) => {});
        socket.on("NOTIFICATION_SUCCESS", (data) => {
            const requirementOf = requireMent.find(
                (item) => item.table._id === data.table._id
            );
            if (!requirementOf) {
                setRequireMent([...requireMent, data]);
                dispatch(getInvoiceProduct(data));
            }
        });
        socket.on("QUANTITY_CHANGE", (data) => {
            const requirementOf = requireMent.find(
                (item) => item.table._id === data.table._id
            );
            if (requirementOf) {
                const newRequirement = data.products.map((item, index) =>
                    requirementOf.products[index] &&
                    item._id === requirementOf.products[index]._id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity + requirementOf.products[index].quantity,
                          }
                        : item
                );
                const result = requireMent.map((item) =>
                    item.table._id === data.table._id
                        ? { ...item, products: newRequirement }
                        : item
                );
                setRequireMent(result);
                dispatch(getInvoiceProduct(result[0]));
            }
            if (!requirementOf) {
                setRequireMent([...requireMent, data]);
                dispatch(getInvoiceProduct(data));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, requireMent]);

    // TODO Gửi thông báo đến nhân viên

    const sendToStaff = (id, item) => {
        message.destroy();
        const newProducts = item.products.map((item) => {
            return {
                ...item,
                status: true,
            };
        });
        socket.emit("SEND_TO_STAFF", { id, item: { ...item, products: newProducts } });
        remove(item.table._id);
        message.success({
            content: `Thông báo cho nhân viên thành công`,
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
    };

    const logOut = async () => {
        localStorage.removeItem("token");
        await dispatch(accountLogout());
        props.history.push("/login");
    };

    const handleReport = (event, item, userId, table) => {
        socket.emit("REPORT_TO_STAFF", { table, item, event, userId });
    };

    return (
        <div className="content_kitchen">
            <LeftKitchen
                socket={socket}
                sendToStaff={sendToStaff}
                requireMent={requireMent}
            />
            <RightKitchen handleReport={handleReport} />
            <Button onClick={logOut} className="btn_logOut">
                <ExportOutlined /> Đăng xuất
            </Button>
        </div>
    );
};

export default KitChen;
