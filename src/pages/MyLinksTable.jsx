import React, {useState } from "react";
import { Table, Button,Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UpdateLinkModal from "../components/UpdateLinkModal";

const LinkList = () => {
  const [editingLink, setEditingLink] = useState(null);
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
  const handleEdit = (record) => {
    setEditingLink(record);
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
          <UpdateLinkModal refetch={refetch} linkData={editingLink} visible={!!editingLink} onClose={() => setEditingLink(null)}/>
   
    </div>
  );
};

export default LinkList;
