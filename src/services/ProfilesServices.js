import { supabase } from "../lib/supabase";

export async function getProfile() {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function upsertProfile(profile) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  const { error } = await supabase.from("profiles").upsert({
    user_id: user.id,
    email: user.email,
    ...profile,
  });

  if (error) throw error;
}
