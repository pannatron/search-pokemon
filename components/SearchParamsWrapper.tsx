'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface SearchParamsWrapperProps {
  onSearchParams: (name: string | null) => void;
}

function SearchParamsContent({ onSearchParams }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  onSearchParams(name);
  return null;
}

export default function SearchParamsWrapper({ onSearchParams }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={null}>
      <SearchParamsContent onSearchParams={onSearchParams} />
    </Suspense>
  );
}
