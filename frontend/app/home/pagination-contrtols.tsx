// components/pagination-controls.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { generatePaginationPages } from '@/utils/pagination';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    perPageOptions?: number[];
}

export function PaginationControls({
    currentPage,
    totalPages,
    perPageOptions = [5, 10, 20, 50],
}: PaginationControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Create a new URLSearchParams object with the current search params
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const currentPerPage = parseInt(searchParams.get('per_page') || '10');

    const paginationPages = generatePaginationPages(currentPage, totalPages);

    const handlePerPageChange = (value: string) => {
        router.push(
            `${pathname}?${createQueryString('per_page', value)}&${createQueryString('page', '1')}`
        );
    };

    return (
        <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-2">
                <span>Items per page:</span>
                <Select value={currentPerPage.toString()} onValueChange={handlePerPageChange}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                        {perPageOptions.map((option) => (
                            <SelectItem key={option} value={option.toString()}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={`${pathname}?${createQueryString('page', (currentPage - 1).toString())}`}
                            aria-disabled={currentPage <= 1}
                            tabIndex={currentPage <= 1 ? -1 : undefined}
                            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
                        />
                    </PaginationItem>

                    {paginationPages.map((page, index) => (
                        <PaginationItem key={index}>
                            {page === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    href={`${pathname}?${createQueryString('page', page.toString())}`}
                                    isActive={page === currentPage}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href={`${pathname}?${createQueryString('page', (currentPage + 1).toString())}`}
                            aria-disabled={currentPage >= totalPages}
                            tabIndex={currentPage >= totalPages ? -1 : undefined}
                            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}