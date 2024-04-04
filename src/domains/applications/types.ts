export interface AxiosResponseWithSaveLanguage {
  data: string;
  status: number;
  statusText: string | undefined;
  headers: any;
  config: any;
  request?: any;
}

export type MannerScore = {
  mannerScore: number;
};

export type Avatar = {
  avatar: string;
};

export type Nickname = {
  nickname: string;
};

export type Language = {
  language: string;
};
