import { ReactNode, useState } from 'react';

import { Button, Input } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n';

import { signIn } from '../../api';
import { SignInData } from '../../model';

import styles from './style.module.scss';

export interface SignInFormProps {
  onSignIn: (payload: SignInData) => void;
  formId?: string;
  langSlot?: ReactNode;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSignIn,
  langSlot,
  formId = 'form:sign-in',
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [log, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit =
    // const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      // mockSignIn(payload).then(({ data }) => {

      signIn({ login: log, password: pass })
        .then(({ data, error, message }) => {
          if (error && data === false) {
            console.error(message);
            setMessage(t('auth:passwordError') || 'Неправильный логин или пароль!');

            return;
          }

          onSignIn(data);
          setMessage('');
        })
        .catch((err) => {
          console.error(err);
        });
    };

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <form id={formId} onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.inputsWrapper}>
            <Input
              value={log}
              onChange={(e) => setLogin(e.target.value)}
              name="login"
              className="lmsInputSignIn"
              placeholder={t('auth:loginPlaceholder') || 'Логин'}
            />

            <Input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              name="password"
              className="lmsInputSignIn"
              type="password"
              placeholder={t('auth:passwordPlaceholder') || 'Пароль'}
            />
            {message && <div className={styles.errMessage}>{message}</div>}
          </div>

          <Button htmlType="submit" shape="default" prefixCls="SignInButton">
            {t('auth:buttons.signIn')}
          </Button>
          {langSlot}
        </form>

        <div className={styles.circleTopRight}></div>
        <div className={styles.circleBottomLeft1}></div>
        <div className={styles.circleBottomLeft2}></div>
      </div>
    </div>
  );
};
