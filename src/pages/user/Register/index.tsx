import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO, YUHANG_RESUME} from "@/constants";

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  // 表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userPassword, checkPassword} = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('The passwords entered twice do not match!');
      return;
    }

    try {

      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = 'Register successful!';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = 'Register failed, please try again!';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={
          {
            searchConfig: {
              submitText: "Register"
            }
          }
          }
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="Yuhang Jin's User Center"
          subTitle={<a href={YUHANG_RESUME} target = "_blank" rel="noreferrer"> Hi! Here is Yuhang Jin! </a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'Account Register'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Please enter your username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Please enter your password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Password length should be longer or equal to 8',
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Please re-enter your password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password again!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Password length should be longer or equal to 8',
                  }
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Please enter your planet code"
                rules={[
                  {
                    required: true,
                    message: 'Please input your planet code!',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
