import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Space,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  notification,
  Avatar,
  Badge,
} from "antd";
import { getPayments } from "../../API"; // Assume you have an API function to fetch payments

const { Option } = Select;

const Payments = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(false);
    getPayments().then((res) => {
      setDataSource(res.payments);
      setLoading(false);
    });
  }, []);

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
        // Add your logic to save the new payment to the database
        notification.success({ message: "Payment added successfully!" });
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const columns = [
    {
      title: "Client Photo",
      dataIndex: "clientPhoto",
      render: (link) => <Avatar src={link} />,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
    },
    {
      title: "Property",
      dataIndex: "property",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => <span>$ {amount}</span>,
    },
    {
      title: "Payment Date",
      dataIndex: "payment_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Badge
          status={status === "paid" ? "success" : "warning"}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
    },
  ];

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
            <Typography.Title level={4}>Payments</Typography.Title>
            <Button
              style={{ width: "max-content", marginBottom: ".75em" }}
              type="primary"
              onClick={showModal}
            >
              Add Payment
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
        title="Add New Payment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="paymentForm">
          <Form.Item
            name="clientName"
            label="Client Name"
            rules={[
              { required: true, message: "Please input the client's name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="property"
            label="Property"
            rules={[{ required: true, message: "Please input the property!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="paymentDate"
            label="Payment Date"
            rules={[
              { required: true, message: "Please select the payment date!" },
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
              <Option value="paid">Paid</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Payments;
