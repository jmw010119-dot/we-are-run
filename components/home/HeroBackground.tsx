export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-run-bg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(183,255,42,0.18),transparent_28rem),radial-gradient(circle_at_82%_28%,rgba(91,141,255,0.13),transparent_24rem),linear-gradient(180deg,#070B0E_0%,#081015_52%,#070B0E_100%)]" />
      <div className="absolute left-1/2 top-[-18rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-run-lime/10 blur-[130px]" />
      <div className="absolute bottom-10 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-run-lime/10 blur-[115px]" />
      <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-run-bg to-transparent" />
    </div>
  );
}
