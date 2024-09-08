"use client";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../global/user-avatar";
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

const MembersModal = () => {
    const router = useRouter();
    const { isOpen, type, data, onOpen, onClose } = useModal();
    const [loadingId, setLoadingId] = useState("");

    const isModalOpen = isOpen && type === "members";
    const { server } = data as {
        server: ServerWithMembersWithProfiles;
    };

    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            });
            const response = await axios.delete(url);

            router.refresh();
            onOpen("members", {
                server: response.data,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    };

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            });

            const response = await axios.patch(url, {
                role,
            });
            router.refresh();
            onOpen("members", {
                server: response.data,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="w-[440px] bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[5px]">
                <DialogHeader className="pt-4 px-4">
                    <DialogTitle className="text-base text-left font-semibold mr-[32px]">{`Manage member to server ${server?.name}`}</DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">⭐{server?.members?.length} Members</DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pl-4 pr-4">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-muted-foreground">{member.profile.email}</p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-0">
                                            <MoreVertical className="h-4 w-4 text-accent-foreground" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="w-4 h-4 mr-2" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent sideOffset={5} alignOffset={-5}>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                            <Shield className="h-4 w-4 mr-2" />
                                                            Guest
                                                            {member.role === "GUEST" && <Check className="h-4 w-4 ml-auto" />}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                            Moderator
                                                            {member.role === "MODERATOR" && <Check className="h-4 w-4 ml-auto" />}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-rose-500 cursor-pointer hover:!text-white hover:!bg-rose-800" onClick={() => onKick(member.id)}>
                                                <Gavel className="w-4 h-4 mr-2" />
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default MembersModal;
