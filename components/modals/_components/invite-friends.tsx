import { DiscordIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface Friend {
    id: string;
    name: string;
    imageUrl: string;
}

interface InviteFriendsProps {
    friends: Friend[];
}

export const InviteFriends = ({ friends }: InviteFriendsProps) => {
    return (
        <div className="mt-[4px] px-4">
            <Command className="bg-transparent rounded-none">
                <div className="bg-secondary overflow-hidden rounded-[5px]">
                    <CommandInput placeholder="Search for friends" className="h-8" />
                </div>
                <CommandList>
                    <CommandEmpty className="h-[200px] flex items-center justify-center text-center font-semibold uppercase text-[17px] text-muted-foreground">No results found</CommandEmpty>
                    <CommandGroup className="pt-4">
                        {friends.map((friend) => (
                            <CommandItem key={friend.id} className="!rounded-[2px] p-[7px_8px]">
                                <div className="relative w-full flex group items-center justify-between">
                                    <div className="flex items-center mr-1">
                                        <Avatar className="w-auto h-auto mr-[10px]">
                                            <AvatarImage src={friend.imageUrl} alt={friend.name} className="w-8 h-8" />
                                            <AvatarFallback>
                                                <div className="w-8 h-8 items-center flex justify-center rounded-full bg-indigo-500">
                                                    <DiscordIcon size={18} />
                                                </div>
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">{friend.name}</span>
                                    </div>
                                    <div className="group-hover:bg-green-700 rounded-[2px]">
                                        <Button size={"sm"} className="rounded-[2px] h-8 p-[5px_16px] bg-transparent text-foreground font-normal text-sm border border-green-700 hover:border-green-900 hover:bg-green-900 hover:text-white">
                                            Invite
                                        </Button>
                                    </div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
};
