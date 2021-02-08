interface ITrainerRepository {
  add(name: string, label: string): Promise<ITrainer>;
  updateLabel(name: string, label: any): Promise<ITrainer>;
  deleteTrailer(name: string): Promise<void>;

  getAll(): Promise<ITrainer[]>;
  getByName(name: string): Promise<ITrainer>;
}

interface ITrainer {
  name: string;
  label: string;
}
