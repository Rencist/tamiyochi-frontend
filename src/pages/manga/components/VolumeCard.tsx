import { useState } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { numericFormatter } from 'react-number-format';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';

type VolumeCardProps = {
  volume: number;
  harga: number;
  tersedia: number;
};

export default function VolumeCard({
  volume,
  harga,
  tersedia,
}: VolumeCardProps) {
  const [count, setCount] = useState(0);
  return (
    <div
      key={volume}
      className='flex w-full h-24 rounded-lg bg-base-surface overflow-hidden'
    >
      <div className='flex justify-center items-center w-24 bg-base-outline'>
        <Typography variant='h5' weight='semibold' className='text-teal-600'>
          {volume}
        </Typography>
      </div>

      <div className='flex-1 flex flex-row justify-between items-center px-6'>
        <div className='flex flex-col'>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Volume {volume}
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            Rp&nbsp;
            {numericFormatter(harga.toString(), {
              thousandSeparator: '.',
            })}
            &nbsp;/ 7 hari
          </Typography>
        </div>
        <div className='flex flex-row gap-6'>
          {/* Set Rent Count */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex flex-row justify-between'>
              <Typography variant='c' className='text-base-icon'>
                Tersisa
              </Typography>
              <Typography
                variant='c'
                weight='semibold'
                className='text-teal-600'
              >
                {tersedia} Vol
              </Typography>
            </div>
            <Typography
              variant='c'
              weight='semibold'
              className='flex flex-row justify-between items-center w-24 h-8 px-2 py-1 ring-1 ring-inset ring-teal rounded-md text-teal-600'
            >
              <LuMinus
                className='text-lg cursor-pointer text-teal'
                onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
              />
              {count}
              <LuPlus
                className='text-lg cursor-pointer text-teal'
                onClick={() => setCount((prev) => Math.min(prev + 1, tersedia))}
              />
            </Typography>
          </div>

          {/* Add To Cart */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex flex-row justify-between gap-2'>
              <Typography variant='c' className='text-base-icon'>
                Subtotal
              </Typography>
              <Typography
                variant='c'
                weight='semibold'
                className='text-teal-600'
              >
                Rp&nbsp;
                {numericFormatter((count * harga).toString(), {
                  thousandSeparator: '.',
                })}
              </Typography>
            </div>
            <Button size='small' leftIconClassName='text-lg' leftIcon={LuPlus}>
              Pinjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
