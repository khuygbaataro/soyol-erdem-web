'use client';

import { useEffect, useState, useTransition } from 'react';
import { Plus, Save, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { PageHeader } from '@/components/admin/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { inputClasses, textareaClasses } from '@/components/admin/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useUploadGuard } from '@/lib/use-upload-guard';

interface TL { id: string; year: number; title: string; description: string; active: boolean; order: number; }
interface AC { id: string; year: number; title: string; image: string; active: boolean; order: number; }

type EditTL = Omit<TL, 'id'> & { id?: string };
type EditAC = Omit<AC, 'id'> & { id?: string };

const emptyTL = (): EditTL => ({ year: new Date().getFullYear(), title: '', description: '', active: true, order: 0 });
const emptyAC = (): EditAC => ({ year: new Date().getFullYear(), title: '', image: '', active: true, order: 0 });

export default function HistoryAdminPage() {
  const [timeline, setTimeline] = useState<TL[]>([]);
  const [certs, setCerts]       = useState<AC[]>([]);
  const [editTL, setEditTL]     = useState<EditTL | null>(null);
  const [editAC, setEditAC]     = useState<EditAC | null>(null);
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  async function load() {
    const [t, a] = await Promise.all([fetch('/api/timeline').then(r=>r.json()), fetch('/api/accreditation').then(r=>r.json())]);
    setTimeline(t); setCerts(a);
  }
  useEffect(() => { load(); }, []);

  /* ── Timeline save ── */
  function saveTL() {
    if (!editTL) return;
    startTransition(async () => {
      const url = editTL.id ? `/api/timeline/${editTL.id}` : '/api/timeline';
      const res = await fetch(url, { method: editTL.id ? 'PUT' : 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(editTL) });
      if (!res.ok) { toast.error('Хадгалахад алдаа гарлаа'); return; }
      toast.success('Хадгалагдлаа'); setEditTL(null); load();
    });
  }
  async function deleteTL(id: string) {
    if (!confirm('Устгах уу?')) return;
    await fetch(`/api/timeline/${id}`, { method: 'DELETE' });
    toast.success('Устгагдлаа'); load();
  }

  /* ── Accreditation save ── */
  function saveAC() {
    if (!editAC) return;
    startTransition(async () => {
      const url = editAC.id ? `/api/accreditation/${editAC.id}` : '/api/accreditation';
      const res = await fetch(url, { method: editAC.id ? 'PUT' : 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(editAC) });
      if (!res.ok) { toast.error('Хадгалахад алдаа гарлаа'); return; }
      toast.success('Хадгалагдлаа'); setEditAC(null); load();
    });
  }
  async function deleteAC(id: string) {
    if (!confirm('Устгах уу?')) return;
    await fetch(`/api/accreditation/${id}`, { method: 'DELETE' });
    toast.success('Устгагдлаа'); load();
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <PageHeader
        title="Сургуулийн түүх"
        subtitle="Цаг хугацааны шугам + Магадлан итгэмжлэлийн гэрчилгээ"
        breadcrumb={[{ label: 'Хянах самбар', href: '/admin/dashboard' }, { label: 'Түүх' }]}
      />

      {/* ── Timeline ── */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold uppercase tracking-wider text-navy-900">Цаг хугацааны шугам</h2>
          <button onClick={() => setEditTL(emptyTL())} className="inline-flex items-center gap-2 rounded-button bg-navy-900 px-4 py-2 text-sm font-bold text-white hover:bg-gold-500 hover:text-navy-900 transition-colors">
            <Plus className="h-4 w-4" /> Шинэ нэмэх
          </button>
        </div>

        {editTL && (
          <Card hover={false} className="mb-4 space-y-3 border-gold-500">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy-900">{editTL.id ? 'Засах' : 'Шинэ нэмэх'}</h3>
              <button onClick={() => setEditTL(null)}><X className="h-4 w-4 text-text-muted" /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-text-muted">Он</label>
                <input type="number" value={editTL.year} onChange={e=>setEditTL({...editTL, year:Number(e.target.value)})} className={inputClasses} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-text-muted">Дараалал</label>
                <input type="number" value={editTL.order} onChange={e=>setEditTL({...editTL, order:Number(e.target.value)})} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-muted">Гарчиг</label>
              <input value={editTL.title} onChange={e=>setEditTL({...editTL, title:e.target.value})} className={inputClasses} placeholder="Үүсгэн байгуулсан" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-muted">Тайлбар</label>
              <textarea rows={3} value={editTL.description} onChange={e=>setEditTL({...editTL, description:e.target.value})} className={textareaClasses} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editTL.active} onChange={e=>setEditTL({...editTL, active:e.target.checked})} />
              <span className="font-semibold">Идэвхтэй</span>
            </label>
            <button onClick={saveTL} disabled={pending} className="inline-flex items-center gap-2 rounded-button bg-navy-900 px-4 py-2 text-sm font-bold text-white hover:bg-gold-500 hover:text-navy-900 transition-colors disabled:opacity-50">
              <Save className="h-4 w-4" /> Хадгалах
            </button>
          </Card>
        )}

        <div className="overflow-hidden rounded-card border border-border-light bg-white shadow-card">
          <table className="w-full text-sm">
            <thead className="border-b bg-cream-soft text-xs font-bold uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-4 py-3 text-left">Он</th>
                <th className="px-4 py-3 text-left">Гарчиг</th>
                <th className="px-4 py-3 text-left">Статус</th>
                <th className="px-4 py-3 text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {timeline.map(t => (
                <tr key={t.id} className="hover:bg-cream-soft/40">
                  <td className="px-4 py-3 font-bold text-gold-500">{t.year}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy-900">{t.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">{t.description}</p>
                  </td>
                  <td className="px-4 py-3">{t.active ? <Badge variant="navy">Идэвхтэй</Badge> : <Badge variant="outline">Нуусан</Badge>}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditTL({ id:t.id, year:t.year, title:t.title, description:t.description, active:t.active, order:t.order })} className="rounded-button border px-3 py-1.5 text-xs font-semibold text-navy-900 hover:bg-cream-soft">Засах</button>
                      <button onClick={() => deleteTL(t.id)} className="rounded-button px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Accreditation ── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold uppercase tracking-wider text-navy-900">Магадлан итгэмжлэлийн гэрчилгээ</h2>
          <button onClick={() => setEditAC(emptyAC())} className="inline-flex items-center gap-2 rounded-button bg-navy-900 px-4 py-2 text-sm font-bold text-white hover:bg-gold-500 hover:text-navy-900 transition-colors">
            <Plus className="h-4 w-4" /> Шинэ нэмэх
          </button>
        </div>

        {editAC && (
          <Card hover={false} className="mb-4 space-y-3 border-gold-500">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy-900">{editAC.id ? 'Засах' : 'Шинэ нэмэх'}</h3>
              <button onClick={() => setEditAC(null)}><X className="h-4 w-4 text-text-muted" /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-text-muted">Он</label>
                <input type="number" value={editAC.year} onChange={e=>setEditAC({...editAC, year:Number(e.target.value)})} className={inputClasses} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-text-muted">Дараалал</label>
                <input type="number" value={editAC.order} onChange={e=>setEditAC({...editAC, order:Number(e.target.value)})} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-muted">Гарчиг</label>
              <input value={editAC.title} onChange={e=>setEditAC({...editAC, title:e.target.value})} className={inputClasses} placeholder="Анхны магадлан итгэмжлэл" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text-muted">Гэрчилгээний зураг</label>
              <ImageUpload value={editAC.image} onChange={img=>setEditAC({...editAC, image:img})} folder="misc" onUploadingChange={onUploadingChange} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editAC.active} onChange={e=>setEditAC({...editAC, active:e.target.checked})} />
              <span className="font-semibold">Идэвхтэй</span>
            </label>
            <button onClick={saveAC} disabled={pending || isUploading} className="inline-flex items-center gap-2 rounded-button bg-navy-900 px-4 py-2 text-sm font-bold text-white hover:bg-gold-500 hover:text-navy-900 transition-colors disabled:opacity-50">
              <Save className="h-4 w-4" /> {isUploading ? 'Зураг ачаалж байна…' : 'Хадгалах'}
            </button>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map(c => (
            <Card key={c.id} hover={false} className="relative">
              {c.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt={c.title} className="mb-3 aspect-[3/4] w-full rounded-sm border object-contain bg-cream-soft p-2" />
              )}
              <p className="text-xs font-bold text-gold-500">{c.year} он</p>
              <p className="font-semibold text-navy-900">{c.title}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditAC({ id:c.id, year:c.year, title:c.title, image:c.image, active:c.active, order:c.order })} className="rounded-button border px-3 py-1.5 text-xs font-semibold text-navy-900 hover:bg-cream-soft">Засах</button>
                <button onClick={() => deleteAC(c.id)} className="rounded-button px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
