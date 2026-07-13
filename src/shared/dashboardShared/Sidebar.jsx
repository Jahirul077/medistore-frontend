'use client';

import React from 'react';
import { LayoutDashboard, Settings, User, BookOpen, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard/overview' },
        { icon: <BookOpen size={20} />, label: 'My Bookings', href: '/dashboard/my-bookings' },
        { icon: <User size={20} />, label: 'Payments History', href: '/dashboard/payments-history' },
        { icon: <Bell size={20} />, label: 'My Quote Requests', href: '/dashboard/my-quote-requests' },
        { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <div className="h-full flex flex-col bg-white">
            <Link href="/" className="p-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl leading-none">B</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-primary">BlitzStack</span>
            </Link>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 border w-full
                                ${isActive
                                    ? 'bg-linear-to-br from-white/40 to-white/10 backdrop-blur-md border-white/30 text-primary shadow-[0_8px_32px_0_rgba(99,102,241,0.1)]'
                                    : 'text-gray-500 hover:bg-white/40 border-transparent hover:border-white/20'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
};

export default Sidebar;
