export interface IProps {
  teamName: string;
  ownerName: string;
  photoUrl?: string;
  players?: [
    {
      player: {
        fullName: string;
      };
    }
  ];
}
