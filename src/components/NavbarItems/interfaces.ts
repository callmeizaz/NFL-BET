export interface NavbarItemsProps {
  label: string;
  path: string;
  icons: React.ElementType[];
  handleLinkClick: Function;
  activePaths: string[];
}
