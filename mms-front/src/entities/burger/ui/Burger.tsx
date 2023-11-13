import { BurgerIcon } from '~shared/ui/Icons/icons';

import { useCollapsed, useSetCollapsed } from '../model';

import styles from './burger.module.scss';

export const Burger = () => {
  const state = useCollapsed();

  const setCollapsed = useSetCollapsed();

  const handleCollapse = () => {
    setCollapsed(!state);
  };

  return (
    <div onClick={handleCollapse} className={styles.Burger}>
      <BurgerIcon />
    </div>
  );
};
