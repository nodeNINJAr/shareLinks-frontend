import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, Card, Form, Checkbox, message } from 'antd';
import GoogleLogin from '../components/GoogleLogin';
import { Link } from 'react-router';

const { Item } = Form;

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Registration Data:', data);
    message.success('Registration successful!');
  };



  // 
  return (
    <Card title="Register" style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <Item
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username?.message}
            >
              <Input {...field} placeholder="Username" />
            </Item>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => (
            <Item
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Input {...field} placeholder="Email" />
            </Item>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value: /^(?=.*\d).{8,}$/,
              message: 'Password must contain at least one number',
            },
          }}
          render={({ field }) => (
            <Item
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Input.Password {...field} placeholder="Password" />
            </Item>
          )}
        />

        {/* Submit Button */}
        <Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Item>
        {/* Google login */}
        <GoogleLogin/>
      </form>
       {/*  */}
       <Link className="text-center block capitalize mt-4" to={'/auth/login'}>Go to login</Link>
    </Card>
  );
};

export default Register;