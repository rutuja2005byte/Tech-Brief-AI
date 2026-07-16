import { EdgeTTS } from 'edge-tts';

import { getStorageBucketName, supabaseAdmin } from '@/storage/supabase';

export async function synthesizeAndStorePodcast(script: string, briefId: string) {
  const voice = process.env.EDGE_TTS_VOICE ?? 'en-US-AriaNeural';
  const tts = new EdgeTTS();
  await tts.synthesize(script, voice);
  const audioBuffer = await tts.toBuffer();
  const path = `podcasts/${briefId}.mp3`;

  const { error } = await supabaseAdmin.storage
    .from(getStorageBucketName())
    .upload(path, audioBuffer, {
      contentType: 'audio/mpeg',
      upsert: true
    });

  if (error) {
    throw new Error(`Failed to upload podcast audio: ${error.message}`);
  }

  return path;
}
