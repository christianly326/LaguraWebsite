import { useEffect, useState } from 'react';

function AnimatedTitle() {
  const [text, setText] = useState('');
  const fullText = 'ABOUT US';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 200); // Adjust speed as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <h1 className="title revealUp">{text}</h1>;
}

export default AnimatedTitle;
