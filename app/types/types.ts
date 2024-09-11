export interface itemProps {
  id: string;
  time: string;
  date: string;
  name: string;
  isTaken: boolean;
}

export interface listProps {
  Morning: itemProps[];
  Noon: itemProps[];
  Night: itemProps[];
  Any: itemProps[];
}
