"use client";
import React, { useState } from "react";
import Image from "next/image";

const DiscordInviteBtn = () => {
  const discordInviteLink =  'https://discord.gg/a2bFBMEU' //process.env.DISCORDSERVERLINK


  const [isInviteVisible, setInviteVisible] = useState(true);
  const handleHideInvite = () => {
    setInviteVisible(false);
  };

  return (
    <div className="absoulte">
      {isInviteVisible && (
        <button
          className="  select-none relative flex items-center text-white py-2 px-4 rounded"
          style={{ backgroundColor: "#5865f2" }}

        >
          <a
            className="flex items-center"
            href={discordInviteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
          <p className="mr-2">Join Discord</p>

            <Image
              src="/discord.png"
              alt="Discord Icon"
              width={32}
              height={32}
              priority={true}
              quality={100}
            />
          </a>
          <button
            className="absolute -top-1 -right-1 bg-red-600   p-1 "
            onClick={handleHideInvite}
          >
            X
          </button>
        </button>
      )}
    </div>
  );
};

export default DiscordInviteBtn;
