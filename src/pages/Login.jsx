import { Button, Card, Input, message } from "antd";
import Item from "antd/es/list/Item";
import { Controller, useForm } from "react-hook-form";
import GoogleLogin from "../components/GoogleLogin";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";




const Login = () => {
const {loginUser} = useAuth();
const navigate = useNavigate();

  // 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async(data) => {
        try{
          await loginUser(data?.email, data?.password);
          message.success('Login successful!');
          navigate('/app');
         }catch(err){
           console.log(err.message);
         }
  };



  // 
  return (
    <Card title="Login" style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              style={{marginBottom:"15px"}}
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
              style={{marginBottom:"15px"}}
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Input.Password {...field} placeholder="Password" />
            </Item>
          )}
        />

        {/* Submit Button */}
        <Item  style={{marginBottom:"15px"}}>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Item>

        {/* Google Login */}
         <GoogleLogin/>
      </form>
        {/*  */}
       <Link className="text-center block capitalize mt-4" to={'/auth/register'}>Go to register</Link>
    </Card>
  );
};

export default Login