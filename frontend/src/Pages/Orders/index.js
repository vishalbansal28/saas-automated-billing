// Orders.js

import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import AppFooter from "../../Components/AppFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";

import "./Orders.css"; // Import the custom stylesheet

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const { logOut, user } = UserAuth();
  const userEmail = user.email;
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${userEmail}`
        );
        setDataSource(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const columns = [
    {
      title: "Features",
      dataIndex: "features",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => <span>${value}</span>,
    },
    {
      title: "Discounted Price",
      dataIndex: "discountedPrice",
      render: (value) => <span>${value}</span>,
    },
    {
      title: "Duration Used (hr)",
      dataIndex: "durationUsed",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (value) => <span>${value}</span>,
    },
  ];

  const generatePDF = async () => {
    const userEmail = user.email; // Assuming `user` is defined somewhere in your component
  
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("SAAS Software Billing Info Invoice", 20, 20);
    pdf.setFontSize(12);
  
    const bodyData = dataSource.map((row) =>
      columns.map((col) =>
        col.dataIndex === "total" ? `$${row[col.dataIndex]}` : row[col.dataIndex]
      )
    );
  
    const totalSum = dataSource.reduce((sum, row) => sum + row.total, 0);
    bodyData.push(["", "", "", "", `Total: $${totalSum}`]);
  
    const headingHeight =
      20 + pdf.getTextDimensions("SAAS Software Billing Info Invoice").h + 10;
  
    pdf.autoTable({
      startY: headingHeight,
      head: [columns.map((col) => col.title)],
      body: bodyData,
    });
  
    pdf.save("order_summary.pdf");
  
    try {
      await axios.post("https://hooks.zapier.com/hooks/catch/17247094/3f1bh6y/", {
        email: userEmail,
        subject: "Invoice for SaaS Usage",
        attachment: pdf.output("datauristring"),
      });
  
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div className="main-content">
          <Typography.Title level={2}>Your Orders</Typography.Title>
          <Table
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 5,
            }}
          />
          <button onClick={generatePDF}>Download Bill</button>

          <div className="explanation">
            <Typography.Title level={3}>How We Calculate Your Orders</Typography.Title>
            <p>
              Each order includes features, duration used, price, discounted price, and total cost.
              The table above shows a detailed breakdown of your orders.
            </p>
            <p>
              To download the bill, click the "Download Bill" button. This will generate a PDF invoice
              containing a summary of your orders, including the total cost.
            </p>
            <Typography.Title level={3}>Email Notification</Typography.Title>
            <p>
              Additionally, a notification email will be sent to your registered email
              address once the download is complete.
            </p>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default Orders;
