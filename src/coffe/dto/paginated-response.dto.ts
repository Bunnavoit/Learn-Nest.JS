export class MetadataDto {
  totalItems: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export class PaginatedResponseDto<T> {
  data: T[];
  metadata: MetadataDto;
}
