import { useTranslation } from '~shared/lib/i18n/i18n';
import { PlusIcon, UpdateIcon, useNotification } from '~shared/ui';
import { IDoc, useSetDocList } from '~entities/doc';

import { updateDoc } from '../../api';

import styles from './doc.module.scss';

export interface DocEditButtonProps {
  doc: IDoc;
}

export const DocEditButton: React.FC<DocEditButtonProps> = ({ doc }) => {
  const { t } = useTranslation();

  const setDocList = useSetDocList();

  const notification = useNotification();

  const handleUpdate = (selectedFile: File) => {
    // notification.openNotification('Error', 'Select faculty');
    // notification.closeNotification();
    if (!selectedFile) {
      return;
    }

    updateDoc({
      idDoc: doc.id_document,
      selectedFile: selectedFile,
    })
      .then(({ data, error, message }) => {
        if (error && data === false) {
          console.error(message);

          return;
        }

        setDocList({ role: 1, id: 0 });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  if (!doc) {
    return <p>Loading</p>;
  }

  return (
    <>
      {notification.contextHolder}
      <input
        type="file"
        hidden
        id={String(doc.id_document)}
        onChange={(e) => {
          if (e?.target?.files?.length) {
            handleUpdate(e.target.files[0]);
          }
        }}
      />

      <label htmlFor={String(doc.id_document)} className={styles.label}>
        {doc.id_challenger_document ? <UpdateIcon /> : <PlusIcon />}
        <h3 className={styles.name}>
          {doc.id_challenger_document ? t('actions.update') : t('actions.upload')}
        </h3>
      </label>
    </>
  );
};
