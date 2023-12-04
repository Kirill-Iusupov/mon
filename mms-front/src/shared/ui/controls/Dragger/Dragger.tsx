import { FC } from 'react';
import Upload from 'antd/es/upload';
import type { UploadProps } from 'antd/es/upload/interface';

import { InboxIcon } from '~shared/ui/Icons';
import { useTranslation } from '~shared/lib/i18n';

export const Dragger: FC<UploadProps> = ({ onDrop, onChange }) => {
  const { t } = useTranslation();

  return (
    <Upload.Dragger onDrop={onDrop} onChange={onChange} multiple={false}>
      <div className="grid gap-5">
        <p className="flex justify-center items-center">
          <InboxIcon />
        </p>
        <p className="ant-upload-text">{t('actions.drag')}</p>
      </div>
    </Upload.Dragger>
  );
};
