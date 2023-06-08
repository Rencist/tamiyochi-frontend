import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { numericFormatter } from 'react-number-format';
import { useDraggable } from 'react-use-draggable-scroll';

import Typography from '@/components/typography/Typography';
import { Penulis } from '@/types/entity/manga';

type CardProps = {
  id: number;
  name: string;
  author: Penulis;
  score: number;
  readers: number;
  imageSrc: string;
  volumes: string;
  year: string;
  synopsis: string;
  genre: string[];
};

export default function Card({
  id,
  name,
  author,
  score,
  readers,
  imageSrc,
  volumes,
  year,
  synopsis,
  genre,
}: CardProps) {
  const [isImageValid, setImageValid] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchImage = async () =>
      await fetch(imageSrc)
        .then((res) => {
          if (res.ok) setImageValid(true);
        })
        .catch(() => {
          return;
        });

    fetchImage();
  }, [imageSrc, author]);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const handleClick = () => {
    const url = `/manga/${id}`;
    router.push(url);
  };

  return (
    <div className='flex flex-row w-full h-60 bg-base-light rounded-xl overflow-hidden'>
      <div
        className='relative w-48 h-full cursor-pointer'
        onClick={handleClick}
      >
        {isImageValid ? (
          <Image
            src={imageSrc}
            alt='manga-cover'
            width='416'
            height='600'
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
          <div className='flex flex-row gap-3 text-base-surface'>
            <div className='flex flex-row items-center gap-1'>
              <AiFillStar className='text-sm' />
              <Typography variant='c'>{score}</Typography>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <BsFillPersonFill className='text-sm' />
              <Typography variant='c'>
                {numericFormatter(readers.toString(), {
                  thousandSeparator: '.',
                })}
              </Typography>
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
