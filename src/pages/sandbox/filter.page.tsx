import React from 'react';

import Filter from '@/components/form/Filter';
import { GENRE } from '@/constant/manga';

export default function FilterPage() {
  const handleFilterChange = () => {
    return;
  };
  return (
    <div className='p-6 max-w-sm'>
      <Filter
        filters={GENRE}
        placeholder='Genre'
        onFilterChange={handleFilterChange}
        multiple
      />
    </div>
  );
}
