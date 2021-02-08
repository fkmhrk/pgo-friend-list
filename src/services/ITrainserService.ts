interface ITrainserService {
  add(trainers: ITrainer[], name: string, label: string): Promise<ITrainer[]>;
}
