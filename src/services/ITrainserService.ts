interface ITrainserService {
  add(trainers: ITrainer[], name: string, label: string): Promise<ITrainer[]>;
  updateLabel(name: string, label: any): Promise<ITrainer>;
  deleteTrainer(name: string): Promise<void>;

  parseImportData(data: string): Promise<ITrainer[]>;
  execImport(trainers: ITrainer[]): Promise<void>;
}
