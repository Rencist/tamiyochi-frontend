import Typography from '@/components/typography/Typography';
import VolumeCard from '@/pages/manga/components/VolumeCard';
import { Manga } from '@/types/entity/manga';

export default function Volume({ manga }: { manga: Manga[] }) {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <Typography weight='semibold' className='text-teal-600'>
        Volume Tersedia
      </Typography>
      <div className='flex flex-col gap-6'>
        {manga.map(({ volume, harga_sewa, jumlah_tersedia }) => (
          <VolumeCard
            key={volume}
            volume={volume}
            harga={harga_sewa}
            tersedia={jumlah_tersedia}
          />
        ))}
      </div>
    </div>
  );
}
