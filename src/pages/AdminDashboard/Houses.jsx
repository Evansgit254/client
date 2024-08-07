import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { useAuth } from "../../context/contextApi";

const { Option } = Select;

const Houses = () => {
  const { accessToken, refreshAccessToken } = useAuth();
  const [body, setBody] = useState({
    id: "",
    user: "",
    title: "",
    slug: "",
    ref_code: "",
    description: "",
    country: "",
    city: "",
    postal_code: "",
    street_address: "",
    property_number: "",
    price: "",
    tax: "",
    final_property_price: "",
    plot_area: "",
    total_floors: "",
    bedrooms: "",
    bathrooms: "",
    advert_type: "",
    property_type: "",
    cover_photo: "",
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
    setLoading(true);
    getHouses()
      .then((res) => {
        console.log("Response Data:", res.data);
        const results = res.data.results; // Extract the results array
        if (Array.isArray(results)) {
          setDataSource(results);
          setFilteredData(results);
        } else {
          console.error("Unexpected response data format:", results);
          message.error("Failed to fetch houses. Unexpected response format.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch houses:", error);
        setLoading(false);
        message.error("Failed to fetch houses.");
      });
  }, []);

  const getHouses = () => {
    return axios
      .get("http://127.0.0.1:8000/api/v1/properties/all/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return getHouses();
        }
        throw error;
      });
  };

  const addHouse = (house) => {
    return axios
      .post("http://127.0.0.1:8000/api/v1/properties/create/", house, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return addHouse(house);
        }
        throw error;
      });
  };

  const updateHouse = (id, house) => {
    return axios
      .put(`http://127.0.0.1:8000/api/v1/properties/update/${id}/`, house, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return updateHouse(id, house);
        }
        throw error;
      });
  };

  const deleteHouse = (id) => {
    return axios
      .delete(`http://127.0.0.1:8000/api/v1/properties/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          await refreshAccessToken();
          return deleteHouse(id);
        }
        throw error;
      });
  };

  const showModal = () => {
    setIsEdit(false);
    setCurrentHouse(null);
    form.resetFields(); // Reset form fields when adding a new house
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
            house.id === currentHouse.id ? res.data : house
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
          setDataSource((prevData) => [...prevData, res.data]);
          setFilteredData((prevData) => [...prevData, res.data]);
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
            title: "Description",
            dataIndex: "description",
          },
          {
            title: "Country",
            dataIndex: "country",
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
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Advert type",
            dataIndex: "advert_type",
          },
          {
            title: "Property Type",
            dataIndex: "property_type",
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
        open={isModalVisible}
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
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please enter the house description" },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description!" }]}
          >
            <Input placeholder="Enter country" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please enter the country!" }]}
          >
            <Input placeholder="Enter price" />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please enter the city" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="street_address"
            label="Street Address"
            rules={[
              { required: true, message: "Please enter the street address" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter the price!" },
            ]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="advert_type"
            label="Advert Type"
            rules={[
              { required: true, message: "Please select the advert type" },
            ]}
          >
            <Select placeholder="Select advert type">
              <Option value="For Rent"> For Rent</Option>
              <Option value="For Sale">For Sale</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="property_type"
            label="Property Type"
            rules={[
              { required: true, message: "Please select the property type!" },
            ]}
          >
            <Select placeholder="Select property type">
              <Option value="Family Houses">Family House</Option>
              <Option value="Villas">Villas</Option>
              <Option value="Apartment">Apartment</Option>
              <Option value="Offices">Offices</Option>
              <Option value="Condos">Condo</Option>
              <Option value="Boardrooms">Boardrooms</Option>
              <Option value="Studio">Studios</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default Houses;
