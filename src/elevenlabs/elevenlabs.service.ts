import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ElevenlabsService {
  async generateSpeech(text: string) {
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB',
      {
        text,
        model_id: 'eleven_multilingual_v2',
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      },
    );

    return response.data;
  }
}













// import { Injectable } from '@nestjs/common';
// import axios from 'axios';

// @Injectable()
// export class ElevenlabsService {

//   async generateSpeech(text: string) {

//     const apiKey =
//       process.env.ELEVENLABS_API_KEY;

//     // Default working ElevenLabs voice
//     const voiceId =
//       '21m00Tcm4TlvDq8ikWAM';

//     const response = await axios.post(

//       `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,

//       {
//         text,

//         model_id: 'eleven_multilingual_v2',
//       },

//       {
//         headers: {

//           'xi-api-key': apiKey,

//           'Content-Type': 'application/json',

//           Accept: 'audio/mpeg',
//         },

//         responseType: 'arraybuffer',
//       },
//     );

//     console.log('ELEVEN STATUS:', response.status);

//     return response.data;
//   }
// }