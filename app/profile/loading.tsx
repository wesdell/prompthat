import Image from 'next/image';

export default function Loading () {
  return (
    <div className="w-full flex-center">
      <Image
        src="/icons/loader.svg"
        width={50}
        height={50}
        alt="Loading..."
        className="object-contain"
      />
    </div>
  );
}
