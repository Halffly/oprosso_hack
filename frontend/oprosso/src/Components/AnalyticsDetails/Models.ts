export interface FullAnalyticsPrototype {
  Analytics: BackAnalytics;
  Data: FullPrototypeData;
}

export interface BackAnalytics {
  averageRate: number;
  stepAnalytics: {
    step: Step;
    analynics: { title: string; value: string }[];
  }[]; // len = количество степов у задания
  userAnalytics: UserAnalytics[];
}
export interface Step {
  id: number;
  stepTitle: string;
  stepText: string;
  question: string[];
}
export interface FullPrototypeData {
  title: string;
  description: string;
  views: number;
  rate: number;
  imageUrl?: string;
  id: string;
  publicKey: string;
  steps: Step[];
  isShow?: boolean;
  img?: FormData;
  app?: string;
}
export interface Taps {
  type: string;
  element: {
    path: string;
    class: string;
    text: string;
    resource_id: string;
    content_desc: string;
    windowType: string;
    label: string;
    accessibilityId: string;
    parentClass: string;
  };
  time: number;
  ui: any; //XML layout
  xPos: number;
  yPOs: number;
}
export interface UserAnalytics {
  taps: Taps[];
  rate: number;
  feedBack: { UserResponse: string }[];
  finalComment: string;
  isFinished: boolean;
  stepId: number;
}
