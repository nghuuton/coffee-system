import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import LeftKitchen from "../../components/Left_Right_Kitchen/left";
import RightKitchen from "../../components/Left_Right_Kitchen/right";

const KitChen = () => {
    const [socket, setSocket] = useState(null);
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

    useEffect(() => {
        setupSocket();
        return () => {
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit("JOIN_ROOM");
        socket.on("JOIN_ROOM_SUCCESS", (data) => {
            console.log(data);
        });
        socket.on("NOTIFICATION_SUCCESS", (data) => {
            console.log(data);
            setRequireMent(data);
        });
    }, [socket, requireMent]);

    return (
        <div className="content_kitchen">
            <LeftKitchen socket={socket} requireMent={requireMent} />
            <RightKitchen />
        </div>
    );
};

export default KitChen;
