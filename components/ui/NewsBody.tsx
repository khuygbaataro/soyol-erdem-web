import { Fragment, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { parseNewsBlocks, type NewsImageAlign } from '@/lib/news-content';

interface NewsBodyProps {
  /** Raw `News.body` — either a blocks document or legacy plain text. */
  body: string;
}

function alignClass(align: NewsImageAlign): string {
  if (align === 'left') return 'mr-auto';
  if (align === 'right') return 'ml-auto';
  return 'mx-auto';
}

function captionAlignClass(align: NewsImageAlign): string {
  if (align === 'left') return 'text-left';
  if (align === 'right') return 'text-right';
  return 'text-center';
}

/** Split a text run into paragraphs, dropping blank ones. */
function paragraphs(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p, i) => <p key={`${keyPrefix}-${i}`}>{p}</p>);
}

/**
 * Renders a news article body. A blocks document (new editor) is rendered as
 * interleaved paragraphs and sized/aligned images; legacy plain text falls
 * back to the original paragraph split. Meant to live inside a container that
 * provides vertical rhythm (e.g. `space-y-5`).
 */
export function NewsBody({ body }: NewsBodyProps) {
  const blocks = parseNewsBlocks(body);

  if (!blocks) {
    return <>{paragraphs(body, 'legacy')}</>;
  }

  return (
    <>
      {blocks.map((block, idx) => {
        if (block.type === 'text') {
          return (
            <Fragment key={`b-${idx}`}>
              {paragraphs(block.text, `b-${idx}`)}
            </Fragment>
          );
        }
        return (
          <figure
            key={`b-${idx}`}
            className={cn('max-w-full', alignClass(block.align))}
            style={{ width: `${block.width}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.url}
              alt={block.caption || ''}
              loading="lazy"
              className="h-auto w-full rounded-image"
            />
            {block.caption && (
              <figcaption
                className={cn(
                  'mt-2 text-sm italic text-text-muted',
                  captionAlignClass(block.align),
                )}
              >
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </>
  );
}
