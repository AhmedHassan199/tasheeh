// Single-row horizontal scroll on small viewports, normal grid on larger ones.
// Children render once; the layout class controls the scroll behaviour.
//
// Usage:
//   <HorizontalSlider className="lg:grid lg:grid-cols-3 lg:gap-6">
//     {items.map(...)}
//   </HorizontalSlider>
//
// On mobile every direct child becomes a horizontal-scroll snap card.
export function HorizontalSlider({ children, className = '', itemClassName = '' }) {
  return (
    <div
      className={
        // Mobile: horizontal scroll with snap points.
        'flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 -mx-5 px-5 ' +
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden ' +
        // Desktop overrides supplied by the parent.
        className
      }
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={child?.key ?? i}
              className={
                'shrink-0 w-[85%] sm:w-[60%] md:w-[45%] snap-start ' +
                // Reset on lg+
                'lg:w-auto lg:shrink ' +
                itemClassName
              }
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
