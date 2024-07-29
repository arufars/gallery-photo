import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* <TeamSwitcher />
        <MainNav className="mx-6" /> */}
        <Link href="/">PHOTO APPS</Link>
        <div className="ml-auto flex items-center space-x-4">
          {/* <Search />
          <UserNav /> */}
          <Avatar>
            <AvatarImage src="https://i.ibb.co.com/6Hdnxp2/6e67c49a288c09474c45667005c828e371a68361f8cf33315a5a17a8a74595b2.png"></AvatarImage>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
