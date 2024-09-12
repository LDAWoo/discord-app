import { cn } from "@/lib/utils";

type Props = {
    size?: number;
    className?: string;
};

export const DiscordIcon = ({ size, className }: Props) => {
    return (
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={cn(className)} fill="none" viewBox={`0 0 24 24`}>
            <path fill="currentColor" d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.35.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z" className=""></path>
        </svg>
    );
};

export const ExclamationIcon = ({ size, className }: Props) => {
    return (
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={cn(className)} fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clipRule="evenodd" className=""></path>
        </svg>
    );
};

export const AudioIcon = ({ size, className }: Props) => {
    return (
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={cn(className)} fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"></path>
            <path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"></path>
        </svg>
    );
};

export const PencilIcon = ({ size, className }: Props) => {
    return (
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={cn(className)} fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"></path>
        </svg>
    );
};

export const CopyIcon = ({ size, className }: Props) => {
    return (
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={cn(className)} fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 16a1 1 0 0 1-1-1v-5a8 8 0 0 1 8-8h5a1 1 0 0 1 1 1v.5a.5.5 0 0 1-.5.5H10a6 6 0 0 0-6 6v5.5a.5.5 0 0 1-.5.5H3Z"></path>
            <path fill="currentColor" d="M6 18a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4h-3a5 5 0 0 1-5-5V6h-4a4 4 0 0 0-4 4v8Z"></path>
            <path fill="currentColor" d="M21.73 12a3 3 0 0 0-.6-.88l-4.25-4.24a3 3 0 0 0-.88-.61V9a3 3 0 0 0 3 3h2.73Z"></path>
        </svg>
    );
};

export const MutedIcon = ({ size, className }: Props) => {
    return (
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={cn(className)} fill="currentColor" viewBox="0 0 24 24">
            <path d="m2.7 22.7 20-20a1 1 0 0 0-1.4-1.4l-20 20a1 1 0 1 0 1.4 1.4ZM10.8 17.32c-.21.21-.1.58.2.62V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.06A8 8 0 0 0 20 10a1 1 0 0 0-2 0c0 1.45-.52 2.79-1.38 3.83l-.02.02A5.99 5.99 0 0 1 12.32 16a.52.52 0 0 0-.34.15l-1.18 1.18ZM15.36 4.52c.15-.15.19-.38.08-.56A4 4 0 0 0 8 6v4c0 .3.03.58.1.86.07.34.49.43.74.18l6.52-6.52ZM5.06 13.98c.16.28.53.31.75.09l.75-.75c.16-.16.19-.4.08-.61A5.97 5.97 0 0 1 6 10a1 1 0 0 0-2 0c0 1.45.39 2.81 1.06 3.98Z"></path>
        </svg>
    );
};

export const AudioOffIcon = ({ size, className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} className={cn(className)}>
            <path fill="currentColor" d="M15 12.83L13 11V5a1 1 0 0 0-2 0v.17L6.17 1.33a1 1 0 0 0-1.41 1.41L9.62 7.6A5.93 5.93 0 0 0 6 13v3a1 1 0 0 0 2 0v-3a4 4 0 0 1 1.17-2.83l1.83 1.83V16a1 1 0 0 0 2 0v-1.17l3.58 3.58a1 1 0 0 0 1.42-1.41zM19.23 12A6 6 0 0 0 18 9.83a1 1 0 1 0-2 .34 4 4 0 0 1 1.17 2.83v3a1 1 0 0 0 2 0zM12 1a3 3 0 0 0-3 3v1.17l2 2V4a1 1 0 0 1 2 0v7.17l2 2V4a3 3 0 0 0-3-3z" />
        </svg>
    );
};

export const ShareScreenIcon = ({ size, className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} className={cn(className)}>
            <path fill="currentColor" d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H3V6h18v12z" />
            <path fill="currentColor" d="M16 8l-4 4-4-4H5l7 7 7-7z" />
        </svg>
    );
};

export const PhoneIcon = ({ size, className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} className={cn(className)}>
            <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02c-.37-1.11-.56-2.3-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
    );
};
