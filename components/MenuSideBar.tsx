"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons/icons";
import { useSelectedLayoutSegments } from "next/navigation";
import { capitalizeFirstLetter } from "~/helpers/word";

const menuList = [
  {
    id: 1,
    label: "gallery",
    icon: <Icons.Gallery />,
  },
  {
    id: 2,
    label: "albums",
    icon: <Icons.Album />,
  },
  {
    id: 3,
    label: "favorites",
    icon: <Icons.Heart />,
  },
];

export default function MenuSideBar() {
  const pathName = useSelectedLayoutSegments();

  console.log(pathName);
  return (
    <>
      {menuList.map((menu) => {
        return (
          <Link key={menu.id} href={menu.label}>
            <Button
              variant={menu.label === pathName[0] ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {menu.icon}
              {capitalizeFirstLetter(menu.label)}
            </Button>
          </Link>
        );
      })}
      {/* <Link href="/gallery">
        <Button variant={pathName[0] ? "secondary" : "ghost"} className="w-full justify-start">
          <Icons.Gallery />
          Gallery
        </Button>
      </Link>

      <Link href="/albums">
        <Button variant="ghost" className="w-full justify-start">
          <Icons.Album />
          Albums
        </Button>
      </Link>

      <Link href="/favorites">
        <Button variant={pathName[0] ? "secondary" : "ghost"} className="w-full justify-start">
          <Icons.Heart />
          Favorites
        </Button>
      </Link> */}
    </>
  );
}
