import expect from 'expect';
import documentsPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('documentsPageReducer', () => {
  it('returns the initial state', () => {
    expect(documentsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
