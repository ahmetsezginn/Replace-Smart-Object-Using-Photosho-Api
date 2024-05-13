
# Photoshop API Integration Project

This project demonstrates how to integrate with the Adobe Photoshop API and Dropbox to replace Smart Objects in a Photoshop (PSD) file. The script handles authentication with Adobe, retrieves and uploads files using Dropbox, and updates Smart Objects within a PSD file.

## Requirements

- Node.js
- A Dropbox account with API access
- An Adobe developer account and access to the Photoshop API

## Setup

### Environment Variables

Create a `.env` file in the root of your project and include the following variables:

```plaintext
CLIENT_ID=your_adobe_client_id
CLIENT_SECRET=your_adobe_client_secret
DROPBOX_ACCESS_TOKEN=your_dropbox_access_token
```

Replace `your_adobe_client_id`, `your_adobe_client_secret`, and `your_dropbox_access_token` with your actual Adobe and Dropbox credentials.

### Dependencies

This project requires several Node.js packages. Run the following command to install them:

```bash
npm install dotenv dropbox node-fetch
```

- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `dropbox`: Facilitates interaction with the Dropbox API.
- `node-fetch`: Allows you to perform HTTP requests to the Adobe Photoshop API.

## Usage

To run the script, execute the following command from the root of your project:

```bash
node path_to_your_script.js
```

Make sure to replace `path_to_your_script.js` with the actual path to your script file.

## Script Functionality

- **Authentication**: The script first authenticates with Adobe to obtain an access token.
- **File Handling**: It interacts with Dropbox to download the current PSD file and the new image intended to replace the Smart Object.
- **Smart Object Replacement**: The script updates the Smart Object in the PSD file with the new image and uploads the modified PSD back to Dropbox.
- **Status Checks**: It continuously checks the status of the operation until completion.

## Troubleshooting

If you encounter issues with the script:
- Ensure that all environment variables are set correctly.
- Check that the Adobe and Dropbox APIs have not changed endpoints or authentication methods.
- Verify that the Smart Object layer ID and names in the script match those in your PSD file.

For more detailed logs, consider enhancing the logging mechanism in the script to capture and display error messages from API responses.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your improvements.

## License

Specify your license here, or state that the project is unlicensed.
