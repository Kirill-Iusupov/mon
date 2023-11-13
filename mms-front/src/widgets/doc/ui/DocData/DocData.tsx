import { FC, useEffect } from 'react';

import { DocView, useDocList, useSetDocList } from '~entities/doc';
import { useUser } from '~entities/user';
import { DocEditButton } from '~features/doc';
import { useNotification } from '~shared/ui';
// import { useTranslation } from '~shared/lib/i18n/i18n';

export interface DocDataProps extends Partial<ComponentWithChild> {
  id?: number;
}

export const DocData: FC<DocDataProps> = ({ id = 0 }) => {
  // const { t } = useTranslation();

  const docList = useDocList();
  const setDocList = useSetDocList();
  const notification = useNotification();
  const user = useUser();

  useEffect(() => {
    if (!docList) {
      if (user?.type) {
        setDocList({ role: user?.type, id });
      }
    }
  }, [setDocList, docList]);

  if (!user?.type) {
    return null;
  }

  return (
    <>
      {notification.contextHolder}

      {docList?.map((doc, index) => (
        <DocView
          key={index}
          doc={doc}
          editDocSlot={user?.type === 1 ? <DocEditButton doc={doc} /> : null}
        />
      ))}
    </>
  );
};
