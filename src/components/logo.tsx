import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
       <Image src="/logo.png" alt="CarbonSight AI Logo" width={40} height={40} />
      <span className="font-semibold text-xl text-foreground -translate-y-1">
        CarbonSight <span className="text-primary">AI</span>
      </span>
    </div>
  );
}
