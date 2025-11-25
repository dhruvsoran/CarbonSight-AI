import { LayoutDashboard, Fuel, Sprout, Route, FileText, Bot } from 'lucide-react';
import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Carbon Estimator',
    href: '/dashboard/estimator',
    icon: Fuel,
  },
  {
    title: 'Sink Optimizer',
    href: '/dashboard/sink-optimizer',
    icon: Sprout,
  },
  {
    title: 'Net-Zero Path',
    href: '/dashboard/net-zero-path',
    icon: Route,
  },
  {
    title: 'Report Generator',
    href: '/dashboard/reports',
    icon: FileText,
  },
];
