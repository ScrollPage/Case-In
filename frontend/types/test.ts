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
  isHasAnswers: boolean;
  questions: IQuestion[];
}

export interface ServerTest {
  id: number;
  category: 1 | 2 | 3 | 4;
  value: number;
  is_passed: boolean;
}