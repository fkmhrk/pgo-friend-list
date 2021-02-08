export const openIndexedDB = (
  name: string,
  version: number,
  onupgradeneeded: (db: IDBDatabase) => void
) =>
  new Promise(
    (resolve: (db: IDBDatabase) => void, reject: (reason: any) => void) => {
      const r = indexedDB.open(name, version);
      r.onupgradeneeded = (ev: Event) => {
        const db: IDBDatabase = (<any>ev.target).result;
        onupgradeneeded(db);
      };
      r.onsuccess = (ev: Event) => {
        resolve((<any>ev.target).result);
      };
      r.onerror = (ev: Event) => {
        reject(ev);
      };
    }
  );

export const getAll = (store: IDBObjectStore) =>
  new Promise(
    (resolve: (results: any[]) => void, reject: (reason: any) => void) => {
      const r = store.getAll();
      r.onsuccess = (ev: Event) => {
        resolve((<any>ev.target).result);
      };
      r.onerror = (ev: Event) => reject(ev);
    }
  );

export const getByKey = (store: IDBObjectStore, key: string) =>
  new Promise(
    (resolve: (results: any) => void, reject: (reason: any) => void) => {
      const r = store.get(key);
      r.onsuccess = (ev: Event) => {
        resolve((<any>ev.target).result);
      };
      r.onerror = (ev: Event) => reject(ev);
    }
  );

export const deleteByKey = (store: IDBObjectStore, key: string) =>
  new Promise((resolve: (v: void) => void, reject: (reason: any) => void) => {
    const r = store.delete(key);
    r.onsuccess = (ev: Event) => {
      resolve();
    };
    r.onerror = (ev: Event) => reject(ev);
  });
