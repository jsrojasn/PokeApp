import {LEFT_PAGE, RIGHT_PAGE} from "./constants"

export const createArray = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const fetchPageNumbers = (numberOfPages, currentPage) => {
  const totalNumbers = 5;
  const totalBlocks = 7;

  if (numberOfPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(numberOfPages - 1, currentPage + 1);

    let pages = createArray(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = numberOfPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = createArray(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = createArray(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, numberOfPages];
  }

  return createArray(1, numberOfPages);
};
