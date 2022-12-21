import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ActiveLink = ({ href, children, ...rest }) => {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const useLoaded = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);
    return loaded;
  };
  const mounted = useLoaded();

  const isActive = router.asPath === href;
  const currentTheme =
    mounted && theme !== undefined && theme === 'system' ? systemTheme : theme;

  const activeLinkBgColor =
    currentTheme === 'dark'
      ? 'bg-gray-700 text-white'
      : 'bg-purple-600 text-white';

  const themeBgHover =
    currentTheme === 'dark'
      ? 'hover:bg-gray-700 hover:text-white'
      : 'hover:bg-purple-800 hover:text-white ';

  const activeLinkAndNotActiveColor = isActive
    ? activeLinkBgColor
    : `text-white-300 ${themeBgHover}`;

  const className = `${activeLinkAndNotActiveColor} px-3 py-2 rounded-md text-sm font-medium`;

  return (
    <Link href={href} passHref {...rest} className={className} aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  );
};

ActiveLink.propTypes = {
  href: PropTypes.string.isRequired,
};


export default ActiveLink; 
