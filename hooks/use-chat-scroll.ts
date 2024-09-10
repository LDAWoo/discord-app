"use client";
import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
};

export const useChatScroll = ({ chatRef, bottomRef, loadMore, shouldLoadMore, count }: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore();
            }
        };

        topDiv?.addEventListener("scroll", handleScroll);

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll);
        };
    }, [shouldLoadMore, loadMore, chatRef]);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;

        if (!hasInitialized && bottomDiv) {
            setHasInitialized(true);
            bottomDiv.scrollIntoView();
        } else if (topDiv) {
            const isAtBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight < 1;
            if (isAtBottom && bottomDiv) {
                setTimeout(() => {
                    bottomDiv.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [bottomRef, chatRef, count, hasInitialized]);
};
