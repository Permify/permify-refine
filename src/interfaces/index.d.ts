export interface ICategory {
  id: string;
  title: string;
}
export interface IPost {
  id: string;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  createdAt: string;
  category: ICategory;
}

export interface IPermifyUser {
  id: string;
  name: string;
  photo: string;
  roles: IPermifyRole;
  attributes: object;
  created_at: string;
  groups: string[];
  updated_at: string,
  workspace_id: string
}

export interface IPermifyRole {
  color: string,
  created_at: string,
  description: string,
  guard_name: string,
  name: string,
  updated_at: string,
  workspace_id: string
}






