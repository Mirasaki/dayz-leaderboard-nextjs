import React from 'react';
import config from '../../config.json';

/*
  Legacy full screen image background
  with next/image optimizations

  function getWindowDimensions () {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const resize = () => {
    const { width, height } = getWindowDimensions();
    setWidth(width);
    setHeight(height);
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  */

function BackgroundImage () {
  return (
    <div style={{
      position: 'fixed',
      top: config.OVERLAP_BACKGROUND_AND_NAVBAR ? '0px' : '85px', // Navbar/Header height offset
      width: '100%',
      // Prevent overflow bottom when not overlapping
      height: config.OVERLAP_BACKGROUND_AND_NAVBAR
        ? '100lvh'
        : 'calc(100lvh - 85px)',
      ...(config.USE_BACKGROUND_IMAGE && {
        backgroundImage: `url('/${config.BACKGROUND_IMAGE_FILE_NAME}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        zIndex: -1
      })
    }} />
  );
}

export default BackgroundImage;
