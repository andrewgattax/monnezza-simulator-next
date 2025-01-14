"use client";
import React, { useEffect } from 'react';
import { useBreadcrumb, BreadcrumbItem} from './BreadcrumbContext';

interface BreadcrumbInjectorProps {
    items: BreadcrumbItem[];
}

const BreadcrumbInjector: React.FC<BreadcrumbInjectorProps> = ({ items }) => {
    const { breadcrumbData, updateBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        updateBreadcrumb(items);
    }, [items]);

    return null;
};

export default BreadcrumbInjector;