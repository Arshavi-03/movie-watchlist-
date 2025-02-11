// src/types/api.types.ts
export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export interface MovieApiFilters {
    search?: string;
    genre?: string;
    year?: string;
    rating?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
}