import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Space,
  Button,
  Badge,
  Avatar,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { getBookings } from "../../API"; // Assume you have an API function to fetch bookings
import { BsPersonCircle } from "react-icons/bs";

const { Option } = Select;

const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(false);
    getBookings().then((res) => {
      setDataSource(res.bookings);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: "Photo",
      dataIndex: "clientPhoto",
      render: (link) => <Avatar src={link} />,
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Property-Type",
      dataIndex: "property",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
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
