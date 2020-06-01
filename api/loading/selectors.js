import { get } from 'lodash';
export const createLoadingSelector = (actions) => (state) => {
  // returns true only when all actions is not loading
  return _(actions)
    .some((action) => get(state, `api.loading.${action}`));
};
