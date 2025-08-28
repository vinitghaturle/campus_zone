// services/notesService.js - Fixed Version
import { storage, functions } from '../services/appwrite.js';
import { ID } from 'appwrite';

class NotesService {
  // Upload file to Appwrite storage
  async uploadFile(file) {
    try {
      console.log('🔄 Uploading file to Appwrite:', file.name);
      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
      console.log('✅ File uploaded to Appwrite:', response);
      return response;
    } catch (error) {
      console.error('❌ Error uploading to Appwrite:', error);
      throw error;
    }
  }

  // Call Appwrite Function to upload to Google Drive
  async uploadToGoogleDrive(fileId, fileName) {
    try {
      console.log('🔄 Calling Google Drive function...');
      console.log('Function ID:', import.meta.env.VITE_APPWRITE_FUNCTION_ID);
      console.log('File ID:', fileId);
      console.log('File Name:', fileName);
      console.log('Bucket ID:', import.meta.env.VITE_APPWRITE_BUCKET_ID);

      const payload = {
        fileId: fileId,
        fileName: fileName,
        bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID
      };
      
      console.log('📤 Function payload:', payload);
      console.log('📤 Stringified payload:', JSON.stringify(payload));

      // Try different execution methods based on Appwrite version
      let execution;
      try {
        // New SDK format (recommended)
        execution = await functions.createExecution(
          import.meta.env.VITE_APPWRITE_FUNCTION_ID,
          JSON.stringify(payload),
          false // async execution
        );
      } catch (firstError) {
        console.log('⚠️ First execution method failed, trying alternative...');
        try {
          // Alternative format
          execution = await functions.createExecution(
            import.meta.env.VITE_APPWRITE_FUNCTION_ID,
            JSON.stringify(payload)
          );
        } catch (secondError) {
          console.log('⚠️ Second method failed, trying with explicit parameters...');
          // Older SDK format
          execution = await functions.createExecution(
            import.meta.env.VITE_APPWRITE_FUNCTION_ID,
            JSON.stringify(payload),
            false, // async
            '/', // path
            'POST' // method
          );
        }
      }

      console.log('✅ Function execution started:', execution);
      return execution;
    } catch (error) {
      console.error('❌ Error calling Google Drive function:', error);
      console.error('Full error object:', error);
      throw error;
    }
  }

  // Alternative method using body as data parameter
  async uploadToGoogleDriveAlt(fileId, fileName) {
    try {
      console.log('🔄 Calling Google Drive function (alternative method)...');
      
      const payload = {
        fileId: fileId,
        fileName: fileName,
        bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID
      };

      // Try with data parameter instead of body
      const execution = await functions.createExecution(
        import.meta.env.VITE_APPWRITE_FUNCTION_ID,
        '', // empty body
        false, // async
        '/', // path
        'POST', // method
        {}, // headers
        payload // data parameter
      );

      console.log('✅ Alternative function execution started:', execution);
      return execution;
    } catch (error) {
      console.error('❌ Error calling Google Drive function (alt method):', error);
      throw error;
    }
  }

  // Get execution status and result
  async getExecutionResult(executionId) {
    try {
      const execution = await functions.getExecution(
        import.meta.env.VITE_APPWRITE_FUNCTION_ID,
        executionId
      );
      
      console.log('📊 Execution status:', {
        id: execution.$id,
        status: execution.status,
        statusCode: execution.statusCode,
        response: execution.responseBody,
        stderr: execution.stderr,
        stdout: execution.stdout
      });
      
      return execution;
    } catch (error) {
      console.error('❌ Error getting execution result:', error);
      throw error;
    }
  }

  // Poll execution until completion
  async pollExecution(executionId, maxAttempts = 30, interval = 2000) {
    console.log('🔄 Starting to poll execution:', executionId);
    
    for (let i = 0; i < maxAttempts; i++) {
      console.log(`📡 Poll attempt ${i + 1}/${maxAttempts}`);
      
      const execution = await this.getExecutionResult(executionId);
      
      if (execution.status === 'completed') {
        console.log('✅ Function execution completed successfully');
        try {
          const result = JSON.parse(execution.responseBody);
          console.log('📄 Function result:', result);
          return {
            success: true,
            result: result,
            execution: execution
          };
        } catch (parseError) {
          console.error('❌ Failed to parse execution result:', parseError);
          console.log('Raw response:', execution.responseBody);
          return {
            success: false,
            error: 'Failed to parse execution result: ' + execution.responseBody,
            execution: execution
          };
        }
      } else if (execution.status === 'failed') {
        console.error('❌ Function execution failed');
        console.error('Error details:', execution.stderr);
        console.log('Stdout:', execution.stdout);
        return {
          success: false,
          error: execution.stderr || execution.responseBody || 'Function execution failed',
          execution: execution
        };
      } else {
        console.log(`⏳ Execution status: ${execution.status}, waiting...`);
      }
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    console.error('⏰ Function execution timeout after', maxAttempts, 'attempts');
    throw new Error('Function execution timeout');
  }

  // Delete file from Appwrite storage
  async deleteFile(fileId) {
    try {
      console.log('🗑️ Deleting file from Appwrite:', fileId);
      await storage.deleteFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId
      );
      console.log('✅ File deleted successfully');
      return true;
    } catch (error) {
      console.error('❌ Error deleting file from Appwrite:', error);
      throw error;
    }
  }

  // Check environment variables
  checkEnvironmentVariables() {
    const required = [
      'VITE_APPWRITE_ENDPOINT',
      'VITE_APPWRITE_PROJECT_ID', 
      'VITE_APPWRITE_BUCKET_ID',
      'VITE_APPWRITE_FUNCTION_ID'
    ];

    const missing = required.filter(env => !import.meta.env[env]);
    
    if (missing.length > 0) {
      console.error('❌ Missing environment variables:', missing);
      return false;
    }
    
    console.log('✅ All environment variables are set');
    console.log('Environment check:', {
      endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
      projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
      bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
      functionId: import.meta.env.VITE_APPWRITE_FUNCTION_ID
    });
    
    return true;
  }
}

export default NotesService;