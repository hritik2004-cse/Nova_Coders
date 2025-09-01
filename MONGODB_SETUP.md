# MongoDB Setup Guide for Newsletter System

This guide will help you set up MongoDB for the NovaCoders newsletter system.

## Quick Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. **Sign up for MongoDB Atlas** (free tier available)
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster (select the free M0 Sandbox tier)

2. **Configure your cluster**
   - Choose a cloud provider and region
   - Wait for cluster to be created (2-5 minutes)

3. **Set up database access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and strong password
   - Set user privileges to "Read and write to any database"

4. **Configure network access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0) for development
   - For production, add your specific IP addresses

5. **Get your connection string**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/newsletter`)

### Option 2: Local MongoDB Installation
1. **Download MongoDB Community Server**
   - Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Download for your operating system
   - Install following the setup wizard

2. **Start MongoDB service**
   - Windows: MongoDB should start automatically as a service
   - Mac: `brew services start mongodb/brew/mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Your connection string will be**:
   ```
   mongodb://localhost:27017/newsletter
   ```

## Environment Configuration

### Step 1: Update your .env.local file
Add your MongoDB connection string to `.env.local`:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/newsletter

# Alternative format for local MongoDB
# MONGODB_URI=mongodb://localhost:27017/newsletter

# Existing EmailJS configuration
EMAILJS_SERVICE_ID=service_5p9pbsg
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

### Step 2: Replace the placeholders
- Replace `username` with your MongoDB username
- Replace `password` with your MongoDB password
- Replace `cluster.mongodb.net` with your actual cluster URL
- Replace `newsletter` with your preferred database name

## Testing Your Setup

### Method 1: Using the API endpoint
1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Visit the test endpoint:
   ```
   http://localhost:3000/api/test-db
   ```

3. You should see a JSON response with test results

### Method 2: Using the database viewer
1. Navigate to:
   ```
   http://localhost:3000/database-viewer
   ```

2. This page will show your subscriber data and statistics

### Method 3: Using the terminal test utility
1. Navigate to your project directory
2. Run the test script:
   ```bash
   node backend/utils/testConnection.js
   ```

## Common Issues and Solutions

### Issue: "MongoNetworkError: failed to connect"
**Solutions:**
- Check your internet connection
- Verify the MongoDB URI is correct
- For Atlas: Ensure your IP is whitelisted in Network Access
- For local: Ensure MongoDB service is running

### Issue: "MongoAuthenticationError"
**Solutions:**
- Double-check your username and password
- Ensure the user has proper permissions
- Make sure to URL-encode special characters in password

### Issue: "MongoParseError: Invalid connection string"
**Solutions:**
- Verify the connection string format
- Ensure no extra spaces or characters
- For Atlas: Use the connection string format provided by MongoDB

### Issue: Environment variables not loading
**Solutions:**
- Ensure `.env.local` is in the root directory
- Restart your development server after adding variables
- Check for typos in variable names

## Project Structure

Your MongoDB integration includes:

```
backend/
├── models/
│   └── SubscriberMongo.js          # MongoDB schema definition
├── controllers/
│   └── NewsletterMongoController.js # Database operations
├── utils/
│   ├── dbConnect.js                # Connection utility
│   └── testConnection.js           # Test utility
app/api/
├── newsletter/route.js             # Newsletter API endpoint
├── admin/subscribers/route.js      # Admin subscriber management
└── test-db/route.js               # Database testing endpoint
Components/
└── DatabaseViewer.jsx              # Admin interface for viewing data
```

## Database Schema

The system uses a comprehensive subscriber schema with:

- **Basic Info**: email, firstName, lastName
- **Status Management**: active, unsubscribed, bounced
- **Analytics**: emailsSent, lastEmailSent, clickThroughs
- **Preferences**: frequency, topics, format
- **Metadata**: source, tags, subscribedAt, unsubscribedAt
- **Automatic Features**: Indexes for performance, validation, virtual fields

## Next Steps

1. **Set up your MongoDB connection** using one of the options above
2. **Update your .env.local** with the connection string
3. **Test the connection** using one of the testing methods
4. **Try subscribing** to your newsletter to see data in MongoDB
5. **Use the database viewer** at `/database-viewer` to manage subscribers

## Production Considerations

- Use MongoDB Atlas for production (better security and reliability)
- Set up proper IP whitelisting (don't use 0.0.0.0/0 in production)
- Use environment-specific database names
- Set up monitoring and backups
- Consider implementing connection pooling for high traffic

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Use the test endpoint to diagnose connection problems
3. Verify your environment variables are set correctly
4. Ensure your MongoDB service/cluster is running and accessible

The system is designed to be robust and will provide detailed error messages to help you troubleshoot any issues.
