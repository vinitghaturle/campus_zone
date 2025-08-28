// googleDriveService.js
const CLIENT_ID = '158029504699-4b30puks5tgo65n1hr641c9h9ltbkmfa.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCyRbM6Guzgyvr-NK1YjAVaQeUYXmI6XW4';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let gapiInited = false;
let gisInited = false;

export function initializeGoogleDriveApi() {
  return new Promise((resolve) => {
    const scriptGapi = document.createElement('script');
    scriptGapi.src = 'https://apis.google.com/js/api.js';
    scriptGapi.onload = () => {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        });
        gapiInited = true;
        if (gisInited) resolve();
      });
    };
    document.head.appendChild(scriptGapi);

    const scriptGis = document.createElement('script');
    scriptGis.src = 'https://accounts.google.com/gsi/client';
    scriptGis.onload = () => {
      gisInited = true;
      if (gapiInited) resolve();
    };
    document.head.appendChild(scriptGis);
  });
}

export async function uploadFileToDrive(file, token) {
  if (!file) throw new Error('No file selected');

  const metadata = {
    name: file.name,
    mimeType: file.type,
    parents: ['root'], // Optional: Folder ID if uploading to a specific folder
  };

  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));;
  formData.append('file', file);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error('Upload failed');
  return response.json();
}

export function authenticateGoogleDrive() {
  return new Promise((resolve) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        resolve(tokenResponse.access_token);
      },
    });
    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
}