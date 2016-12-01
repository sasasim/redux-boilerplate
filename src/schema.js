import { Schema } from 'normalizr';

export const UserSchema = new Schema('User');
export const CountrySchema = new Schema('Country');

UserSchema.define({
  country: CountrySchema
});
