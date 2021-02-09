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

  async updateLabel(name: string, label: any): Promise<ITrainer> {
    try {
      const newTrainer = await this.repo.updateLabel(name, label);
      return newTrainer;
    } catch (e) {
      throw e;
    }
  }

  async deleteTrainer(name: string): Promise<void> {
    try {
      await this.repo.deleteTrailer(name);
    } catch (e) {
      throw e;
    }
  }

  async parseImportData(data: string): Promise<ITrainer[]> {
    let jsonData: any;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      throw new Error("data may be broken");
    }
    try {
      return await this.repo.parseImportData(jsonData);
    } catch (e) {
      throw e;
    }
  }

  async execImport(trainers: ITrainer[]): Promise<void> {
    try {
      await this.repo.import(trainers);
    } catch (e) {
      throw e;
    }
  }
}
