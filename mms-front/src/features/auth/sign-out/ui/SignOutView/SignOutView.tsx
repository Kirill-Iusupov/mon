import { useCallback, useEffect } from 'react';

import { useSignOut } from '~shared/lib/auth';

import { signOut } from '../../api';

export interface SignOutViewProps {
  onSignOut: () => void;
}

export const SignOutView: React.FC<SignOutViewProps> = ({ onSignOut }) => {
  const authSignOut = useSignOut();

  const handleSignOut = useCallback(() => {
    signOut()
      .then(() => {
        if (authSignOut()) {
          onSignOut();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [authSignOut, onSignOut]);

  useEffect(() => {
    handleSignOut();
  }, [handleSignOut]);

  return null;
};
