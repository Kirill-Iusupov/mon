import { useTranslation } from '~shared/lib/i18n/i18n';

import { PlusIcon, UpdateIcon } from '~shared/ui';

import styles from './doc.module.scss';

export interface DocEditButtonProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  fileName?: string;
}

export const DocEditButton: React.FC<DocEditButtonProps> = ({
  id = 'file',
  fileName,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <input type="file" id={id} hidden onChange={onChange} />

      <label htmlFor={id} className={styles.label}>
        {fileName ? <UpdateIcon /> : <PlusIcon />}
        <h3 className={styles.name}>{fileName ? t('actions.update') : t('actions.upload')}</h3>
      </label>
    </>
  );
};
