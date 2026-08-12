export default function Spinner({ size = 'sm' }) {
  const dimensions = size === 'lg' ? 'h-8 w-8' : 'h-4 w-4'
  return (
    <span
      className={`inline-block ${dimensions} animate-spin rounded-full border-2 border-current border-t-transparent`}
      aria-label="Loading"
    />
  )
}
