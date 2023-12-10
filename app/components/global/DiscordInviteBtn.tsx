// In your React component or Next.js page
import React from 'react';

const DiscordInviteBtn = () => {
  // Your Discord invite link
  const discordInviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1183464624717312134&permissions=2165312&scope=bot';

  return (
    <div className='text-black'>
      {/* Your other content */}
      <p>Join our Discord server:</p>
      <a href={discordInviteLink} target="_blank" rel="noopener noreferrer">
        <img src="/discord-icon.png" alt="Discord Icon" />
        Join Discord
      </a>
    </div>
  );
};

export default DiscordInviteBtn;
