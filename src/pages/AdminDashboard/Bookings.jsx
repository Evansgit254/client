import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Space,
  Button,
  Badge,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import axios from "axios";
import { useAuth } from "../../context/contextApi";

const { Option } = Select;

const Bookings = () => {
  const { accessToken, refreshAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    getBookings()
      .then((res) => {
        console.log("Full Response Data:", res.data); // Log the full response data
        const results = res.data.results || []; // Handle case where results may be undefined

        if (Array.isArray(results)) {
          setDataSource(results);
        } else {
          console.error("Unexpected response data format:", results);
          message.error("Failed to fetch bookings. Unexpected response format.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch bookings:", error);
        setLoading(false);
        message.error("Failed to fetch bookings.");
      });
  }, []);

  const getBookings = () => {
    return axios
      .get("", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Correct template literal
        },
      })
      .then((response) => {
        // Check the response and extract results
        console.log("Full Response Data:", response.data);
        const results = response.data.results || []; // Default to empty array if results are missing
        return { data: { results } };
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return getBookings(); // Retry fetching bookings after refreshing the token
        }
        throw error; // Rethrow the error if not handled
      });
  };

  const columns = [
    {
      title: "Product Id",
      dataIndex: "id",
      // render: (link) => <Avatar src={link} />,
    },
    {
      title: "Booking Date",
      dataIndex: "Booking Date",
    },
    {
      title: "Property",
      dataIndex: "property",
    },
    {
      title: "User",
      dataIndex: "user",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Badge
          status={status === "active" ? "success" : "default"}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values: ", values);
        // Add your logic to save the new booking to the database
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div style={{ overflowX: "scroll", overflowY: "auto", padding: ".5em 0" }}>
      <div style={{ width: "max-content" }}>
        <Space size={20} direction="vertical">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: ".75em 0",
            }}
          >
            <Typography.Title level={4}>Bookings</Typography.Title>
            <Button
              style={{ width: "max-content", marginBottom: ".75em" }}
              type="primary"
              onClick={showModal}
            >
              Add Booking
            </Button>
          </div>
          <Table
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
          />
        </Space>
      </div>

      <Modal
        title="Add New Booking"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="bookingForm">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="property"
            label="Property Type"
            rules={[
              { required: true, message: "Please select the property type!" },
            ]}
          >
            <Select placeholder="Select a property type">
              <Option value="Apartment">Apartment</Option>
              <Option value="House">House</Option>
              <Option value="Villa">Villa</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="bookingDate"
            label="Booking Date"
            rules={[
              { required: true, message: "Please select the booking date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select placeholder="Select a status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Bookings;
