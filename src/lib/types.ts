export type Lead = {
  lead_id: string;
  contact_id: string;
  email: string;
  name: string;
  responsible_user_id: string;
  responsible_user_name: string;
  settings: {
    actions: Record<
      string,
      {
        title?: string;
        description?: string;
        actions: {
          id: string;
          name: string;
          action?: string;
          href?: string;
          url?: string;
          icon?: string;
          className?: string;
          input?: {
            label: string;
            name: string;
            type: string;
            placeholder?: string;
          };
        }[];
      }
    >;
  };
};
