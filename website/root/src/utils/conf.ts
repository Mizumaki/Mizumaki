type Conf = {
  serverBaseUrl: string;
};

let conf: Conf;

if (process.env.NODE_ENV === 'development') {
  conf = {
    serverBaseUrl: 'http://localhost:8080',
  };
} else {
  conf = {
    serverBaseUrl: 'http://202.182.100.13',
  };
}

export default conf;
