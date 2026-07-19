const WigSilhouette = () => (
  <svg viewBox="0 0 1200 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden="true">
    <defs>
      <linearGradient id="wig-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E2F1F8" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* WIG craft — simple hull + wing silhouette */}
    <g transform="translate(300 40)">
      {/* Wing */}
      <path d="M60 90 Q300 30 540 90 L560 108 Q300 78 60 108 Z" fill="url(#wig-body)" stroke="#00E5FF" strokeOpacity="0.7" strokeWidth="1" />
      {/* Hull */}
      <path d="M230 100 Q300 130 370 100 L380 118 Q300 140 220 118 Z" fill="#0C1420" stroke="#00E5FF" strokeOpacity="0.9" strokeWidth="1" />
      {/* Tail */}
      <path d="M280 100 L300 60 L320 100 Z" fill="#0C1420" stroke="#00E5FF" strokeOpacity="0.7" strokeWidth="1" />
      {/* Cockpit / sensor dome */}
      <circle cx="300" cy="102" r="4" fill="#00E5FF" />
      {/* Ground-effect shadow */}
      <ellipse cx="300" cy="150" rx="180" ry="6" fill="#00E5FF" opacity="0.12" />
    </g>
    {/* Waves */}
    <g opacity="0.85">
      <path d="M0 210 Q150 200 300 210 T600 210 T900 210 T1200 210" fill="none" stroke="#00E5FF" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M0 226 Q150 218 300 226 T600 226 T900 226 T1200 226" fill="none" stroke="#00E5FF" strokeOpacity="0.22" strokeWidth="1" />
      <path d="M0 242 Q150 236 300 242 T600 242 T900 242 T1200 242" fill="none" stroke="#00E5FF" strokeOpacity="0.14" strokeWidth="1" />
    </g>
    {/* Altitude tick marks */}
    <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#9BA8B8" opacity="0.7">
      <line x1="60" y1="60" x2="80" y2="60" stroke="#00E5FF" strokeOpacity="0.4" />
      <text x="20" y="63">ALT · 3m</text>
      <line x1="60" y1="140" x2="80" y2="140" stroke="#00E5FF" strokeOpacity="0.4" />
      <text x="20" y="143">ALT · 1m</text>
      <line x1="60" y1="210" x2="80" y2="210" stroke="#00E5FF" strokeOpacity="0.4" />
      <text x="20" y="213">SEA · 0m</text>
    </g>
  </svg>
);

export default WigSilhouette;
