import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

export default function Score() {
  const [score, setScore] = useState(0);
  return (
    <div className='flex flex-col gap-6 w-full'>
      <Typography weight='semibold' className='text-teal-600'>
        Skor Pembaca
      </Typography>

      <div className='flex flex-row justify-between p-3 bg-base-surface rounded-lg'>
        <div className='flex flex-row gap-8'>
          {Array.from({ length: 10 }, (_, i) => i).map((index) => (
            <div key={index}>
              <AiFillStar
                className={clsxm(
                  'text-5xl text-base-inline cursor-pointer',
                  index <= score && 'text-yellow-500'
                )}
                onMouseEnter={() => setScore(index)}
              />
            </div>
          ))}
        </div>
        <Typography variant='h5' weight='bold' className='text-teal-600'>
          {score + 1}/10
        </Typography>
      </div>
    </div>
  );
}
