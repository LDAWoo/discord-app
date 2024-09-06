"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../ui/action-tooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
    const router = useRouter();
    const params = useParams();

    const handleClick = () => {
        router.push(`/servers/${id}`);
    };

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button onClick={handleClick} className="group relative flex items-center">
                <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all duration-500 w-[4px]", params?.serverId !== id && "group-hover:h-[20px]", params?.serverId === id ? "h-[36px]" : "h-[8px]")}></div>
                <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all duration-500 overflow-hidden", params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]")}>
                    <Image fill src={imageUrl} alt="Channel" />
                </div>
            </button>
        </ActionTooltip>
    );
};

export default NavigationItem;
