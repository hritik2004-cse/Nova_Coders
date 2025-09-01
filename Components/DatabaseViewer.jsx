"use client"
import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiDownload, FiSearch, FiFilter } from 'react-icons/fi';

const DatabaseViewer = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [stats, setStats] = useState(null);
    const [growthData, setGrowthData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    
    // Filters
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        status: '',
        search: '',
        source: '',
        sortBy: 'subscribedAt',
        sortOrder: 'desc'
    });

    useEffect(() => {
        fetchData();
    }, [filters]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Build query string for subscribers
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });

            // Fetch subscribers
            const subscribersResponse = await fetch(`/api/admin/subscribers?${queryParams}`);
            const subscribersData = await subscribersResponse.json();
            
            // Fetch stats
            const statsResponse = await fetch('/api/newsletter?action=stats');
            const statsData = await statsResponse.json();
            
            // Fetch growth data
            const growthResponse = await fetch('/api/newsletter?action=growth&days=30');
            const growthDataResponse = await growthResponse.json();
            
            if (subscribersData.success) {
                setSubscribers(subscribersData.data || []);
                setPagination(subscribersData.pagination || {});
            }
            
            if (statsData.success) {
                setStats(statsData.stats || statsData.data);
            }
            
            if (growthDataResponse.success) {
                setGrowthData(growthDataResponse.data || []);
            }
            
            setError(null);
        } catch (err) {
            setError('Failed to fetch data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key !== 'page' ? 1 : value // Reset to page 1 when changing filters
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    const exportSubscribers = () => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Email,Status,Source,Subscribed At,First Name\n"
            + subscribers.map(sub => 
                `${sub.email},${sub.status},${sub.source},${new Date(sub.subscribedAt).toISOString()},${sub.firstName || ''}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading && subscribers.length === 0) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-300 rounded mb-4 w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="h-24 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="h-16 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> {error}
                    <button 
                        onClick={fetchData}
                        className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Newsletter Database (MongoDB)</h1>
                <div className="flex gap-2">
                    <button 
                        onClick={exportSubscribers}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        <FiDownload className="w-4 h-4" />
                        Export CSV
                    </button>
                    <button 
                        onClick={fetchData}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>
            
            {/* Stats Section */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800">Total Subscribers</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.total || 0}</p>
                    </div>
                    <div className="bg-green-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800">Active</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.active || 0}</p>
                    </div>
                    <div className="bg-yellow-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-800">Recent Growth (30d)</h3>
                        <p className="text-3xl font-bold text-yellow-600">{stats.recentGrowth || 0}</p>
                    </div>
                    <div className="bg-purple-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-800">Conversion Rate</h3>
                        <p className="text-3xl font-bold text-purple-600">{stats.conversionRate || 0}%</p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search emails..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="unsubscribed">Unsubscribed</option>
                            <option value="bounced">Bounced</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                        <select
                            value={filters.source}
                            onChange={(e) => handleFilterChange('source', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Sources</option>
                            <option value="website">Website</option>
                            <option value="api">API</option>
                            <option value="import">Import</option>
                            <option value="manual">Manual</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="subscribedAt">Subscribe Date</option>
                            <option value="email">Email</option>
                            <option value="status">Status</option>
                            <option value="emailsSent">Emails Sent</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <select
                            value={filters.sortOrder}
                            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>
            
            {/* Subscribers Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        Subscribers ({pagination.totalRecords || subscribers.length})
                    </h2>
                    <div className="text-sm text-gray-500">
                        Page {pagination.current || 1} of {pagination.total || 1}
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Source
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Emails Sent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subscribed At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        {filters.search || filters.status || filters.source 
                                            ? "No subscribers match your filters" 
                                            : "No subscribers found. Try subscribing to the newsletter!"
                                        }
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((subscriber) => (
                                    <tr key={subscriber._id || subscriber.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {subscriber.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {subscriber.firstName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                subscriber.status === 'active' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : subscriber.status === 'unsubscribed'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {subscriber.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {subscriber.source}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {subscriber.emailsSent || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {pagination.total > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing {((pagination.current - 1) * filters.limit) + 1} to {Math.min(pagination.current * filters.limit, pagination.totalRecords)} of {pagination.totalRecords} results
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.current - 1)}
                                disabled={!pagination.hasPrev}
                                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1 text-sm">
                                Page {pagination.current} of {pagination.total}
                            </span>
                            <button
                                onClick={() => handlePageChange(pagination.current + 1)}
                                disabled={!pagination.hasNext}
                                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatabaseViewer;
