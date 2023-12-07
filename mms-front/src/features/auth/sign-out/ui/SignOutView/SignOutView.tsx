import { useCallback, useEffect } from 'react';

import { signOut } from '../../api';

export interface SignOutViewProps {
  onSignOut: () => void;
}

export const SignOutView: React.FC<SignOutViewProps> = ({ onSignOut }) => {
  const handleSignOut = useCallback(() => {
    signOut()
      .then(() => {
        onSignOut();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [onSignOut]);

  useEffect(() => {
    handleSignOut();
  }, [handleSignOut]);

  return null;
};
