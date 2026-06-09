"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export default function Header() {
  const [theme, setTheme] = useState("dark"); // 'dark' | 'light' | 'blue'

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: string) => {
    document.body.classList.remove("theme-dark", "theme-light", "theme-blue");
    if (newTheme !== "dark") {
      document.body.classList.add(`theme-${newTheme}`);
    }
    localStorage.setItem("app-theme", newTheme);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <header className="app-header glass-panel" style={{
      padding: '10px 24px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>主題設定:</span>
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.1)', padding: '4px', borderRadius: '99px' }}>
          <button
            onClick={() => handleThemeChange('dark')}
            title="深⃋黑 (Dark)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
              background: theme === 'dark' ? 'var(--accent-cyan)' : 'transparent',
              color: theme === 'dark' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              boxShadow: theme === 'dark' ? '0 0 10px rgba(6, 182, 212, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Moon size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => handleThemeChange('light')}
            title="明亮白 (Light)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
              background: theme === 'light' ? 'var(--accent-cyan)' : 'transparent',
              color: theme === 'light' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              boxShadow: theme === 'light' ? '0 0 10px rgba(6, 182, 212, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Sun size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => handleThemeChange('blue')}
            title="科技薍 (Blue)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
              background: theme === 'blue' ? 'var(--accent-cyan)' : 'transparent',
              color: theme === 'blue' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              boxShadow: theme === 'blue' ? '0 0 10px rgba(6, 182, 212, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Monitor size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
