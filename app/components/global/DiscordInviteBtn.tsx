import React, { useState } from 'react';
import Image from 'next/image';

const DiscordInviteBtn = () => {
  // Your Discord invite link
  const discordInviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1183464624717312134&permissions=2165312&scope=bot';

  const [isInviteVisible, setInviteVisible] = useState(true);

  const handleHideInvite = () => {
    setInviteVisible(false);
  };

  return (
    <div>
      {isInviteVisible && (
        <button className='  select-none relative flex items-center text-white py-2 px-4 rounded' style={{ backgroundColor: '#5865f2' }}>
          {/* Your other content */}
          <p className="mr-2">Join Discord</p>
          <a className='flex items-center' href={discordInviteLink} target="_blank" rel="noopener noreferrer">
            <Image src="/discord.png" alt="Discord Icon" width={32} height={32} priority={true} />
          </a>
          <button className='absolute -top-2 -right-2 bg-red-600   p-1 'onClick={handleHideInvite}>X</button>
        </button>
      )}


    </div>
  );
};

export default DiscordInviteBtn;
