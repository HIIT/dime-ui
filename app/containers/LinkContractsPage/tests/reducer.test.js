import expect from 'expect';
import linkContractsPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('linkContractsPageReducer', () => {
  it('returns the initial state', () => {
    expect(linkContractsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
