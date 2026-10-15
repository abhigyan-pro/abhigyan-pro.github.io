import { Link } from 'react-router-dom'
import styles from './Button.module.css'

// Apple-style pill button.
// - `to`   -> internal react-router <Link>
// - `href` -> external <a> (new tab)
// - neither -> <button>
// variant: 'primary' (filled accent) | 'secondary' (bordered) | 'text' (link-like)
export default function Button({
  children,
  href,
  to,
  variant = 'primary',
  className = '',
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

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
