'use client';

import { useCallback, useState } from 'react';

/**
 * Tracks how many ImageUpload / FileUpload / MultiImageUpload children
 * are mid-flight so the parent form can disable its Save button until
 * every queued upload has streamed back its Vercel Blob URL.
 *
 * Without this guard, an admin who clicks Save while an upload is
 * still in progress would persist the OLD URL to the DB; the new
 * Blob lands in storage but is never referenced from the row, and the
 * page silently keeps showing the previous image.
 *
 * Usage:
 *
 *     const { isUploading, onUploadingChange } = useUploadGuard();
 *     <ImageUpload onUploadingChange={onUploadingChange} ... />
 *     <Button disabled={isUploading} type="submit">Save</Button>
 */
export function useUploadGuard() {
  const [count, setCount] = useState(0);
  const onUploadingChange = useCallback((uploading: boolean) => {
    setCount((c) => (uploading ? c + 1 : Math.max(0, c - 1)));
  }, []);
  return { isUploading: count > 0, onUploadingChange };
}
