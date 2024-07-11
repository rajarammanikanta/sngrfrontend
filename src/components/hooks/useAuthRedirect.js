// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuthRedirect = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      history.replace('/admin');
    }
  }, [history]);
};

export default useAuthRedirect;
