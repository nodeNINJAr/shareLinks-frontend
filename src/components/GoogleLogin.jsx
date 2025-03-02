import { GoogleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Item from "antd/es/list/Item";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
const {googleLoginIn} = useAuth();
const navigate = useNavigate();



// 
const handleGoogleLogin = async() => {
  // 
  try{
    await googleLoginIn();
    message.info('Google login Succesfully.');
    navigate('/app')
   }catch(err){
     console.log(err.message);
   }

};

  // 
  return (
    <>
      {/* Google Login Button */}
      <Item>
        <Button
          type="default"
          block
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
        >
          Sign up with Google
        </Button>
      </Item>
    </>
  );
};

export default GoogleLogin;
