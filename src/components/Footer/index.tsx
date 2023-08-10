import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {YUHANG_RESUME} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = 'Produced by Yuhang Jin';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Yuhang Jin',
          title: 'Yuhang Jin',
          href: YUHANG_RESUME,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> Yuhang Jin Github </>,
          href: 'https://github.com/jinyuhang-007',
          blankTarget: true,
        },
        {
          key: 'Norito',
          title: 'Norito',
          href: YUHANG_RESUME,
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
