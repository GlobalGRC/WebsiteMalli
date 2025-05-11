import React, { useEffect, useState } from 'react';

export const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mMove = (el: MouseEvent) => {
      setPosition({ x: el.clientX, y: el.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
      
      setTimeout(() => {
        setClicked(false);
      }, 150);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    handleLinkHoverEvents();
    window.addEventListener('mousemove', mMove);
    window.addEventListener('mousedown', mDown);
    document.body.addEventListener('mouseleave', mLeave);

    return () => {
      window.removeEventListener('mousemove', mMove);
      window.removeEventListener('mousedown', mDown);
      document.body.removeEventListener('mouseleave', mLeave);
      
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', () => setLinkHovered(true));
        el.removeEventListener('mouseleave', () => setLinkHovered(false));
      });
    };
  }, []);

  const cursorClasses = `
    fixed pointer-events-none z-50 rounded-full mix-blend-difference
    transition-transform duration-150 ease-out
    ${hidden ? 'opacity-0' : 'opacity-100'}
    ${clicked ? 'scale-75' : 'scale-100'}
    ${linkHovered ? 'scale-150' : 'scale-100'}
  `;

  const cursorDotStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '12px',
    height: '12px',
    background: '#ffffff',
    transform: 'translate(-50%, -50%)',
  };

  const cursorRingStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '40px',
    height: '40px',
    border: '1px solid #E60028',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <>
      <div className={`${cursorClasses}`} style={cursorDotStyle}></div>
      <div className={`${cursorClasses} bg-transparent`} style={cursorRingStyle}></div>
    </>
  );
};