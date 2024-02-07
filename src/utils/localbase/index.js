import Localbase from 'localbase';

export const dbName = 'learning';
export const tbName = 'selfNumber';

export const localDb = new Localbase(dbName);

export const addDbCollection = (table, value) => {
    localDb.collection(table).add(value);
};
