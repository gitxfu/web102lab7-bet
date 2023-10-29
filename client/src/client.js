import { createClient } from '@supabase/supabase-js'

const URL = 'https://nwzdnbouppgjgjvfwbpg.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53emRuYm91cHBnamdqdmZ3YnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0NjEyOTIsImV4cCI6MjAxNDAzNzI5Mn0.DKQERy8Zxnsq1vyinYILHu_GiP6qfHCljn1Ncv2G8T0';

export const supabase = createClient(URL, API_KEY);