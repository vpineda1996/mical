export interface Filter {
  compile(): string;
}

export class EmptyFilter implements Filter{
  compile(): string {
    return btoa(JSON.stringify({}));
  }

}
