import { deleteAll, deleteByKey, getAll, getByKey } from "../db/openHelper";

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

  async parseImportData(data: any): Promise<ITrainer[]> {
    const version = data["version"];
    if (version == null) {
      throw new Error("unknown version");
    }
    if (version !== 1) {
      throw new Error("unsupported version");
    }
    const trainers = data["trainers"] as any[];
    if (trainers == null) {
      throw new Error("broken data: trainers not found");
    }
    const out: ITrainer[] = [];
    trainers.forEach((t: any) => {
      const name = t["name"];
      const label = t["label"];
      if (name == null || label == null || name.length == 0) {
        // next
        return;
      }
      out.push({
        name: name,
        label: label,
      });
    });
    if (out.length == 0) {
      throw new Error("no trainer found");
    }
    return out;
  }

  async import(trainers: ITrainer[]): Promise<void> {
    const tr = this.db.transaction(["trainers"], "readwrite");
    const store = tr.objectStore("trainers");
    await deleteAll(store);
    trainers.forEach((t) => {
      store.put(t);
    });
  }
}
