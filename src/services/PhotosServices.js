import { supabase } from "../lib/supabase";

export async function uploadPhoto(file, direction, sampleId) {
  const fileExt = file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const filePath = `${sampleId}/${direction}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("macrofauna")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("macrofauna").getPublicUrl(filePath);

  const { data: photo, error } = await supabase
    .from("photos")
    .insert({
      sample_id: sampleId,
      direction,
      photo: data.publicUrl,
    })
    .select()
    .single();

  if (error) throw error;

  return photo;
}

export async function getPhotosBySample(sampleId) {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("sample_id", sampleId);

  if (error) throw error;

  return data;
}

export async function deletePhoto(photoId) {
  const { error } = await supabase.from("photos").delete().eq("id", photoId);

  if (error) throw error;
}
