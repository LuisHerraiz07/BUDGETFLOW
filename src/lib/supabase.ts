import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uouvljuiwjpwkkdqfqsz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6CEmI0Zjb089So-cnRUlGw_oF8OqrTP';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
