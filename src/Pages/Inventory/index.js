import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { getInventory } from "../../API"; // Assuming you have a userAuth function in your API
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import AppFooter from "../../Components/AppFooter";

function Inventory() {
  const [userData, setUserData] = useState(null);
  const { logout, user } = UserAuth();

  // useEffect(() => {
  //   // Assuming you have a function like userAuth that fetches user information
  //   setUserData(user);
  // }, []); // Empty dependency array means this effect runs once when the component mounts
  // console.log(userData);
  // const columns = [
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //   },
  //   {
  //     title: "User ID",
  //     dataIndex: "uid",
  //     key: "uid",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Photo",
  //     dataIndex: "photo",
  //     key: "photo",
  //     render: (photo) => <Avatar src={photo} alt="User Photo" />,
  //   },
  // ];

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
        <Space>
          <div>
            <p>Email: {record.email}</p>
            <p>Name: {record.name}</p>
            <p>User ID: {record.uid}</p>
          </div>
          <img
            src={record.photo}
            alt="user"
            style={{ width: "50px", height: "50px" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <Space size={20} direction="vertical">
          <Typography.Title level={4}>Profile</Typography.Title>
          <Table columns={columns} dataSource={dataSource} />
        </Space>
      </div>
      <AppFooter />
    </div>
  );
}

export default Inventory;
