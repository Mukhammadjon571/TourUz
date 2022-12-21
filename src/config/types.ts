type Server = {
  host: string;
  port: number;
  env: string;
};

type Postgres = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

type AuthToken = {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
};

type AWSService = {
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
  url: string;
};

type MailService = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

type SendGrid ={
  username:string;
  password:string;
}

export type Config = {
  server: Server;
  postgres: Postgres;
  authToken: AuthToken;
  awsService: AWSService;
  mailService: MailService;
  sendGrid:SendGrid;
};
