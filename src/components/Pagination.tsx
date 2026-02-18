import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from "@/styles/Pagination.module.css"

interface PaginationData {
    current_page: number;
    per_page: number;
    total_posts: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
    next_page: number | null;
    prev_page: number | null;
}

interface PaginationProps {
    pagination: PaginationData;
    /* basePath?: string; */
}

const Pagination: React.FC<PaginationProps> = ({ pagination /* , basePath = "" */ }) => {
    const { current_page, total_pages, has_next, has_prev, next_page, prev_page, total_posts } = pagination;
    const router = useRouter();

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, current_page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(total_pages, startPage + maxPagesToShow - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (total_pages <= 1) return null;

    return (
        <div className={styles.paginationContainer}>
            {/* Mobile-friendly info */}
            <div className={styles.paginationInfo}>
                Página {current_page} de {total_pages} • {total_posts} artículos
            </div>

            {/* Pagination controls */}
            <div className={styles.paginationControls}>
                {/* Previous button */}
                {has_prev ? (
                    <Button
                        onClick={() => {
                            const url = prev_page === 1 ? '/' : `/?page=${prev_page}`;
                            router.push(url);
                        }}
                        className={styles.paginationButton}
                    >
                        <ChevronLeft className={styles.paginationIconLeft} />
                        <span className={styles.paginationText}>Anterior</span>
                    </Button>
                ) : (
                    <Button 
                        disabled
                        className={styles.paginationButtonDisabled}
                    >
                        <ChevronLeft className={styles.paginationIconLeft} />
                        <span className={styles.paginationText}>Anterior</span>
                    </Button>
                )}

                {/* Page numbers */}
                <div className={styles.paginationNumbersContainer}>
                    {getPageNumbers().map((page) => (
                        <Button
                            key={page}
                            onClick={() => {
                                const url = page === 1 ? '/' : `/?page=${page}`;
                                router.push(url);
                            }}
                            className={`${styles.paginationNumberButton} ${
                                page === current_page
                                    ? styles.paginationNumberButtonActive
                                    : styles.paginationNumberButtonInactive
                            }`}
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                {/* Mobile: Current page indicator */}
                <div className={styles.paginationMobileIndicator}>
                    {current_page}
                </div>

                {/* Next button */}
                {has_next ? (
                    <Button
                        onClick={() => {
                            const url = `/?page=${next_page}`;
                            router.push(url);
                        }}
                        className={styles.paginationButton}
                    >
                        <span className={styles.paginationText}>Siguiente</span>
                        <ChevronRight className={styles.paginationIconRight} />
                    </Button>
                ) : (
                    <Button
                        disabled
                        className={styles.paginationButtonDisabled}
                    >
                        <span className={styles.paginationText}>Siguiente</span>
                        <ChevronRight className={styles.paginationIconRight} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Pagination;