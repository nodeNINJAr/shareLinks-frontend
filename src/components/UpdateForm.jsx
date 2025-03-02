import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Upload, Button, Input, message, Card, Checkbox, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const UpdateForm = ({ initialData, onUpdateSuccess }) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      textContent: initialData?.textContent || '',
      files: initialData?.files || [],
      accessType: initialData?.accessType || 'private', // Default to private
      password: initialData?.password || '',
      expirationTime: initialData?.expirationTime || null,
    },
  });

  const [fileList, setFileList] = useState(initialData?.files || []);
  const [loading, setLoading] = useState(false);

  // Watching the fields
  const textContent = watch('textContent');
  const accessType = watch('accessType');

  // Handle file selection
  const handleFileUpload = ({ fileList }) => {
    setFileList(fileList);
    setValue('files', fileList);

    // If files are uploaded, clear text error
    if (fileList.length > 0) {
      clearErrors('textContent');
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!data.textContent && fileList.length === 0) {
      message.error('Please provide either text content or a file.');
      return;
    }

    if (data.textContent && fileList.length > 0) {
      message.error('You can only use text or files, not both.');
      return;
    }

    setLoading(true);

    try {
      // Create a FormData object
      const formData = new FormData();

      // Append text content (if provided)
      if (data.textContent) {
        formData.append('text', data.textContent);
      }

      // Append file (if provided)
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj; // Get the file object
        formData.append('file', file);
      }

      // Append other fields
      formData.append('accessType', data.accessType);
      formData.append('password', data.accessType === 'private' ? data.password : '');
      formData.append('expirationTime', data.expirationTime ? data.expirationTime.toISOString() : '');

      // Send the FormData to the backend for update
      const { data: updatedLink } = await axios.put(
        `http://localhost:5000/link/update/${initialData.id}`,
        formData
      );

      message.success('Link updated successfully!');
      console.log('Updated Link:', updatedLink?.shareableLink);

      // Callback to handle success (e.g., close modal or refresh data)
      if (onUpdateSuccess) {
        onUpdateSuccess(updatedLink);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Update Shareable Link" variant="outlined" style={{ maxWidth: 450, margin: 'auto' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Text Content */}
        <Controller
          name="textContent"
          control={control}
          rules={{
            validate: (value) => (!value || fileList.length === 0) || 'You can only use text or files, not both.',
          }}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={5}
              placeholder="Write your text content here..."
              disabled={fileList.length > 0}
            />
          )}
        />
        {errors.textContent && <p style={{ color: 'red' }}>{errors.textContent.message}</p>}

        {/* File Upload */}
        <Controller
          name="files"
          control={control}
          rules={{
            validate: (value) => (!value?.length || !textContent) || 'You can only use text or files, not both.',
          }}
          render={({ field }) => (
            <Upload
              {...field}
              fileList={fileList}
              onChange={handleFileUpload}
              beforeUpload={() => false} // Prevent auto upload
              maxCount={1} // Allow only one file
              disabled={!!textContent}
            >
              <Button icon={<UploadOutlined />} disabled={!!textContent}>
                Upload File
              </Button>
            </Upload>
          )}
        />
        {errors.files && <p style={{ color: 'red' }}>{errors.files.message}</p>}

        <div className="flex justify-between gap-6 items-center">
          {/* Access Type (Private/Public) */}
          <Controller
            name="accessType"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value === 'public'}
                onChange={(e) => {
                  setValue('accessType', e.target.checked ? 'public' : 'private');
                  if (e.target.checked) {
                    setValue('password', ''); // Clear password if access type is public
                  }
                }}
              >
                Public
              </Checkbox>
            )}
          />

          {/* Password Input (Conditional) */}
          {accessType === 'private' && (
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required for private access.',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long.',
                },
                pattern: {
                  value: /^(?=.*\d).{6,}$/, // At least one number and 6 characters
                  message: 'Password must contain at least one number.',
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter password"
                />
              )}
            />
          )}
        </div>
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

        {/* Expiration Time */}
        <Controller
          name="expirationTime"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select expiration time"
              style={{ width: '100%' }}
            />
          )}
        />

        {/* Submit Button */}
        <Button type="primary" htmlType="submit" block loading={loading}>
          Update Link
        </Button>
      </form>
    </Card>
  );
};

export default UpdateForm;