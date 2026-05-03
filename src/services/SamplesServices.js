import { supabase } from "../lib/supabase";

export async function createSample(sample) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  const { data, error } = await supabase
    .from("samples")
    .insert({ user_id: user.id, ...sample })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function insertInsects(insects) {
  const { error } = await supabase.from("insect").insert(insects);

  if (error) throw error;
}

export async function insertPhotos(photos) {
  const { error } = await supabase.from("photos").insert(photos);

  if (error) throw error;
}
