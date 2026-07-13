'use client';

import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TopNavbar = () => {
    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-foreground">Overview</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Jahirul!</p>
            </div>

            <div className="flex items-center gap-4">
                {/* Simple Search (Placeholder) */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="h-10 w-64 rounded-xl border bg-muted/30 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground shadow-sm"
                    />
                </div>

                {/* Action Buttons */}
                <Button variant="ghost" size="icon" className="rounded-xl">
                    <Bell className="h-5 w-5" />
                </Button>
                <div className="h-10 w-10 rounded-xl bg-primary/10 p-2 flex items-center justify-center border border-primary/20">
                    <User className="h-5 w-5 text-primary" />
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;
