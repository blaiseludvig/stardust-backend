type ValidationRules = {
  [key: string]: {
    regex: RegExp;
    message: string;
  };
};

export default ValidationRules;
