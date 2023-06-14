import { differenceInCalendarDays, format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import { numericFormatter } from 'react-number-format';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';
import { Penulis } from '@/types/entity/manga';

type LibraryCardProps = {
  id: string;
  name: string;
  author: Penulis;
  imageSrc: string;
  volume: number;
  rentDate: Date;
  dueDate: Date;
  fine: number;
};

export default function LibraryCard({
  name,
  author,
  imageSrc,
  volume,
  rentDate,
  dueDate,
  fine,
}: LibraryCardProps) {
  const [src, setSrc] = useState(imageSrc);

  const difference = differenceInCalendarDays(dueDate, new Date());

  return (
    <div className='flex flex-row w-full h-[244px] bg-base-light rounded-xl overflow-hidden'>
      <div className='relative w-48 h-full cursor-pointer'>
        <Image
          src={src}
          alt='manga-cover'
          width='200'
          height='300'
          onError={() => setSrc('/images/error.jpg')}
          className='w-full h-full object-cover'
        />
        <div className='absolute w-full space-y-1 px-3 py-1.5 bottom-0 bg-teal-900 opacity-90'>
          <div className='-space-y-1 text-base-surface hover:text-teal-200'>
            <Typography variant='p' weight='bold'>
              {name}
            </Typography>
            <Typography variant='c'>
              {author.nama_belakang +
                (author.nama_depan && `, ${author.nama_depan}`)}
            </Typography>
          </div>
        </div>
      </div>

      <div className='relative flex flex-1 flex-col text-teal-600'>
        <div className='flex-1 space-y-1.5 p-3 overflow-y-hidden hover:overflow-y-auto'>
          <Typography
            variant='c'
            weight='bold'
            className='flex flex-row gap-1.5'
          >
            Vol {volume} •{' '}
            {difference > 0 ? (
              <span>Tersisa {difference} hari</span>
            ) : (
              <span className='text-red-200 '>
                Terlambat {-difference} hari
              </span>
            )}
          </Typography>
          <div>
            <Typography variant='c' className='text-teal-600'>
              Tanggal Peminjaman
            </Typography>
            <Typography variant='c' className='text-base-icon'>
              {format(rentDate, 'dd MMMM y')}
            </Typography>
          </div>
          <div>
            <Typography variant='c' className='text-teal-600'>
              Batas Pengembalian
            </Typography>
            <Typography variant='c' className='text-base-icon'>
              {format(dueDate, 'dd MMMM y')}
            </Typography>
          </div>
          <div>
            <Typography variant='c' className='text-teal-600'>
              Denda Terlambat
            </Typography>
            <Typography variant='c' className='text-base-icon'>
              Rp {numericFormatter(fine.toString(), { thousandSeparator: '.' })}
            </Typography>
          </div>
        </div>
        <div className='h-14 w-full' />

        <div className='absolute bottom-0 w-full h-14 flex flex-row gap-2.5 p-3 bg-base-outline overflow-x-scroll scrollbar-hide'>
          <Button variant='secondary' className='bg-transparent p-2.5 flex-1'>
            Perpanjang
          </Button>
          <Button className='p-2.5 flex-1'>Kembalikan</Button>
        </div>
      </div>
    </div>
  );
}
