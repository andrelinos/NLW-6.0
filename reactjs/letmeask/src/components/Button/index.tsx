import { ButtonHTMLAttributes } from 'react';
import { Button as CkButton } from '@chakra-ui/react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <CkButton
      w="100%"
      h="3rem"
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  );
}
