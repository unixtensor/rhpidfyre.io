type SvgDefaultSize = "20"
type SvgSize<T extends string = SvgDefaultSize> = `${T}px` | `${SvgDefaultSize}px`
type SvgColor<T extends string = "e8eaed"> = `#${T}`
export interface SvgProps {
	Height: SvgSize,
	Width: SvgSize,
	Color: SvgColor
}