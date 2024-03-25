export interface Category {
    id: number;
    name: string;
    url: string;
    visible: boolean;
    deleted: boolean;
    editing?: boolean; // Optional property
    isNew?: boolean; // Optional property
  }
