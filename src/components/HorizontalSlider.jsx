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
        //
        // `proximity` not `mandatory`: mandatory fought the reader's thumb and
        // made vertical scrolling feel blocked on the "about" and "how we
        // teach" sections. `touch-action: pan-x pan-y` keeps vertical panning
        // available over the cards, and `overscroll-x-contain` stops the swipe
        // from leaking out to the page once the row ends.
        'flex snap-x snap-proximity overflow-x-auto overscroll-x-contain gap-4 pb-4 -mx-5 px-5 ' +
        '[touch-action:pan-x_pan-y] [-webkit-overflow-scrolling:touch] ' +
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
