import React, { useState, useEffect } from "react";
import { Modal, Input, Upload, Button, Checkbox, DatePicker, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateLinkModal = ({ visible, onClose, linkData,refetch }) => {
  const axiosSecure = useAxiosSecure();
  // 
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      textContent:
        linkData?.contentType === "text/plain; charset=utf-8"
          ? linkData?.content
          : "",
      files: [],
      accessType: linkData?.accessType || "public",
      password: "",
      expirationTime: linkData?.expirationTime
        ? dayjs(linkData.expirationTime)
        : null,
    },
  });

  //  
  const [fileList, setFileList] = useState([]);
  const textContent = watch("textContent");
  const accessType = watch("accessType");
  
  // 
  useEffect(() => {
    if (linkData) {
      setValue(
        "textContent",
        linkData?.contentType === "text/plain; charset=utf-8"
          ? linkData?.content
          : ""
      );
      setValue("accessType", linkData.accessType || "public");
      setValue(
        "expirationTime",
        linkData?.expirationTime ? dayjs(linkData.expirationTime) : null
      );
    }
  }, [linkData, setValue]);
  

  // 
  const handleFileUpload = ({ fileList }) => {
    setFileList(fileList);
    setValue("files", fileList.map((file) => file.originFileObj));
  };

  // ** Submit data
  const onSubmit = async (data) => {
    const expirationTime = data?.expirationTime? dayjs(data.expirationTime).format("YYYY-MM-DD HH:mm:ss") : null;
    //
    const formData = new FormData();
    formData.append("textContent", data.textContent || "");
    formData.append("accessType", data.accessType || "public");
    formData.append("password", data.password || "");
    formData.append("expirationTime", expirationTime || "");
  
    if (data?.files?.[0]) {
      formData.append("file", data.files[0]);
    }
    // 
    try {
      const response = await axiosSecure.patch(`/link/${linkData?._id}/update`, formData);
      console.log(response.data);
      refetch();
      message.success("Link updated successfully");
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      message.error("Failed to update link");
    }
    onClose();
  };
  

  // 
  return (
    <Modal
      title="Update Shareable Link"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Text Content */}
        <Controller
          name="textContent"
          control={control}
          rules={{
            validate: (value) =>
              (!value || fileList.length === 0) ||
              "You can only use text or files, not both.",
          }}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              rows={4}
              placeholder="Write your text content..."
              disabled={fileList.length > 0}
            />
          )}
        />
        {errors.textContent && (
          <p className="text-red-500">{errors.textContent.message}</p>
        )}

        {/* File Upload */}
        <Upload
          fileList={fileList}
          onChange={handleFileUpload}
          beforeUpload={() => false}
          maxCount={1}
          disabled={!!textContent}
        >
          <Button icon={<UploadOutlined />} disabled={!!textContent}>
            Upload File
          </Button>
        </Upload>

        {/* Access Type Checkbox */}
        <div className="flex justify-between items-center">
          <Controller
            name="accessType"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value === "public"}
                onChange={(e) => {
                  setValue("accessType", e.target.checked ? "public" : "private");
                  if (e.target.checked) setValue("password", ""); 
                }}
              >
                Public
              </Checkbox>
            )}
          />

          {/* Password Input (only if private) */}
          {accessType === "private" && (
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required for private access.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
                pattern: {
                  value: /^(?=.*\d).{6,}$/,
                  message: "Password must contain at least one number.",
                },
              }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Enter password" />
              )}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {/* Expiration Time Picker */}
        <Controller
          name="expirationTime"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select expiration time"
              style={{ width: "100%" }}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />

        {/* Submit Button */}
        <Button type="primary" htmlType="submit" block>
          Update Link
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateLinkModal;
