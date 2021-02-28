export interface IAnswer {
  id: number;
  option: string;
}

export interface IQuestion {
  title: string;
  answers: IAnswer[];
  correctId?: number;
}

export interface ITest {
  id: number;
  name: string;
  questions: IQuestion[];
}