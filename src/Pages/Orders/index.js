import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { getInventory, getOrders } from "../../API";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import AppFooter from "../../Components/AppFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const { logOut, user } = UserAuth();
  const userEmail = user.email;
  const history = useNavigate();

  console.log(userEmail);
  // useEffect(() => {
  //   setLoading(true);
  //   getOrders().then((res) => {
  //     setDataSource(res.products);
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data for userEmail:", userEmail);

        const response = await axios.get(
          `http://localhost:5000/product/${userEmail}`
        );

        console.log("Response data:", response.data);

        setDataSource(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);
  console.log(dataSource);
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
      title: "DiscountedPrice",
      dataIndex: "discountedPrice",
      render: (value) => <span>${value}</span>,
    },
    {
      title: "Duration Used(hr)",
      dataIndex: "durationUsed",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (value) => <span>${value}</span>,
    },
  ];

  const generatePDF = async () => {
    const pdf = new jsPDF();

    // Set a larger font size for the heading
    pdf.setFontSize(18);
    pdf.text("SAAS Software Billing Info Invoice", 20, 20);

    // Set font size back to normal for the table
    pdf.setFontSize(12);

    // Calculate the height of the heading to determine the starting point for the table
    const headingHeight =
      20 + pdf.getTextDimensions("SAAS Software Billing Info Invoice").h + 10;

    const bodyData = dataSource.map((row) =>
      columns.map((col) =>
        col.dataIndex === "total"
          ? `$${row[col.dataIndex]}`
          : row[col.dataIndex]
      )
    );

    const totalSum = dataSource.reduce((sum, row) => sum + row.total, 0);

    // Add an extra row for the total sum
    bodyData.push(["", "", "", "", `Total: $${totalSum}`]);

    // Start the table below the heading
    pdf.autoTable({
      startY: headingHeight,
      head: [columns.map((col) => col.title)],
      body: bodyData,
    });

    pdf.save("order_summary.pdf");

    // try {
    //   const response = await fetch(
    //     "https://hooks.zapier.com/hooks/catch/17241597/3fmdovu/",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       // Include any data you want to send to Zapier in the request body
    //       body: JSON.stringify({
    //         userEmail,
    //         totalSum,
    //         // Add other relevant data for the email
    //       }),
    //     }
    //   );

    //   if (response.ok) {
    //     console.log("Zapier webhook triggered successfully!");
    //     // Redirect the user after triggering the Zap
    //     history.push("/success"); // Update with the desired route
    //   } else {
    //     console.error("Failed to trigger Zapier webhook:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error triggering Zapier webhook:", error.message);
    // }

    try {
      await axios.post(
        "https://hooks.zapier.com/hooks/catch/17241597/3fmdovu/",
        {
          email: "abhiramtripathipanna@gmail.com", // Replace with the recipient's email
          subject: "Invoice for SaaS Usage", // Replace with your email subject
          attachment: pdf.output("datauristring"), // Include the PDF as a data URI
        }
      );

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
        <Space size={20} direction="vertical">
          <Typography.Title level={4}>Orders</Typography.Title>
          <Table
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 5,
            }}
          />
          <button onClick={generatePDF}>Download Bill</button>
        </Space>
      </div>
      <AppFooter />
    </div>
  );
}
export default Orders;
