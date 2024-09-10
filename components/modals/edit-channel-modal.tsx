"use client";
import { useModal } from "@/hooks/use-modal-store";
import { useMounted } from "@/hooks/use-mounted";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AudioIcon, ExclamationIcon } from "../icons";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Channel name is required.",
        })
        .refine((name) => name !== "general", {
            message: "Channel name cannot be 'general'",
        }),
    type: z.nativeEnum(ChannelType),
});

const channelTypeIcon = {
    TEXT: <ExclamationIcon size={16} />,
    AUDIO: <AudioIcon size={16} />,
    VIDEO: <Video size={16} />,
};

const EditChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "editChannel";
    const { channel, server } = data;

    const [channelType, setChannelType] = useState<ChannelType>(ChannelType.TEXT);
    const mounted = useMounted();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channel?.type || ChannelType.TEXT,
        },
    });

    useEffect(() => {
        if (channel) {
            setChannelType(channel.type);
            form.setValue("name", channel.name);
            form.setValue("type", channel.type);
        }
    }, [channel, form]);

    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "type") {
                setChannelType(value.type as ChannelType);
            }
        });

        return () => subscription.unsubscribe();
    }, [form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id,
                },
            });

            await axios.patch(url, values);

            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    if (!mounted) {
        return null;
    }

    const handleClose = () => {
        form.reset();
        setChannelType("TEXT");
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[5px]">
                <DialogHeader className="pt-4 px-4">
                    <DialogTitle className="text-base text-left font-semibold mr-[32px]">Create Channel</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-4">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-muted-foreground">Channel type</FormLabel>

                                        <FormControl>
                                            <RadioGroup
                                                {...field}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setChannelType(value as ChannelType);
                                                }}
                                            >
                                                {Object.values(ChannelType).map((type) => (
                                                    <div key={type} className="flex items-center relative w-full group">
                                                        <Label htmlFor={`r-${type}`} className={`p-[10px_12px] rounded-[3px] group-hover:cursor-pointer flex items-center font-normal text-sm text-muted-foreground w-full transition-all ${field.value === type ? "bg-primary/10" : "bg-secondary hover:bg-accent"}`}>
                                                            {type === ChannelType.TEXT && <ExclamationIcon size={24} className="mr-3" />}
                                                            {type === ChannelType.AUDIO && <AudioIcon size={24} className="mr-3" />}
                                                            {type === ChannelType.VIDEO && <Video size={24} className="mr-3" />}
                                                            <div className="flex flex-col gap-y-1">
                                                                <span className="text-accent-foreground">{type.charAt(0) + type.slice(1).toLowerCase()}</span>
                                                                <span className="text-xs">{getChannelTypeDescription(type)}</span>
                                                            </div>
                                                        </Label>
                                                        <RadioGroupItem value={type} id={`r-${type}`} className="absolute right-2 focus-visible:ring-0 focus-visible:ring-offset-0 border-2 h-[18px] w-[18px]" />
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-muted-foreground">Channel name</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input disabled={isLoading} className="pl-[32px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} spellCheck={false} autoComplete="off" placeholder="new-channel" />
                                            </FormControl>
                                            <div className="absolute top-0 left-0 h-full w-8 ">
                                                <div className="flex items-center justify-center h-full">{channelTypeIcon[channelType]}</div>
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="bg-secondary/30 px-6 py-4">
                            <div className="flex h-full items-end">
                                <Button type="button" disabled={isLoading} className="ml-auto font-normal" size={"sm"} variant={"link"} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button disabled={isLoading} type="submit" className="ml-2 rounded-[2px] text-sm font-normal" size={"sm"} variant={"primary"}>
                                    Edit Channel
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

const getChannelTypeDescription = (type: ChannelType) => {
    switch (type) {
        case ChannelType.TEXT:
            return "Send messages, images, GIFs, emoji, opinions, and puns";
        case ChannelType.AUDIO:
            return "Hang out together with voice";
        case ChannelType.VIDEO:
            return "Hang out together with video, and screen share";
    }
};

export default EditChannelModal;
