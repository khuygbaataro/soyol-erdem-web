import Link from 'next/link';
import { FileX2 } from 'lucide-react';

export default function GereeNotFound() {
  return (
    <div className="mx-auto max-w-md rounded-card border border-border-light bg-white p-8 text-center shadow-sm">
      <FileX2 className="mx-auto h-12 w-12 text-text-muted" />
      <h1 className="mt-4 text-xl font-bold text-navy-900">Гэрээ олдсонгүй</h1>
      <p className="mt-2 text-sm text-text-body">
        Холбоос буруу эсвэл хүчингүй болсон байна. Элсэлтийн албатай холбогдож
        шинэ холбоос авна уу.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-button bg-navy-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-800"
      >
        Нүүр хуудас
      </Link>
    </div>
  );
}
