interface ITrainerRepository {
  add(name: string, label: string): Promise<ITrainer>;
  getAll(): Promise<ITrainer[]>;
}

interface ITrainer {
  name: string;
  label: string;
}
