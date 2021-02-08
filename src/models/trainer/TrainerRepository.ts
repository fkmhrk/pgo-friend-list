import { deleteByKey, getAll, getByKey } from "../db/openHelper";

export default class TrainerRepository implements ITrainerRepository {
  constructor(private db: IDBDatabase) {}

  async add(name: string, label: string): Promise<ITrainer> {
    const tr = this.db.transaction(["trainers"], "readwrite");
    const store = tr.objectStore("trainers");
    store.put({
      name: name,
      label: label,
    });
    return <ITrainer>{
      name: name,
      label: label,
    };
  }

  async updateLabel(name: string, label: any): Promise<ITrainer> {
    const tr = this.db.transaction(["trainers"], "readwrite");
    const store = tr.objectStore("trainers");
    store.put({
      name: name,
      label: label,
    });
    return <ITrainer>{
      name: name,
      label: label,
    };
  }

  async deleteTrailer(name: string): Promise<void> {
    const tr = this.db.transaction(["trainers"], "readwrite");
    const store = tr.objectStore("trainers");
    await deleteByKey(store, name);
  }

  async getAll(): Promise<ITrainer[]> {
    const tr = this.db.transaction(["trainers"], "readonly");
    const store = tr.objectStore("trainers");
    const trainers = await getAll(store);
    trainers.forEach((t) => {
      t["checked"] = false;
    });
    return trainers;
  }

  async getByName(name: string): Promise<ITrainer> {
    const tr = this.db.transaction(["trainers"], "readonly");
    const store = tr.objectStore("trainers");
    const data = await getByKey(store, name);
    return {
      name: name,
      label: data["label"],
    };
  }
}
