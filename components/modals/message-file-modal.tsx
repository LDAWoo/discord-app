"use client";
import { useModal } from "@/hooks/use-modal-store";
import { useMounted } from "@/hooks/use-mounted";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FileUpLoad from "../global/file-upload";
import { Button } from "../ui/button";
import qs from "query-string";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required.",
    }),
});

const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { apiUrl, query } = data;

    const mounted = useMounted();
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        },
    });

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });
            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });

            router.refresh();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-none">
                <DialogHeader className="pt-4 px-4">
                    <DialogTitle className="text-2xl text-center font-medium capitalize">Add a Attachment</DialogTitle>
                    <DialogDescription>GIve your server a personality with a name and an image. You can always change it later.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-4">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpLoad endpoint="messageFile" value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <DialogFooter className="bg-zinc-100 dark:bg-zinc-800 p-4">
                            <Button type="submit" disabled={isLoading} variant={"primary"} className="w-full rounded-[3px]">
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default MessageFileModal;
