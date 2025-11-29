import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: string;
  fullWidth?: boolean;
  className?: string;
}

const NavBarLinkButton: React.FC<ButtonLinkProps> = ({
  to,
  children,
  variant = 'text',
  color = 'primary.contrastText',
  fullWidth = false,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button
      variant={variant}
      sx={{color: color}}
      fullWidth={fullWidth}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default NavBarLinkButton;
