import {
  FieldTimeOutlined,
  TransactionOutlined,
  LoginOutlined,
  WindowsOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import AppFooter from "../../Components/AppFooter";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [features, setFeatures] = useState([]);
  const { logOut, user } = UserAuth();
  const userEmail = user.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data/${userEmail}`
        );
        setUserData(response.data);
        setFeatures(response.data.featuresUsed || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(userData.totalDuration);
      setRevenue(userData.deviceInfo);
    });
    getInventory().then((res) => {
      setInventory(userData.totalTransactions);
    });
    getCustomers().then((res) => {
      setCustomers(userData.logins);
    });
  }, [userData]);

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <Space size={20} direction="vertical">
          <p style={{ fontSize: "30px", fontWeight: "bolder" }}>
            Welcome, {user?.displayName}
          </p>
          <Space direction="horizontal">
            <DashboardCard
              icon={
                <FieldTimeOutlined
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0,255,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Total Duration (hrs)"}
              value={userData.totalDuration}
            />
            <DashboardCard
              icon={
                <TransactionOutlined
                  style={{
                    color: "blue",
                    backgroundColor: "rgba(0,0,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Total Transactions"}
              value={userData.totalTransactions}
            />
            <DashboardCard
              icon={
                <LoginOutlined
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(0,255,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Logins"}
              value={userData.logins}
            />
            <DashboardCard
              icon={
                <WindowsOutlined
                  style={{
                    color: "red",
                    backgroundColor: "rgba(255,0,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Device Info"}
              value={userData.deviceInfo}
            />
            <DashboardCard
              icon={
                <GlobalOutlined
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(0,255,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Location"}
              value={userData.location}
            />
          </Space>
          <Space>
            <RecentOrders features={features} />
            <DashboardChart />
          </Space>
        </Space>
      </div>
      <AppFooter />
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders({ features }) {
  return (
    <>
      <Typography.Text>
        <b>Features Used</b>
      </Typography.Text>
      <Table
        style={{ width: "300px" }}
        columns={[
          {
            title: "Features",
            dataIndex: "features",
            render: () => (
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            ),
          },
        ]}
        dataSource={[{ features }]}
        pagination={false}
      />
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "SAAS Usage",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Usage",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
