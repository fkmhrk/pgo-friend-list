export default class TrainserService implements ITrainserService {
  constructor(private repo: ITrainerRepository) {}
  async add(
    trainers: ITrainer[],
    name: string,
    label: string
  ): Promise<ITrainer[]> {
    const name2 = name.trim();
    const label2 = label.trim();
    if (name2.length == 0) {
      throw new Error("Name must not be empty");
    }
    const trainer = trainers.find((t: ITrainer) => t.name == name2);
    if (trainer != null) {
      throw new Error("Already added");
    }

    const newTrainer = await this.repo.add(name2, label2);
    trainers.push(newTrainer);
    return trainers;
  }
}