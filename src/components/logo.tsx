export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M25 10C15 10 6.5 25 6.5 25C6.5 25 15 40 25 40C35 40 43.5 25 43.5 25C43.5 25 35 10 25 10Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 32C28.866 32 32 28.866 32 25C32 25 32 21.134 28.134 18C28.134 22.866 25 25 25 25C25 25 21.134 21.866 18 18C21.866 21.134 25 25 25 25C21.134 25 18 28.866 18 25C18 28.866 21.134 32 25 32Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-semibold text-xl text-foreground">
        CarbonSight <span className="text-primary">AI</span>
      </span>
    </div>
  );
}
