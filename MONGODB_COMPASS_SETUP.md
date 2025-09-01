# MongoDB Compass Setup Guide for NovaCoders Newsletter

MongoDB Compass is the official GUI for MongoDB that makes it easy to explore and manipulate your data visually.

## Step 1: Install MongoDB Community Server & Compass

### Option A: Download MongoDB with Compass (Recommended)
1. Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Select your operating system (Windows)
3. Choose "Download" - this includes both MongoDB Server and Compass
4. Run the installer and follow the setup wizard
5. **Important**: During installation, make sure to check "Install MongoDB Compass" option

### Option B: Download Compass Separately
If you already have MongoDB installed:
1. Go to [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
2. Download Compass for Windows
3. Install following the setup wizard

## Step 2: Start MongoDB Service

### On Windows:
MongoDB should start automatically as a Windows service after installation. To verify:

1. Open **Services** (Win + R, type `services.msc`)
2. Look for "MongoDB Server" - it should be running
3. If not running, right-click and select "Start"

### Alternative: Start MongoDB manually
If you prefer to start MongoDB manually:
```bash
# Navigate to MongoDB bin directory (usually)
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB server
mongod --dbpath "C:\data\db"
```

## Step 3: Connect with MongoDB Compass

1. **Open MongoDB Compass**
2. **Connection String**: Use the connection string from your `.env` file:
   ```
   mongodb://localhost:27017/novacoders
   ```
3. **Connect**: Click "Connect" button

### Connection Details:
- **Host**: localhost
- **Port**: 27017
- **Database**: novacoders (this will be created automatically when you first add data)

## Step 4: Test Your Setup

### Method 1: Using the API Test Endpoint
1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Visit the test endpoint in your browser:
   ```
   http://localhost:3000/api/test-db
   ```

3. You should see a JSON response with test results

### Method 2: Using the Database Viewer
1. Navigate to the database viewer:
   ```
   http://localhost:3000/database-viewer
   ```

2. This will show your subscriber data and allow you to manage it

### Method 3: Direct Testing in Compass
1. In MongoDB Compass, you should see your `novacoders` database appear after running the test
2. Click on the database to explore collections
3. The `subscribers` collection will contain your newsletter subscriber data

## Step 5: Explore Your Data in Compass

Once you have some subscriber data, you can:

### View Collections
- Navigate to `novacoders` database
- Click on `subscribers` collection
- View all subscriber documents

### Query Data
Use the query bar to filter data:
```javascript
// Find all active subscribers
{ "status": "active" }

// Find subscribers from website
{ "source": "website" }

// Find recent subscribers (last 7 days)
{ "subscribedAt": { "$gte": new Date(Date.now() - 7*24*60*60*1000) } }
```

### Aggregation Pipeline
Create aggregation pipelines to analyze your data:
```javascript
// Count subscribers by status
[
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
]
```

### Create Indexes
For better performance, create indexes on frequently queried fields:
- Right-click on collection → "Create Index"
- Common indexes for subscribers:
  - `{ "email": 1 }` (unique)
  - `{ "status": 1 }`
  - `{ "subscribedAt": -1 }`

## Current Configuration

Your current setup in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/novacoders
```

This configuration:
- ✅ Uses local MongoDB instance
- ✅ Connects to database named "novacoders"
- ✅ Uses default MongoDB port (27017)
- ✅ Works with mongoose (already installed)

## Useful Compass Features

### 1. Schema Analysis
- View the structure of your documents
- See field types and distributions
- Identify missing or inconsistent data

### 2. Visual Query Builder
- Build complex queries using the GUI
- No need to write MongoDB query syntax
- Export queries as code for your application

### 3. Real-time Performance Monitoring
- Monitor database performance
- View slow operations
- Analyze index usage

### 4. Import/Export Data
- Import CSV files
- Export collections as JSON or CSV
- Backup and restore data

## Troubleshooting

### Issue: "Failed to connect to localhost:27017"
**Solutions:**
1. Ensure MongoDB service is running (check Services)
2. Try restarting MongoDB service
3. Check if port 27017 is available: `netstat -an | findstr 27017`

### Issue: "Database/Collection not found"
**This is normal!** MongoDB creates databases and collections automatically when you first insert data. Try:
1. Run the test endpoint: `http://localhost:3000/api/test-db`
2. Subscribe to your newsletter to create the first document
3. Refresh Compass to see the new database

### Issue: Compass won't start
**Solutions:**
1. Try running as administrator
2. Check Windows Defender/antivirus settings
3. Reinstall Compass if necessary

## Next Steps

1. **Connect Compass** to your local MongoDB
2. **Test the connection** using the API endpoint
3. **Subscribe to your newsletter** to create test data
4. **Explore the data** in Compass
5. **Set up monitoring** and **create useful indexes**

## Production Considerations

When ready for production:
- Consider MongoDB Atlas for cloud hosting
- Set up authentication and SSL
- Configure proper backup strategies
- Monitor performance and set up alerts

MongoDB Compass works great with both local and cloud MongoDB instances, so you can use the same tool as you scale!
