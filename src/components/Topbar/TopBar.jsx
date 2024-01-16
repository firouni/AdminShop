import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import avatar from "../../p8.jpg";

export default function Topbar() {
    return (
        <div className="topBar">
        <div className="topBarWrapper">
            <div className="topLeft">
            <span className="Logo">Admin Dashboard</span>
            </div>
            <div className="topRight">
            <div className="topBarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
            </div>
            <div className="topBarIconContainer">
                <Language />
                <span className="topIconBadge">2</span>
            </div>
            <div className="topBarIconContainer">
                <Settings />
            </div>
            <img
                src={avatar}
                alt=""
                className="topAvatar"
            />
            </div>
        </div>
        </div>
    );
}
