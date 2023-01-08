export interface IProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: BannerAction;
}

export interface BannerAction {
  text: string;
  callback?: Function;
  link?: string;
}
