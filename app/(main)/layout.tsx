import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="h-full">
            <div className="flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="pl-[72px] h-full">{children}</main>
        </div>
    );
};

export default Layout;
