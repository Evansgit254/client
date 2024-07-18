import React, { useEffect, useState } from "react";
import {
  Avatar,
  Rate,
  Space,
  Table,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { getHouses, addHouse, updateHouse, deleteHouse } from "../../API";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function Houses() {
  const [body, setBody] = useState({
    property_type: "",
    id: "",
    title: "",
    price: "",
    city: "",
    street_address: "",
    description: "",
    leasing_terms: "",
  });
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentHouse, setCurrentHouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(false);
    getHouses().then((res) => {
      setDataSource(res);
      setFilteredData(res);
      setLoading(false);
    });
  }, []);

  const showModal = () => {
    setIsEdit(false);
    setCurrentHouse(null);
    setIsModalVisible(true);
  };

  const showEditModal = (house) => {
    setIsEdit(true);
    setCurrentHouse(house);
    form.setFieldsValue(house);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFinish = (values) => {
    setLoading(true);
    if (isEdit) {
      updateHouse(currentHouse.id, values)
        .then((res) => {
          const updatedData = dataSource.map((house) =>
            house.id === currentHouse.id ? res : house
          );
          setDataSource(updatedData);
          setFilteredData(updatedData);
          setLoading(false);
          setIsModalVisible(false);
          message.success("House updated successfully!");
        })
        .catch((error) => {
          console.error("Failed to update house:", error);
          setLoading(false);
          message.error("Failed to update house.");
        });
    } else {
      addHouse(values)
        .then((res) => {
          setDataSource((prevData) => [...prevData, res]);
          setFilteredData((prevData) => [...prevData, res]);
          setLoading(false);
          setIsModalVisible(false);
          message.success("House added successfully!");
        })
        .catch((error) => {
          console.error("Failed to add a new house:", error);
          setLoading(false);
          message.error("Failed to add house.");
        });
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteHouse(id)
      .then(() => {
        const updatedData = dataSource.filter((house) => house.id !== id);
        setDataSource(updatedData);
        setFilteredData(updatedData);
        setLoading(false);
        message.success("House deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete house:", error);
        setLoading(false);
        message.error("Failed to delete house.");
      });
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filtered = dataSource.filter((house) =>
      Object.values(house).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
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
        <Typography.Title level={4}>Houses</Typography.Title>
        <Input
          placeholder="Search houses"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
        <Button
          style={{ width: "max-content", marginBottom: ".75em" }}
          type="primary"
          onClick={showModal}
        >
          Add New House
        </Button>
      </div>
      <Table
        loading={loading}
        columns={[
          {
            title: "Property ID",
            dataIndex: "id",
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>Ksh.{value}</span>,
          },
          {
            title: "Property Type",
            dataIndex: "property_type",
          },
          {
            title: "City",
            dataIndex: "city",
          },
          {
            title: "Street Address",
            dataIndex: "street_address",
          },
          {
            title: "Description",
            dataIndex: "description",
          },
          {
            title: "Leasing Terms",
            dataIndex: "leasing_terms",
          },
          {
            title: "Actions",
            render: (text, record) => (
              <Space size="middle">
                <Button type="primary" onClick={() => showEditModal(record)}>
                  Edit
                </Button>
                <Button type="primary" onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData}
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        title={isEdit ? "Edit House" : "Add New House"}
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="houseForm"
          onFinish={handleFinish}
        >
          <Form.Item
            name="property_type"
            label="Property Type"
            rules={[
              { required: true, message: "Please select the property type!" },
            ]}
          >
            <Select placeholder="Select property type">
              <Option value="Family Houses">Family House</Option>
              <Option value="Villas">House & Villa</Option>
              <Option value="Apartment">Apartment</Option>
              <Option value="Office & Studio">Office & Studio</Option>
              <Option value="Villa & Condo">Villa & Condo</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price Range"
            rules={[
              { required: true, message: "Please input the price range!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please select the city!" }]}
          >
            <Select placeholder="Select city">
              <Option value="Nairobi">Nairobi</Option>
              <Option value="Kisumu">Kisumu</Option>
              <Option value="Mombasa">Mombasa</Option>
              <Option value="Nakuru">Nakuru</Option>
              <Option value="Thika">Thika</Option>
              <Option value="Eldoret">Eldoret</Option>
              <Option value="Kiambu">Kiambu</Option>
              <Option value="Naivasha">Naivasha</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="street_address"
            label="Street Address"
            rules={[
              { required: true, message: "Please input the street address!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="leasing_terms"
            label="Leasing Terms"
            rules={[
              { required: true, message: "Please select the leasing terms!" },
            ]}
          >
            <Select placeholder="Select leasing terms">
              <Option value="For Sale">For Sale</Option>
              <Option value="For Rent">For Rent</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}

export default Houses;
