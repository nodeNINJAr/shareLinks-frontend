import { GoogleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Item from "antd/es/list/Item";
import React from "react";

const GoogleLogin = () => {


const handleGoogleLogin = () => {
    console.log('Google login clicked');
    message.info('Google login functionality to be implemented.');
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
