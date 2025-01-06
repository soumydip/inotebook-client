import React, { useState } from 'react';

const ShareLink = ({ noteId }) => {
  const [shareLink, setShareLink] = useState('');

  const handleCreateShareLink = () => {
    const generatedLink = `${window.location.origin}/note/${noteId}`;
    setShareLink(generatedLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      alert('Failed to copy the link');
      console.error('Error copying link:', err);
    });
  };

  return (
    <div>
      <button onClick={handleCreateShareLink}>Create Share Link</button>
      {shareLink && (
        <div>
          <p>Share this link: {shareLink}</p>
          <button onClick={handleCopyLink}>Copy Link</button>
        </div>
      )}
    </div>
  );
};

export default ShareLink;
