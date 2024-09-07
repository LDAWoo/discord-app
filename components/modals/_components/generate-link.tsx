import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, Check } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside";
import { Option } from "@/lib/constant";

interface GenerateLinkProps {
    expires: Option[];
    limitedUsers: Option[];
    isLoading: boolean;
    onCancel: () => void;
    onGenerate: () => void;
}

export const GenerateLink = ({ expires, limitedUsers, isLoading, onCancel, onGenerate }: GenerateLinkProps) => {
    const [showExpire, setShowExpire] = useState(false);
    const [expireInvite, setExpireInvite] = useState("7 days");
    const [showLimited, setShowLimited] = useState(false);
    const [limitedUser, setLimitedUser] = useState("No limit");
    const expireRef = useRef(null);
    const limitRef = useRef(null);

    useClickOutside(expireRef, () => setShowExpire(false));
    useClickOutside(limitRef, () => setShowLimited(false));

    const renderDropdown = (options: Option[], showDropdown: boolean, selectedValue: string, onToggle: () => void, onSelect: (value: string) => void) => (
        <div className="relative group" ref={showDropdown ? expireRef : limitRef}>
            <button className={`w-full text-sm font-medium px-3 flex items-center h-9 text-secondary-foreground/90 bg-secondary ${showDropdown ? "rounded-tl-[5px] rounded-tr-[5px]" : "rounded-[5px]"}`} onClick={onToggle}>
                {selectedValue}
                <ChevronDown className={`h-4 w-4 ml-auto opacity-80 ${showDropdown && "rotate-180"}`} />
            </button>
            {showDropdown && (
                <div className="absolute z-[1] w-[408px] text-sm font-medium border border-secondary bg-zinc-100 dark:bg-zinc-800">
                    {options.map((option) => (
                        <button
                            onClick={() => {
                                onSelect(option.name);
                                onToggle();
                            }}
                            key={option.value}
                            className={`flex items-center w-full text-left rounded-none p-3 cursor-pointer
                                ${option.name === selectedValue ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-accent hover:text-primary"}
                            `}
                        >
                            <span className="flex-1">{option.name}</span>
                            {selectedValue === option.name && (
                                <div className="w-[20px] h-[20px] rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="p-4 h-[490px] flex flex-col">
            <div className="mb-[8px]">
                <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary-foreground/70">Expire after</Label>
                <div className="mt-2">{renderDropdown(expires, showExpire, expireInvite, () => setShowExpire(!showExpire), setExpireInvite)}</div>
            </div>

            <div className="mb-[8px]">
                <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary-foreground/70">Max number of users</Label>
                <div className="mt-2">{renderDropdown(limitedUsers, showLimited, limitedUser, () => setShowLimited(!showLimited), setLimitedUser)}</div>
            </div>

            <div className="py-2 flex-grow">
                <div className="flex h-full items-end">
                    <Button disabled={isLoading} className="ml-auto font-normal" size={"sm"} variant={"link"} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} className="ml-2 rounded-[2px] text-sm font-normal" size={"sm"} variant={"primary"} onClick={onGenerate}>
                        Generate a New Link
                    </Button>
                </div>
            </div>
        </div>
    );
};
