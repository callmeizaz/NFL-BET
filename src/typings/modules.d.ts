declare module "named-urls" {
  export interface Include {
    <Routes>(path: string, routes: Routes): Routes & { toString(): string };
  }

  export interface Reverse {
    (pattern: string, params?: ReverseParams): string;
  }

  export interface ReverseParams {
    [path: string]: number | string;
  }

  export interface Routes {
    [path: string]: string | Routes;
  }

  export type ReverseForce = Reverse;

  export const include: Include;

  export const reverse: Reverse;

  export const reverseForce: ReverseForce;
}
