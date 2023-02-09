import { ReactComponent as ChevronIcon } from '../assets/chevron.svg'

interface BreadcrumbProps {
  items: string[]
}
const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className='breadcrumb'>
      <ol>
        {items.map((item, index) => (
          <li key={item} className='breadcrumb__item'>
            {item}
            {index > 0 && (
              <div className='breadcrumb__chevron'>
                <ChevronIcon />
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
