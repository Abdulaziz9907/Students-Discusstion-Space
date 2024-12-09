const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=swe363;AccountKey=VH0Pnw/xyjYmembECTaGG34bx6XoTZDQktIVpn/Quc6NKpDqj/RKDmJ7Qi0dUAd4cLKW24VxN98c+AStJUP1sw==;EndpointSuffix=core.windows.net";

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage Connection string not found in environment variables.");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

const containerName = 'files'; // Replace with your container name
const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports = { containerClient };
