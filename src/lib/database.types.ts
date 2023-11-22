export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "table-token": {
        Row: {
          access_token: string
          created_at: string
          expires_in: number
          id: number
          key: boolean
          refresh_token: string
          token_type: string
        }
        Insert: {
          access_token: string
          created_at?: string
          expires_in: number
          id?: number
          key?: boolean
          refresh_token: string
          token_type: string
        }
        Update: {
          access_token?: string
          created_at?: string
          expires_in?: number
          id?: number
          key?: boolean
          refresh_token?: string
          token_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
