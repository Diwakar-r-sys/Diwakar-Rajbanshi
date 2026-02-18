// Fixed: Removed missing type reference
declare const process: {
  env: {
    readonly API_KEY: string;
    [key: string]: string | undefined;
  }
};
