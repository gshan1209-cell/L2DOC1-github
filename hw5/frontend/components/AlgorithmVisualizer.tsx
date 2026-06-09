import type { DisplayAlgorithm } from "../lib/types";

export default function AlgorithmVisualizer({ algorithm }: { algorithm: DisplayAlgorithm }) {
  const type = algorithm.visual_type ?? "";
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} aria-label={`${algorithm.displayName} visualization`}>
      <svg style={{ width: '100%', height: '100%', maxHeight: '280px' }} viewBox="0 0 420 240" role="img">
        <rect x="0" y="0" width="420" height="240" fill="transparent" />
        {type.includes("tree") || type.includes("forest") ? (
          <>
            <circle cx="210" cy="45" r="18" fill="#2563eb" />
            <path d="M210 63 L130 112 M210 63 L290 112" stroke="#64748b" strokeWidth="3" />
            <circle cx="130" cy="120" r="18" fill="#0f9f6e" />
            <circle cx="290" cy="120" r="18" fill="#0f9f6e" />
            <path d="M130 138 L92 190 M130 138 L168 190 M290 138 L252 190 M290 138 L328 190" stroke="#64748b" strokeWidth="3" />
            {[92, 168, 252, 328].map((x) => <rect key={x} x={x - 18} y="188" width="36" height="24" rx="6" fill="#f59e0b" />)}
          </>
        ) : type.includes("cluster") ? (
          <>
            {[70, 92, 120, 102, 310, 330, 350, 318, 210, 226, 236].map((x, i) => (
              <circle key={`${x}-${i}`} cx={x} cy={i < 4 ? 70 + i * 22 : i < 8 ? 84 + (i - 4) * 20 : 158 + (i - 8) * 16} r="8" fill={i < 4 ? "#2563eb" : i < 8 ? "#0f9f6e" : "#f59e0b"} />
            ))}
            <circle cx="96" cy="105" r="36" fill="none" stroke="#2563eb" strokeDasharray="5 5" />
            <circle cx="330" cy="112" r="42" fill="none" stroke="#0f9f6e" strokeDasharray="5 5" />
            <circle cx="226" cy="178" r="36" fill="none" stroke="#f59e0b" strokeDasharray="5 5" />
          </>
        ) : (
          <>
            <line x1="40" y1="205" x2="380" y2="205" stroke="#94a3b8" />
            <line x1="45" y1="210" x2="45" y2="30" stroke="#94a3b8" />
            <path d="M54 188 C110 160, 148 138, 196 122 C246 104, 292 82, 360 48" fill="none" stroke="#2563eb" strokeWidth="4" />
            {[72, 112, 150, 198, 246, 294, 340].map((x, i) => (
              <circle key={x} cx={x} cy={178 - i * 23 + (i % 2 ? 10 : -8)} r="7" fill={i % 2 ? "#0f9f6e" : "#f59e0b"} />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
