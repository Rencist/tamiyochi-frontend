import { Popover } from '@headlessui/react';
import { useState } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { IoIosArrowDown } from 'react-icons/io';

/* TODO */
import clsxm from '@/lib/clsxm';

type FilterProps = {
  filters: string[];
  placeholder: string;
  multiple?: boolean;
  defaultValue?: string;
  onFilterChange?: (newValue: string[]) => void;
};

export default function Filter({
  filters,
  placeholder,
  multiple = false,
  defaultValue,
  onFilterChange,
}: FilterProps) {
  const [filterActive, setFilterActive] = useState<string[]>([
    defaultValue ? defaultValue : '',
  ]);

  const onFilterClick = (filter: string) => {
    const newFilterState = filterActive.includes(filter)
      ? multiple
        ? filterActive.filter((item) => item !== filter)
        : []
      : multiple
      ? [...filterActive, filter]
      : [filter];

    setFilterActive(newFilterState);
    onFilterChange && onFilterChange(newFilterState);
  };

  return (
    <Popover as='div' className='font-secondary text-sm relative font- w-full'>
      <Popover.Button
        className={clsxm(
          'w-full h-9 flex flex-row items-center gap-1.5 px-3 rounded-md',
          'outline-none focus:ring-1 focus:ring-inset focus:ring-teal',
          'bg-base-light',
          'text-base-icon text-left'
        )}
      >
        <div className='relative h-full flex-1'>
          <div className='absolute flex items-center w-full h-full overflow-hidden'>
            {!filterActive.length ? (
              <>{placeholder}</>
            ) : (
              <div className='flex flex-row gap-1.5'>
                {filterActive.map((filter) => (
                  <div
                    key={filter}
                    className='text-base-surface px-3 bg-teal-600 rounded-3xl'
                  >
                    {filter}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <IoIosArrowDown className='text-base' />
      </Popover.Button>
      <Popover.Panel
        className={clsxm(
          'absolute z-10 w-full rounded-md',
          'outline-none',
          'bg-base-light',
          'text-base-icon',
          'drop-shadow-lg'
        )}
      >
        {filters.map((filter, index) => (
          <div
            key={index}
            className={clsxm(
              'flex flex-row justify-between items-center gap-1.5 px-3 py-1.5 select-none',
              'hover:bg-teal-50 hover:text-teal-600'
            )}
            onClick={() => onFilterClick(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}

            {filterActive.includes(filter) && (
              <div className='p-1 bg-teal rounded-full'>
                <ImCheckmark className='text-base-surface text-xs' />
              </div>
            )}
          </div>
        ))}
      </Popover.Panel>
    </Popover>
  );
}
