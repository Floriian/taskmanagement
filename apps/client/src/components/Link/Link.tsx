import React from 'react';
import { Link as RouterLink, type To } from 'react-router-dom';
import { Link as MaterialLink } from '@mui/material';

type Props = {
  children: React.ReactNode;
  href: To;
};

export function Link({ children, href }: Props) {
  return (
    <MaterialLink component="div">
      <RouterLink to={href}>{children}</RouterLink>
    </MaterialLink>
  );
}
