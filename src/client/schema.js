import { schema } from 'normalizr';

export const UserSchema = new schema.Entity('User');
export const CountrySchema = new schema.Entity('Country');

UserSchema.define({
  country: CountrySchema
});
