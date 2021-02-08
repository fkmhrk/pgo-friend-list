import { getAll } from "../db/openHelper";

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
  async getAll(): Promise<ITrainer[]> {
    const tr = this.db.transaction(["trainers"], "readonly");
    const store = tr.objectStore("trainers");
    const trainers = await getAll(store);
    trainers.forEach((t) => {
      t["checked"] = false;
    });
    return trainers;
  }
}
