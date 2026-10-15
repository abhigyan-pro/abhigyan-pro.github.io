import styles from './Button.module.css'

// Apple-style pill button. Renders an <a> when `href` is given, else a <button>.
// variant: 'primary' (filled accent) | 'secondary' (bordered) | 'text' (link-like)
export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
