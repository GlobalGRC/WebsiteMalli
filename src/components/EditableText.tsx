import React, { useState, useEffect } from 'react';
import { useDevMode } from '../context/DevModeContext';

interface EditableTextProps {
  storageKey: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ storageKey, defaultValue, as = 'span', className }) => {
  const { devMode } = useDevMode();
  const [value, setValue] = useState<string>(() => {
    const saved = localStorage.getItem('editable:' + storageKey);
    return saved !== null ? saved : defaultValue;
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('editable:' + storageKey, value);
  }, [value, storageKey]);

  if (!devMode) {
    const Tag = as as any;
    return <Tag className={className}>{value}</Tag>;
  }

  // DEBUG: Show devMode status
  if (devMode) {
    // Add a visible border for troubleshooting
    return editing ? (
      <input
        className={className + ' border border-dashed border-[#E60028] bg-white px-2'}
        value={value}
        autoFocus
        onChange={e => setValue(e.target.value)}
        onBlur={() => setEditing(false)}
        onKeyDown={e => {
          if (e.key === 'Enter') setEditing(false);
        }}
      />
    ) : (
      <span
        className={className + ' cursor-pointer bg-yellow-50 hover:bg-yellow-100 border border-blue-500'}
        onClick={() => setEditing(true)}
        title={`Click to edit (dev mode: ${devMode})`}
      >
        {value}
        <span style={{ fontSize: 10, color: '#E60028', marginLeft: 4 }}>[devMode]</span>
      </span>
    );
  }

  return editing ? (
    <input
      className={className + ' border border-dashed border-[#E60028] bg-white px-2'}
      value={value}
      autoFocus
      onChange={e => setValue(e.target.value)}
      onBlur={() => setEditing(false)}
      onKeyDown={e => {
        if (e.key === 'Enter') setEditing(false);
      }}
    />
  ) : (
    <span
      className={className + ' cursor-pointer bg-yellow-50 hover:bg-yellow-100'}
      onClick={() => setEditing(true)}
      title="Click to edit (dev mode)"
    >
      {value}
    </span>
  );
}; 