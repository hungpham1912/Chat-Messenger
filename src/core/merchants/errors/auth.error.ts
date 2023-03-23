export const MERCHANT_AUTH_ERROR = {
  1: 'Server can not create merchant code',
};
export const MERCHANT_GUARD_ERROR = {
  0: 'Request invalid',
  1: 'Signature not found',
  2: 'Merchant code not found',
  3: 'Timestamp limit specified (Limit is 5 minute)',
  4: 'Time is greater than current time',
  5: 'Timestamp must is number',
  6: 'Timestamp not found',
  7: 'No merchant found corresponding to merchant code',
  8: ' Signature not matching',
};
export const SIGN_ERROR = {
  1: 'Merchant Code not found',
  2: 'Body sign invalid',
};
