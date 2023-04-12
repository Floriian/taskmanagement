import React from 'react';
import { Link as RouterLink, type To } from 'react-router-dom';
import { Link as MaterialLink } from '@mui/material';

type Props = {
  children: React.ReactNode;
  href: To;
  onClick?: () => void;
};

export function Link({ children, href, onClick }: Props) {
  return (
    <MaterialLink component="div" onClick={onClick}>
      <RouterLink to={href}>{children}</RouterLink>
    </MaterialLink>
  );
}
