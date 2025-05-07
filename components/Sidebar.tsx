import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
const Sidebar = () => {
  return (
    <Command className="bg-secondary dark:bg-secondary-dark rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            <Link href="/">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="w-4 h-4 mr-2" />
            <Link href="/news">News</Link>
          </CommandItem>
          <CommandItem>
            <Folders className="w-4 h-4 mr-2" />
            <Link href="/categories">Categories</Link>
          </CommandItem>
          <CommandItem>
            <CreditCard className="w-4 h-4 mr-2" />
            <Link href="/payments">Payments</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="w-4 h-4 mr-2" />
            <Link href="/profile">Profile</Link>
          </CommandItem>
          <CommandItem>
            <Settings className="w-4 h-4 mr-2" />
            <Link href="/settings">Settings</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
