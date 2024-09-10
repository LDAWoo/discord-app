"use client";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Message, Profile } from "@prisma/client";
import axios from "axios";
import { FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UserAvatar from "../global/user-avatar";
import ActionTooltip from "../ui/action-tooltip";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import MessageAction from "./_components/message-action";

interface ChatMessageItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    message?: Message;
    currentMember: Member;
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, any>;
}

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const formSchema = z.object({
    content: z.string().min(1),
});

const ChatMessageItem = ({ content, member, message, currentMember, deleted, fileUrl, id, socketQuery, socketUrl, timestamp, isUpdated }: ChatMessageItemProps) => {
    const router = useRouter();
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const { onOpen } = useModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const { setFocus } = form;

    const onMemberClick = () => {
        if (member.id === currentMember.id) {
            return;
        }

        router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
    };

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === "Escape" || e.keyCode === 27) {
                setIsEditing(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        form.reset({ content: content });
    }, [content]);

    const fileType = fileUrl?.split(".").pop();
    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;
    const canDeletedMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;

    const isLoading = form.formState.isSubmitting;

    const handleEdit = async () => {
        setIsEditing(true);
    };

    const handleDelete = async () => {
        onOpen("deleteMessage", {
            apiUrl: `${socketUrl}/${id}`,
            query: socketQuery,
            member,
            message,
        });
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery,
            });
            await axios.patch(url, values);

            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isEditing) {
            setFocus("content");
        }
    }, [isEditing]);

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className=" group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>{roleIconMap[member.role]}</ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
                    </div>
                    {isImage && (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48">
                            <Image fill src={fileUrl} alt={content} className="object-cover" />
                        </a>
                    )}
                    {isPDF && (
                        <div className="max-w-full w-[432px] p-4 mt-2 rounded-[8px] border border-primary-foreground/90 bg-background">
                            <div className="relative flex items-center">
                                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                                    PDF File
                                </a>
                            </div>
                        </div>
                    )}
                    {!fileUrl && (
                        <p className={cn("text-sm text-zinc-600 dark:text-zinc-300", deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1")}>
                            {content}
                            {isUpdated && !deleted && <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">(edited)</span>}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-full gap-y-1 pt-2">
                                <FormField
                                    name="content"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input autoComplete="off" disabled={isLoading} {...field} className="h-[44px] p-[10px_16px] rounded-[8px] bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200" />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center w-full">
                                    <span className="text-xs mr-1 text-muted-foreground">escape to</span>
                                    <Button disabled={isLoading} onClick={() => setIsEditing(false)} type="button" variant={"link"} className="mr-1 p-0 h-auto text-indigo-500 font-normal text-xs">
                                        cancel
                                    </Button>
                                    <span className="text-xs mr-1 text-muted-foreground"> • enter to </span>
                                    <Button type="submit" disabled={isLoading} variant={"link"} className="mr-1 p-0 h-auto text-indigo-500 font-normal text-xs">
                                        save
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </div>
            </div>
            {canDeletedMessage && <MessageAction canEditMessage={canEditMessage} canDeletedMessage={canDeletedMessage} onEdit={handleEdit} onDelete={handleDelete} />}
        </div>
    );
};

export default ChatMessageItem;
