/**
 * Standalone reader layout — no site Header / Footer / nav. Pages in this
 * route group (currently the journal flipbook reader) take over the entire
 * viewport so they can render at maximum size. Closing the browser tab is
 * the intended way to leave.
 */
export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-[#040814] text-white">{children}</div>;
}
