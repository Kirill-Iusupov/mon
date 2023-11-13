import { useState } from 'react';

import { useSignIn } from '~shared/lib/auth';
import { Button, Input } from '~shared/ui';
import { ChevronLeftlIcon, UserIcon } from '~shared/ui/Icons';
import { useTranslation } from '~shared/lib/i18n';

import Circles from '~shared/assets/circles.svg';
import Wave from '~shared/assets/wave.png';
import WrapperWave from '~shared/assets/wrapperWave.png';
import { Logo } from '~shared/ui/logo';

import { signIn } from '../../api';
import { SignInData } from '../../model';

import styles from './style.module.scss';

export interface SignInFormProps {
  onSignIn: (payload: SignInData) => void;
  formId?: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSignIn, formId = 'form:sign-in' }) => {
  const authSignIn = useSignIn();
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState<string>('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSubmit =
    // const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      // mockSignIn(payload).then(({ data }) => {

      signIn({ login: login.trim(), password: pass.trim() })
        .then(({ data, error, message }) => {
          console.error({ data, error, message });

          if (error && data === false) {
            console.error(message);
            setMessage(t('cm:notify.wrongLoginOrPassword') || 'Неправильный логин или пароль!');

            return;
          }

          if (
            authSignIn({
              token: data.token,
              expiresIn: data.expiresIn,
              tokenType: data.tokenType,
            })
          ) {
            onSignIn(data);
            setMessage('');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
  //   },
  //   [onSignIn, authSignIn]
  // );

  const Language = () => {
    return (
      <div className={styles.lang}>
        <div
          style={
            i18n.language === 'ky'
              ? { fontWeight: 'bold', color: 'var(--primary)' }
              : { color: 'var(--gray)' }
          }
          onClick={changeLang.bind(null, 'ky')}
        >
          Кырг
        </div>
        <div
          style={
            i18n.language === 'ru'
              ? { fontWeight: 'bold', color: 'var(--primary)' }
              : { color: 'var(--gray)' }
          }
          onClick={changeLang.bind(null, 'ru')}
        >
          Рус
        </div>
      </div>
    );
  };

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <div className={styles.bg__link}>
          <a href="/" className={styles.goToIndexPage}>
            <ChevronLeftlIcon />
            <span>{t('auth:main')}</span>
          </a>
          / <b>{t('auth:entrance')}</b>
        </div>

        <form id={formId} onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.welcom_logo_title}>
            <h2 className={styles.welcome}>{t('auth:welcome')}</h2>
            <Logo />
            <h1 className={styles.title_st}>{t('auth:title_st')}</h1>
          </div>

          <div className={styles.inputsWrapper}>
            <Input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              name="login"
              className="lmsInputSignIn"
              suffix={<UserIcon />}
              placeholder={t('auth:pin') as string}
            />

            <Input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              name="password"
              className="lmsInputSignIn"
              type="password"
              placeholder={t('auth:password') as string}
            />
            {message && <div className={styles.errMessage}>{message}</div>}
          </div>

          <Button htmlType="submit" shape="default" prefixCls="SignInButton">
            {t('auth:buttons.signIn')}
          </Button>

          <Language />
        </form>

        <div className={styles.unregistered_register}>
          <p className={styles.unregistered}>{t('auth:doYouRegister')}</p>
          <a className={styles.register} href="/register">
            {t('auth:passRegister')}
          </a>
        </div>

        <img className={styles.WrapperWave} src={WrapperWave} alt="circles" />
      </div>

      <img className={styles.Circles} src={Circles} alt="circles" />
      <img className={styles.Wave} src={Wave} alt="circles" />
    </div>
  );
};
