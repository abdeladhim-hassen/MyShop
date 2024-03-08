export interface Category {
    Id: number;
    Name: string;
    Url: string;
    Visible: boolean;
    Deleted: boolean;
    Editing?: boolean; // Optional property
    IsNew?: boolean; // Optional property
  }
  