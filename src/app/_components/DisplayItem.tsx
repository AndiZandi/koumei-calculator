import Image from 'next/image';
import { ReactNode } from 'react';

export interface DisplayItemProps {
  name: string;
  displayName: string;
  image: string;
  onClick: (name: string) => void;
  overlay: 'none' | 'checkmark' | 'blueprint' | 'crafted';
}

export const DisplayItem = ({
  onClick,
  name,
  overlay,
  image,
  displayName,
}: DisplayItemProps): ReactNode => {
  return (
    <div
      className='relative w-full border border-red-950 rounded-lg h-auto flex flex-col hover:cursor-pointer hover:scale-105 select-none'
      onClick={() => onClick(name)}
    >
      {overlay !== 'none' && (
        <div className='absolute top-0 left-0 size-full z-10 bg-black/80 flex items-center justify-center rounded-lg text-white'>
          {overlay === 'checkmark' && <CheckMarkSVG />}
          {overlay === 'blueprint' && <BlueprintSVG />}
          {overlay === 'crafted' && <CraftedSVG />}
        </div>
      )}
      <div className='relative w-full h-[170px] overflow-hidden rounded-t-lg'>
        <Image
          src={image}
          alt={displayName}
          fill
          style={{ objectFit: 'cover' }}
          className=''
        />
      </div>
      <div className='bg-red-950 text-white rounded-b-lg py-1 px-2'>
        <p>{displayName}</p>
      </div>
    </div>
  );
};

const CheckMarkSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='48'
    height='48'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-check'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M5 12l5 5l10 -10' />
  </svg>
);

const BlueprintSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='48'
    height='48'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-map-search'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5' />
    <path d='M9 4v13' />
    <path d='M15 7v5' />
    <path d='M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
    <path d='M20.2 20.2l1.8 1.8' />
  </svg>
);

const CraftedSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='48'
    height='48'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-map-check'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v9' />
    <path d='M9 4v13' />
    <path d='M15 7v8' />
    <path d='M15 19l2 2l4 -4' />
  </svg>
);
