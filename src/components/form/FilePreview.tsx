import 'react-image-lightbox/style.css';

import * as React from 'react';
import { HiOutlineExternalLink, HiOutlineTrash } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { TbFileText } from 'react-icons/tb';
import Lightbox from 'react-image-lightbox';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';
import { FileWithPreview } from '@/types/dropzone';

type FilePreviewProps = {
  file: FileWithPreview;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => void;
  readOnly?: boolean;
};

export default function FilePreview({
  file,
  deleteFile,
  readOnly,
}: FilePreviewProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const imageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  return (
    <li
      key={file.name}
      className='w-full flex items-center space-x-2 p-3 bg-yellow-50 rounded-md'
    >
      <div className='w-6 h-6'>
        <TbFileText className='w-full h-full text-teal-400' />
      </div>

      <Typography variant='c' className='flex-1 text-teal-600 truncate'>
        {file.name}
      </Typography>

      {imageTypes.includes(file.type) ? (
        <Button
          icon={IoMdEye}
          size='small'
          variant='primary'
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <ButtonLink
          href={file.preview}
          icon={HiOutlineExternalLink}
          size='small'
          variant='primary'
        />
      )}

      {!readOnly && (
        <Button
          icon={HiOutlineTrash}
          size='small'
          variant='danger'
          onClick={handleDelete}
        />
      )}

      {isOpen && (
        <Lightbox
          mainSrc={file.preview}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </li>
  );
}
