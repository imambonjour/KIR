import { useRef } from 'react';
import { popBubble } from '../../utils/bubblePop';

export default function BubbleButton({
  children,
  onClick,
  className = '',
  variant = 'default',
  disabled = false,
  type = 'button',
  selected = false,
  ...props
}) {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) return;
    popBubble(btnRef.current);
    onClick?.(e);
  };

  const classes = [
    'soap-bubble-btn',
    variant !== 'default' && `soap-bubble-btn--${variant}`,
    selected && 'selected',
    disabled && 'disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={btnRef}
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <span className="soap-bubble-shine" aria-hidden="true" />
      <span className="soap-bubble-inner">{children}</span>
    </button>
  );
}
