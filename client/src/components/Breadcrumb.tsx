import { ReactComponent as ChevronIcon } from '../assets/chevron.svg'

const Breadcrumb = () => {
  const items = ['sdadsas', 'ddsdssd', '4343']

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
