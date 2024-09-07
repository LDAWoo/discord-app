import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteLinkProps {
    inviteUrl: string;
    onGenerateLinkClick: () => void;
}

export const InviteLink = ({ inviteUrl, onGenerateLinkClick }: InviteLinkProps) => {
    const [copied, setCopied] = useState(false);
    const [animate, setAnimate] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 4000);
        return () => clearTimeout(timer);
    }, [inviteUrl]);

    return (
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary-foreground/70">Server invite link</Label>
            <div className="flex items-center mt-2 gap-x-2 h-10 rounded-[3px] pl-2 pr-1 py-1 bg-secondary">
                <Input value={inviteUrl} autoComplete="off" className={`text-accent-foreground focus-visible:ring-offset-0 h-full rounded-none p-0 focus-visible:outline-none focus-visible:ring-0 ${animate ? "animate-pulse" : ""}`} />
                <Button size={"sm"} onClick={onCopy} className={`h-full rounded-[3px] min-w-[75px] max-w-[75px] ${copied && "!bg-green-800"}`} variant={"primary"}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">{copied ? "Copied" : "Copy"}</span>
                </Button>
            </div>

            <div className="inline-flex">
                <span className="text-muted-foreground mr-1 text-[11px]">Your invite link expires in 7 days.</span>
                <Button onClick={onGenerateLinkClick} variant={"link"} className="text-indigo-400 text-[11px] font-normal p-0 h-auto">
                    Edit invite link.
                </Button>
            </div>
        </div>
    );
};
