"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMounted } from "@/hooks/useMounted";
import FileUpLoad from "../global/file-upload";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import React from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required.",
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required.",
    }),
});

const CreateServerModal = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "createServer";

    const mounted = useMounted();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/servers", values);

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
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[5px]">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-medium capitalize">Customize your server</DialogTitle>
                    <DialogDescription className="text-muted-foreground">GIve your server a personality with a name and an image. You can always change it later.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpLoad endpoint="serverImage" value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-muted-foreground">Server name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} className="border-0 focus-visible:ring-0 focus-within:ring-offset-0" {...field} spellCheck={false} autoComplete="off" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="bg-secondary/30 px-6 py-4">
                            <Button type="submit" disabled={isLoading} variant={"primary"}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateServerModal;
