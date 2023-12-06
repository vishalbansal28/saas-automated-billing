// Import necessary components and styles
import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import AppFooter from "../../Components/AppFooter";

import "./Inventory.css"; // Import the custom stylesheet

function Inventory() {
  const { logout, user } = UserAuth();

  const dataSource = [
    {
      key: "1",
      email: user.email,
      uid: user?.uid || "N/A",
      name: user?.displayName || "N/A",
      photo: user?.photoURL || "N/A",
    },
  ];

  const columns = [
    {
      title: "Profile Information",
      dataIndex: "profile",
      key: "profile",
      render: (text, record) => (
        <Space className="profile-info">
          <Avatar src={record.photo} alt="user" size={80} />
          <div>
            <Typography.Title level={3}>{record.name}</Typography.Title>
            <p>Email: {record.email}</p>
            <p>User ID: {record.uid}</p>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="app-container">
      <AppHeader />
      <div className="content-container">
        <SideMenu />
        <div className="main-content">
          <Typography.Title level={2}>Your Profile</Typography.Title>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
          <div className="saas-info">
            <Typography.Title level={2}>About Our SAAS Software</Typography.Title>
            <Typography.Title level={3}>Data Tracking and Billing</Typography.Title>
            <p>
              Efficiently track user activities, including total duration, logins, and device information.
              Utilize powerful analytics to gain insights into user behavior and optimize your services.
            </p>
            <Typography.Title level={3}>Usage-Based Billing</Typography.Title>
            <p>
              Implement usage-based billing to ensure fair pricing for your users.
              Our system dynamically calculates costs based on actual usage, providing flexibility and transparency.
            </p>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default Inventory;
