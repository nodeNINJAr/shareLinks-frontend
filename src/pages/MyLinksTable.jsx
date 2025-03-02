import React, {useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const LinkList = () => {
  const [links, setLinks] = useState([]); // Stores fetched links
  const [editingLink, setEditingLink] = useState(null);
  const [form] = Form.useForm();
  

  // 
const {user} = useAuth();
const axiosSecure = useAxiosSecure();
 const {data:myGenLinks=[], isLoading,refetch} = useQuery({
   queryKey:['my-links'],
   enabled:!!user?.uid,
   queryFn:async()=>{
     const {data} = await axiosSecure.get(`/link/person/${user?.uid}`);
     return data
   }
 })


 console.log(myGenLinks);
  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/link/${id}`);
      refetch();
      message.success("Link deleted successfully");
    } catch (error) {
      message.error("Failed to delete link");
    }
  };

  // Handle Edit

  // Handle Save
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`/api/links/${editingLink._id}`, values);
      setLinks(links.map((link) => (link._id === editingLink._id ? { ...link, ...values } : link)));
      message.success("Link updated successfully");
      setEditingLink(null);
    } catch (error) {
      message.error("Failed to update link");
    }
  };

  // Table Columns
  const columns = [
    {
        title: "Shareable Links",
        key: "shareableLink",
        render: (_, record) => (
          <a
            href={`http://localhost:5000/link/${record.uniqueID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {`http://localhost:5000/link/${record.uniqueID}`}
          </a>
        ),
      },
    {
      title: "Content Type",
      dataIndex: "contentType",
      key: "content",
    },
    {
      title: "Access Type",
      dataIndex: "accessType",
      key: "accessType",
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Expiration Time",
        dataIndex: "expirationTime",
        key: "expirationTime",
      },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Link List</h2>
      <Table
        columns={columns}
        dataSource={myGenLinks}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Link"
        open={!!editingLink}
        onCancel={() => setEditingLink(null)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="content" label="Content" rules={[{ required: true, message: "Content is required" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="accessType" label="Access Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LinkList;
