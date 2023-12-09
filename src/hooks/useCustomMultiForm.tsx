import { useState, useEffect } from 'react';

type Props = {
  label: string;
  content: React.ReactNode;
};

const useCustomMultiForm = (items: Props[]) => {
  if (!items || !Array.isArray(items) || items.length === 0) throw new Error('Invalid items');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0]);

  useEffect(() => {
    if (activeIndex > 0 && activeIndex < items.length - 1) {
      setIsStart(false);
      setIsEnd(false);
    } else if (activeIndex === 0) {
      setIsStart(true);
      setIsEnd(false);
    } else if (activeIndex === items.length - 1) {
      setIsStart(false);
      setIsEnd(true);
    }
  }, [activeIndex, setIsStart, setIsEnd, items.length]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex(activeIndex + 1);
      setActiveItem(items[activeIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setActiveItem(items[activeIndex - 1]);
    }
  };

  return {
    activeIndex,
    activeItem,
    isStart,
    isEnd,
    handleNext,
    handlePrev,
  };
};

export default useCustomMultiForm;
