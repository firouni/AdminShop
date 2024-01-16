import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import { userRequest } from "../../requestMethods";
import { Visibility } from "@mui/icons-material";

const WidgetSm = () => {
    const [users, setUsers] = useState([]);
    const PF = "http://localhost:5000/images/";

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("users/?new=true");
                setUsers(res.data);
            } catch { }
        };
        getUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map((user) => (
                    <li className="widgetSmListItem" key={user._id}>
                        <img
                            src={PF + user.avatar ||
                "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=626&ext=jpg&ga=GA1.1.1311233209.1702124553&semt=ais"}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default WidgetSm