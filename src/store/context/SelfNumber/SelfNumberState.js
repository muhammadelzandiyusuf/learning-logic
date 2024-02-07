import React, { useCallback, useReducer } from 'react';
import SelfNumberContext from './SelfNumberContext';
import SelfNumberReducer from './SelfNumberReducer';
import { GET_SELF_NUMBER } from './SelfNumberTypes';

const SelfNumberState = ({ children }) => {
    const initialState = {
        data: [],
    };

    const [state, dispatch] = useReducer(SelfNumberReducer, initialState);

    const getSelfNumber = useCallback((payload) => {
        dispatch({ type: GET_SELF_NUMBER, payload });
    }, []);

    const { data } = state;

    return (
      <SelfNumberContext.Provider
          value={{
              data,
              getSelfNumber
          }}
      >
          {children}
      </SelfNumberContext.Provider>
    );
}

export default SelfNumberState;
