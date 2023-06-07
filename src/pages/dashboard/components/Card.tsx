import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useDraggable } from 'react-use-draggable-scroll';

import Typography from '@/components/typography/Typography';
import { Penulis } from '@/types/entity/manga';

type CardProps = {
  name: string;
  author: Penulis[];
  rating: string;
  readers: string;
  imageSrc: string;
  volumes: string;
  year: string;
  synopsis: string;
  genre: string[];
};

export default function Card({
  name,
  author,
  rating,
  readers,
  imageSrc,
  volumes,
  year,
  synopsis,
  genre,
}: CardProps) {
  const [isImageValid, setImageValid] = useState<boolean>(false);
  const [authorIdx, setAuthorIdx] = useState<number>(0);

  useEffect(() => {
    const fetchImage = async () =>
      await fetch(imageSrc)
        .then((res) => {
          if (res.ok) setImageValid(true);
        })
        .catch(() => {
          return;
        });

    setAuthorIdx(Math.floor(Math.random() * author.length));

    fetchImage();
  }, [imageSrc, author]);
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div className='flex flex-row w-full h-60 bg-base-light rounded-xl overflow-hidden'>
      <div className='relative w-48 h-full'>
        {isImageValid ? (
          <Image
            src={imageSrc}
            alt='manga-cover'
            width='193'
            height='244'
            className='h-full'
          />
        ) : (
          <Image
            src='/images/error.jpg'
            alt='manga-cover'
            width='700'
            height='394'
            className='h-full object-cover'
          />
        )}
        <div className='absolute w-full space-y-1 px-3 py-1.5 bottom-0 bg-teal-900 opacity-90 text-base-surface'>
          <div className='-space-y-1'>
            <Typography variant='p' weight='bold'>
              {name}
            </Typography>
            <Typography variant='c'>{`${
              author[authorIdx].nama_depan && author[authorIdx].nama_depan
            } ${author[authorIdx].nama_belakangang}`}</Typography>
          </div>
          <div className='flex flex-row gap-3'>
            <div className='flex flex-row items-center gap-1'>
              <AiFillStar className='text-sm' />
              <Typography variant='c'>{rating}</Typography>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <BsFillPersonFill className='text-sm' />
              <Typography variant='c'>{readers}</Typography>
            </div>
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
            {volumes} vol • {year}
          </Typography>
          <Typography variant='c' className='leading-5'>
            {synopsis}
          </Typography>
        </div>
        <div className='h-12 w-full' />

        <div
          className='absolute bottom-0 w-full flex flex-row gap-2.5 p-3 bg-base-outline overflow-x-scroll scrollbar-hide'
          {...events}
          ref={ref}
        >
          {genre.map((genreName) => (
            <div
              key={genreName}
              className='bg-teal-600 px-3 rounded-3xl whitespace-nowrap'
            >
              <Typography
                variant='c'
                weight='bold'
                className='text-base-surface'
              >
                {genreName}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
