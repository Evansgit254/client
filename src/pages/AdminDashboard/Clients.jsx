import React, { useState, useEffect } from "react";
import {
  Upload,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../context/contextApi";
function Clients() {
  const { accessToken, refreshAccessToken } = useAuth();
  const [body, setBody] = useState({
    profile_photo: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  useEffect(() => {
    setLoading(true);
    getClients()
      .then((res) => {
        console.log("Response Data:", res.data);
        const results = res.data.results; // Extract the results array
        if (Array.isArray(results)) {
          setDataSource(results);
          setFilteredData(results);
        } else {
          console.error("Unexpected response data format:", results);
          message.error("Failed to fetch clients. Unexpected response format.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
        setLoading(false);
        message.error("Failed to fetch clients.");
      });
  }, []);
  const getClients = () => {
    return axios
      .get("localhost:8000/api/v1/auth/users/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return getClients();
        }
        throw error;
      });
  };

  const addClient = (client) => {
    return axios
      .post("localhost:8000/api/v1/auth/users/", client, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return addClient;
        }
        throw error;
      });
  };

  const updateClient = (id, client) => {
    return axios
      .put(`/update/${id}/`, client, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return updateClient(id, client);
        }
        throw error;
      });
  };

  const deleteClient = (id) => {
    return axios
      .delete(`/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return deleteClient(id);
        }
        throw error;
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingClient(null);
    setBody({
      profile_photo: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
    });
    form.resetFields();
  };

  const handleFinish = (values) => {
    setLoading(false);
    if (editingClient) {
      updateClient(editingClient.id, values)
        .then((res) => {
          setDataSource(
            dataSource.map((client) =>
              client.id === editingClient.id ? res : client
            )
          );
          setFilteredData(
            filteredData.map((client) =>
              client.id === editingClient.id ? res : client
            )
          );
          message.success("Client updated successfully!");
          setEditingClient(null);
        })
        .catch((error) => {
          console.error("Failed to update client:", error);
          message.error("Failed to update client!");
        });
    } else {
      addClient(values)
        .then((res) => {
          setDataSource([...dataSource, res]);
          setFilteredData([...filteredData, res]);
          message.success("Client added successfully!");
        })
        .catch((error) => {
          console.error("Failed to add client:", error);
          message.error("Failed to add client!");
        });
    }
    setLoading(false);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingClient(record);
    form.setFieldsValue(record);
    showModal();
  };

  const handleDelete = (id) => {
    setLoading(false);
    deleteClient(id)
      .then(() => {
        setDataSource(dataSource.filter((client) => client.id !== id));
        setFilteredData(filteredData.filter((client) => client.id !== id));
        message.success("Client deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete client:", error);
        message.error("Failed to delete client!");
      });
    setLoading(false);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filtered = dataSource.filter((client) =>
      Object.values(client).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
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
            <Typography.Title level={4}>Clients</Typography.Title>
            <Input
              placeholder="Search clients"
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: "300px" }}
            />
            <Button
              style={{ width: "max-content", marginBottom: ".75em" }}
              type="primary"
              onClick={showModal}
            >
              Add New Client
            </Button>
          </div>
          <Table
            loading={loading}
            columns={[
              {
                title: "Profile Photo",
                dataIndex: "profile_photo",
              },
              {
                title: "First Name",
                dataIndex: "first_name",
              },
              {
                title: "Last Name",
                dataIndex: "last_name",
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Username",
                dataIndex: "username",
              },
              {
                title: "Action",
                render: (text, record) => (
                  <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                      Delete
                    </Button>
                  </Space>
                ),
              },
            ]}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
          />
        </Space>
      </div>

      <Modal
        title={editingClient ? "Edit Client" : "Add New Client"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          form={form}
          initialValues={editingClient || body}
        >
          <Form.Item
            name="profile_photo"
            label="Profile Photo"
            rules={[
              { required: true, message: "Please upload a profile photo" },
            ]}
          >
            <Upload name="profile_photo">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username" }]}
          >
            <Input
              name="username"
              value={body.username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: "Please input the first name" }]}
          >
            <Input
              name="first_name"
              value={body.first_name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name" }]}
          >
            <Input
              name="last_name"
              value={body.last_name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input name="email" value={body.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingClient ? "Update Client" : "Create Client"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Clients;
