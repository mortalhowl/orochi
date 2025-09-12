export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          id: number
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          resource: string | null
          resource_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: number
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          resource?: string | null
          resource_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: number
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          resource?: string | null
          resource_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      check_ins: {
        Row: {
          check_in_time: string | null
          device_info: string | null
          gate: string | null
          id: number
          ip_address: string | null
          location: string | null
          notes: string | null
          staff_id: string | null
          ticket_id: string
        }
        Insert: {
          check_in_time?: string | null
          device_info?: string | null
          gate?: string | null
          id?: number
          ip_address?: string | null
          location?: string | null
          notes?: string | null
          staff_id?: string | null
          ticket_id: string
        }
        Update: {
          check_in_time?: string | null
          device_info?: string | null
          gate?: string | null
          id?: number
          ip_address?: string | null
          location?: string | null
          notes?: string | null
          staff_id?: string | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "check_ins_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      company_settings: {
        Row: {
          category: string | null
          description: string | null
          id: number
          is_encrypted: boolean | null
          is_public: boolean | null
          key: string
          type: string | null
          updated_at: string | null
          updated_by: string | null
          value: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: number
          is_encrypted?: boolean | null
          is_public?: boolean | null
          key: string
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: number
          is_encrypted?: boolean | null
          is_public?: boolean | null
          key?: string
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          html_content: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          subject: string
          text_content: string | null
          type: string
          updated_at: string | null
          variables: string[] | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          html_content?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          subject: string
          text_content?: string | null
          type: string
          updated_at?: string | null
          variables?: string[] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          html_content?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          subject?: string
          text_content?: string | null
          type?: string
          updated_at?: string | null
          variables?: string[] | null
        }
        Relationships: []
      }
      events: {
        Row: {
          banner_url: string | null
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          location: string | null
          map_images: string[] | null
          max_capacity: number | null
          meta_description: string | null
          meta_title: string | null
          name: string
          slug: string
          start_date: string
          status: string
          ticket_sale_end: string | null
          ticket_sale_start: string | null
          updated_at: string | null
          venue_info: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          location?: string | null
          map_images?: string[] | null
          max_capacity?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          slug: string
          start_date: string
          status?: string
          ticket_sale_end?: string | null
          ticket_sale_start?: string | null
          updated_at?: string | null
          venue_info?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          location?: string | null
          map_images?: string[] | null
          max_capacity?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          slug?: string
          start_date?: string
          status?: string
          ticket_sale_end?: string | null
          ticket_sale_start?: string | null
          updated_at?: string | null
          venue_info?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          caption: string | null
          created_at: string | null
          event_id: string | null
          id: string
          is_featured: boolean | null
          media_url: string
          order_index: number | null
          type: string
          uploaded_by: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          is_featured?: boolean | null
          media_url: string
          order_index?: number | null
          type?: string
          uploaded_by?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          is_featured?: boolean | null
          media_url?: string
          order_index?: number | null
          type?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          avatar_url: string | null
          bio: string | null
          event_id: string
          id: string
          is_featured: boolean | null
          name: string
          order_index: number | null
          social_links: Json | null
          title: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          event_id: string
          id?: string
          is_featured?: boolean | null
          name: string
          order_index?: number | null
          social_links?: Json | null
          title?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          event_id?: string
          id?: string
          is_featured?: boolean | null
          name?: string
          order_index?: number | null
          social_links?: Json | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          created_by: string | null
          custom_message: string | null
          email: string
          event_id: string
          id: string
          invitation_code: string
          name: string | null
          phone: string | null
          sent_at: string | null
          status: string
          ticket_type_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_message?: string | null
          email: string
          event_id: string
          id?: string
          invitation_code: string
          name?: string | null
          phone?: string | null
          sent_at?: string | null
          status?: string
          ticket_type_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          created_by?: string | null
          custom_message?: string | null
          email?: string
          event_id?: string
          id?: string
          invitation_code?: string
          name?: string | null
          phone?: string | null
          sent_at?: string | null
          status?: string
          ticket_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          discount_applied: number | null
          id: string
          order_id: string
          quantity: number
          ticket_type_id: string
          total_price: number
          unit_price: number
        }
        Insert: {
          discount_applied?: number | null
          id?: string
          order_id: string
          quantity: number
          ticket_type_id: string
          total_price: number
          unit_price: number
        }
        Update: {
          discount_applied?: number | null
          id?: string
          order_id?: string
          quantity?: number
          ticket_type_id?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: string
          notes: string | null
          payment_method: string | null
          payment_status: string
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_status?: string
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_status?: string
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      password_resets: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: number
          otp_hash: string
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: number
          otp_hash: string
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: number
          otp_hash?: string
        }
        Relationships: []
      }
      payment_logs: {
        Row: {
          amount: number
          created_at: string | null
          id: number
          method: string | null
          order_id: string
          response_data: Json | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: number
          method?: string | null
          order_id: string
          response_data?: Json | null
          status: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: number
          method?: string | null
          order_id?: string
          response_data?: Json | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string | null
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id: string
          is_active?: boolean | null
          name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_system_role: boolean | null
          name: string
          permissions: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_system_role?: boolean | null
          name: string
          permissions?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_system_role?: boolean | null
          name?: string
          permissions?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          assigned_gates: string[] | null
          avatar_url: string | null
          created_at: string | null
          hired_date: string | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          name: string | null
          phone: string | null
          role_id: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_gates?: string[] | null
          avatar_url?: string | null
          created_at?: string | null
          hired_date?: string | null
          id: string
          is_active?: boolean | null
          last_login_at?: string | null
          name?: string | null
          phone?: string | null
          role_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_gates?: string[] | null
          avatar_url?: string | null
          created_at?: string | null
          hired_date?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          name?: string | null
          phone?: string | null
          role_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_types: {
        Row: {
          benefits: string[] | null
          created_at: string | null
          description: string | null
          early_bird_end: string | null
          early_bird_price: number | null
          event_id: string | null
          id: string
          name: string
          price: number
          quantity_sold: number | null
          quantity_total: number
          sort_order: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string | null
          description?: string | null
          early_bird_end?: string | null
          early_bird_price?: number | null
          event_id?: string | null
          id?: string
          name: string
          price: number
          quantity_sold?: number | null
          quantity_total: number
          sort_order?: number | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          created_at?: string | null
          description?: string | null
          early_bird_end?: string | null
          early_bird_price?: number | null
          event_id?: string | null
          id?: string
          name?: string
          price?: number
          quantity_sold?: number | null
          quantity_total?: number
          sort_order?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          check_in_at: string | null
          check_in_by: string | null
          created_at: string | null
          gate_used: string | null
          id: string
          issued_at: string | null
          notes: string | null
          order_id: string
          qr_code: string | null
          status: string
          ticket_code: string
          ticket_type_id: string
          user_id: string | null
        }
        Insert: {
          check_in_at?: string | null
          check_in_by?: string | null
          created_at?: string | null
          gate_used?: string | null
          id?: string
          issued_at?: string | null
          notes?: string | null
          order_id: string
          qr_code?: string | null
          status?: string
          ticket_code: string
          ticket_type_id: string
          user_id?: string | null
        }
        Update: {
          check_in_at?: string | null
          check_in_by?: string | null
          created_at?: string | null
          gate_used?: string | null
          id?: string
          issued_at?: string | null
          notes?: string | null
          order_id?: string
          qr_code?: string | null
          status?: string
          ticket_code?: string
          ticket_type_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_check_in_by_fkey"
            columns: ["check_in_by"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vouchers: {
        Row: {
          id: number
          order_id: string | null
          used_at: string | null
          user_id: string
          voucher_id: string
        }
        Insert: {
          id?: number
          order_id?: string | null
          used_at?: string | null
          user_id: string
          voucher_id: string
        }
        Update: {
          id?: number
          order_id?: string | null
          used_at?: string | null
          user_id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_vouchers_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vouchers_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          min_order_value: number | null
          name: string
          status: string
          usage_limit: number
          used_count: number | null
          valid_from: string
          valid_to: string
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          min_order_value?: number | null
          name: string
          status?: string
          usage_limit: number
          used_count?: number | null
          valid_from: string
          valid_to: string
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          min_order_value?: number | null
          name?: string
          status?: string
          usage_limit?: number
          used_count?: number | null
          valid_from?: string
          valid_to?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_in_ticket: {
        Args: { p_gate: string; p_staff_id: string; p_ticket_id: string }
        Returns: Json
      }
      create_order: {
        Args: {
          p_discount_amount: number
          p_notes: string
          p_order_items: Json
          p_payment_method: string
          p_total_amount: number
          p_user_id: string
        }
        Returns: string
      }
      create_staff_user: {
        Args: {
          p_email: string
          p_name: string
          p_password: string
          p_role_id: string
        }
        Returns: Json
      }
      get_all_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
