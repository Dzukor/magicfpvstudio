export default function Socials() {
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/Magicfpvstudio' },
    { name: 'Instagram', url: 'https://www.instagram.com/magicfpvstudio/' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Magicfpvstudio' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@maciejkozl' }
  ];

  return (
    <div id="socials" className="card">
      <h2>🌐 Socials</h2>
      {socialLinks.map((social) => (
        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
          {social.name}
        </a>
      ))}
    </div>
  );
}