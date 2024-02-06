import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface FormLayoutProps {
    children?: ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
    return <div className="flex flex-col gap-5">{children || <Outlet />}</div>;
};

export default FormLayout;
