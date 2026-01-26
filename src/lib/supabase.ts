import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createServerClient(cookies: any) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: {
        getItem: (key) => {
          return cookies.get(key)?.value;
        },
        setItem: (key, value) => {
          cookies.set(key, value, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax',
            secure: import.meta.env.PROD,
          });
        },
        removeItem: (key) => {
          cookies.delete(key, { path: '/' });
        },
      },
    },
  });
}
