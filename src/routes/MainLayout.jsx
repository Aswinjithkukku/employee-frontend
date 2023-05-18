import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";


export default function MainLayout() {
    return (
        <main>
            <Header/>
            <Outlet />
        </main>
    );
}