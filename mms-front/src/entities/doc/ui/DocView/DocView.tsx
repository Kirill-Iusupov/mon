import { ReactNode } from 'react';

import { Box, FileButton, Labeled } from '~shared/ui';

import { IDoc } from '../../model';

export interface DocViewProps {
  doc: IDoc;
  editDocSlot: ReactNode;
}

const DocUrl = `${import.meta.env.VITE_API_FILESTORAGE_URL}/elumutu/api/doc/`;

export const DocView: React.FC<DocViewProps> = ({ doc, editDocSlot }) => {
  if (!doc) {
    return null;
  }

  return (
    <>
      <div className="grid gap-4 w-full">
        <Labeled label={doc?.document} required={doc?.required}>
          <div />
          <div />
          <div className="flex gap-2.5 sm:grid">
            {doc.document_url ? (
              <FileButton
                title={String(doc.document_url).split('_')[2]}
                target="_blank"
                href={`${DocUrl}${doc.document_url}`}
                rel="noreferrer"
              />
            ) : null}
            {editDocSlot}
          </div>
        </Labeled>
      </div>
    </>
  );
};
