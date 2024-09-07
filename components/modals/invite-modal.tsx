"use client";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { expireInviteDate, friendsOfUser, limitedUserInvite, Option } from "@/lib/constant";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { GenerateLink } from "./_components/generate-link";
import { InviteFriends } from "./_components/invite-friends";
import { InviteLink } from "./_components/invite-link";

const InviteModal = () => {
    const { isOpen, type, data, onOpen } = useModal();
    const [isGenerateLink, setIsGenerateLink] = useState(false);
    const origin = useOrigin();
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            onOpen("invite", {
                server: response.data,
            });
            setIsGenerateLink(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen}>
            <DialogContent className="w-[440px] bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[5px]">
                <DialogHeader className="pt-4 px-4">
                    <DialogTitle className="text-base text-left font-semibold mr-[32px]">{!isGenerateLink ? `Invite friends to ${server?.name}` : "Server invite link"}</DialogTitle>
                    {!isGenerateLink && <DialogDescription className="text-left text-muted-foreground">⭐solved-challenges-⚡</DialogDescription>}
                </DialogHeader>
                {!isGenerateLink ? (
                    <>
                        <InviteFriends friends={friendsOfUser} />
                        <InviteLink inviteUrl={inviteUrl} onGenerateLinkClick={() => setIsGenerateLink(true)} />
                    </>
                ) : (
                    <GenerateLink limitedUsers={[...limitedUserInvite] as Option[]} expires={[...expireInviteDate] as Option[]} isLoading={isLoading} onCancel={() => setIsGenerateLink(false)} onGenerate={onNew} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default InviteModal;
