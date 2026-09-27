const messages = [
  "Free Shipping on Orders Over $100",
  "100% Authentic Products",
  "Easy Returns Within 30 Days",
];

export function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-ivory">
      <div className="container-page flex h-9 items-center justify-between text-[11px] tracking-wide2">
        <ul className="hidden gap-8 sm:flex">
          {messages.map((message) => (
            <li key={message} className="text-ivory/80">
              {message}
            </li>
          ))}
        </ul>
        <p className="sm:hidden text-ivory/80">{messages[0]}</p>
        <div className="flex items-center gap-4 text-ivory/60">
          <span>USD</span>
          <span>English</span>
        </div>
      </div>
    </div>
  );
}
