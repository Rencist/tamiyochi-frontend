import { HiOutlineInformationCircle } from 'react-icons/hi';

import Typography from '@/components/typography/Typography';

export default function HelperText({ children }: { children: string }) {
  return (
    <div className='flex space-x-1'>
      <HiOutlineInformationCircle className='shrink-0 text-blue' />
      <Typography variant='c' className='!leading-tight text-base-secondary'>
        {children}
      </Typography>
    </div>
  );
}
