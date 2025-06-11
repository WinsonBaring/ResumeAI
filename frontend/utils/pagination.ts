// utils/pagination.ts

/**
 * Generates an array of page numbers to display in the pagination component.
 * Handles ellipses for large number of pages.
 * @param currentPage The current active page.
 * @param totalPages The total number of pages available.
 * @returns An array of numbers and '...' representing page numbers.
 */
export const generatePaginationPages = (currentPage: number, totalPages: number): (number | '...')[] => {
    const delta = 2; // Number of pages to show around the current page
    const pages: (number | '...')[] = []; // Explicitly type the array
  
    if (totalPages === 0) {
      return [];
    }
  
    // Always include the first page
    pages.push(1);
  
    // Add pages around the current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      pages.push(i);
    }
  
    // Add ellipsis if needed before the range
    if (currentPage - delta > 2 && totalPages > 2) {
      pages.splice(1, 0, '...'); // Insert '...' at index 1
    }
  
    // Add ellipsis if needed after the range
    if (currentPage + delta < totalPages - 1 && totalPages > 2) {
      // If the last added page is not totalPages-1, and it's not the ellipsis we just added
      const lastPageAdded = pages[pages.length - 1];
      if (lastPageAdded !== totalPages && lastPageAdded !== '...') {
        pages.push('...');
      }
    }
  
  
    // Always include the last page if totalPages > 1 and it's not already there
    if (totalPages > 1 && pages[pages.length - 1] !== totalPages) {
      pages.push(totalPages);
    }
  
    // Filter out duplicate consecutive '...' and sort unique numbers
    const uniqueSortedPages = Array.from(new Set(pages)).sort((a, b) => {
      if (a === '...') return 1; // '...' comes after numbers for initial sort
      if (b === '...') return -1;
      return (a as number) - (b as number);
    });
  
    // Handle consecutive '...' (e.g., [1, '...', '...', 5] -> [1, '...', 5])
    const finalPages: (number | '...')[] = [];
    for (let i = 0; i < uniqueSortedPages.length; i++) {
      if (uniqueSortedPages[i] === '...' && finalPages[finalPages.length - 1] === '...') {
        // Skip if previous element was also '...'
        continue;
      }
      finalPages.push(uniqueSortedPages[i]);
    }
  
    return finalPages;
  };