import React, { useEffect, useState } from "react";
import { Avatar, Rate, Space, Table, Typography } from "antd";
import { getReviews } from "../../API";

function Reviews() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getReviews()
      .then((res) => {
        console.log("API Response:", res); // Log the response to see the structure
        setDataSource(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Realtor Reviews</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Property ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Timestamp",
            dataIndex: "created_at",
            key: "created_at",
          },
          {
            title: "Comment",
            dataIndex: "comment",
            key: "comment",
          },
          {
            title: "Agent ID",
            dataIndex: "agent_id",
            key: "agent_id",
          },
          {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            render: (rating) => <Rate value={rating} allowHalf enabled />,
          },
        ]}
        dataSource={dataSource.map((item) => ({ ...item, key: item.id }))} // Add key for each item
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Reviews;
