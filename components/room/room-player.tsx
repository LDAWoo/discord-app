import { VideoIcon, VideoOffIcon } from "lucide-react";
import { MutedIcon, PhoneIcon } from "../icons";

interface RoomPlayerProps {
    muted: boolean;
    playing: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    onLeave: () => void;
}

const RoomPlayer = ({ muted, playing, onToggleAudio, onToggleVideo, onLeave }: RoomPlayerProps) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 z-[3] translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300  w-full overflow-hidden">
            <div className="flex items-center justify-center w-full h-full gap-4 p-4">
                <button onClick={onToggleVideo} className="rounded-full duration-300 transition-all bg-accent hover:bg-secondary text-accent-foreground w-[56px] h-[56px] flex items-center justify-center">
                    {muted ? <VideoOffIcon size={24} /> : <VideoIcon size={24} />}
                </button>

                <button onClick={onToggleAudio} className="rounded-full duration-300 transition-all bg-accent hover:bg-secondary text-accent-foreground w-[56px] h-[56px] flex items-center justify-center">
                    {playing ? <MutedIcon size={24} /> : <MutedIcon size={24} />}
                </button>

                <button onClick={onLeave} className="rounded-full bg duration-300 transition-all bg-rose-600 hover:bg-rose-800 text-white w-[56px] h-[56px] flex items-center justify-center">
                    <PhoneIcon size={24} />
                </button>
            </div>
        </div>
    );
};

export default RoomPlayer;
