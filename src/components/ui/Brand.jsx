export default function Brand({ compact = false, className = "" }) {
  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[11px] border border-white/12 bg-white/[0.04]"
      >
        <span className="grid grid-cols-2 gap-[3px]">
          <i className="block h-[6px] w-[6px] rounded-full bg-gblue" />
          <i className="block h-[6px] w-[6px] rounded-full bg-gred" />
          <i className="block h-[6px] w-[6px] rounded-full bg-gyellow" />
          <i className="block h-[6px] w-[6px] rounded-full bg-ggreen" />
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-tight text-white">
          GDGOC
        </span>
        {!compact && (
          <span className="mt-[3px] text-[9.5px] font-medium uppercase tracking-[0.22em] text-white/45">
            WIT Solapur
          </span>
        )}
      </span>
    </span>
  );
}
