'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Phone,
  Building,
  Calendar,
  MessageCircle,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoRequest {
  id: string;
  requestId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  currentSoftware?: string;
  challenges: string;
  additionalNotes?: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
  emailLogs: Array<{
    emailType: string;
    status: string;
    sentAt: string;
  }>;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  scheduled: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const industryLabels: Record<string, string> = {
  'petroleum-trading': 'Petroleum Trading',
  'depot-operations': 'Depot Operations',
  'vessel-management': 'Vessel Management',
  'banking-integration': 'Banking & Finance',
  'financial-services': 'Financial Services',
  'other': 'Other',
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/admin/login');
      return;
    }

    fetchDemoRequests();
  }, [session, status, router]);

  const fetchDemoRequests = async () => {
    try {
      const response = await fetch('/api/admin/demo-requests');
      if (response.ok) {
        const data = await response.json();
        setDemoRequests(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch demo requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/demo-requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: newStatus }),
      });

      if (response.ok) {
        fetchDemoRequests(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Request ID', 'Name', 'Email', 'Phone', 'Company', 'Job Title', 
      'Industry', 'Company Size', 'Status', 'Preferred Date', 'Challenges', 'Created At'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredRequests.map(req => [
        req.requestId,
        `"${req.firstName} ${req.lastName}"`,
        req.email,
        req.phone,
        `"${req.company}"`,
        `"${req.jobTitle}"`,
        industryLabels[req.industry] || req.industry,
        req.companySize,
        req.status,
        req.preferredDate,
        `"${req.challenges.replace(/"/g, '""')}"`,
        new Date(req.createdAt).toISOString().split('T')[0]
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demo-requests-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredRequests = demoRequests.filter(req => {
    const matchesSearch = searchTerm === '' || 
      req.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || req.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const stats = {
    total: demoRequests.length,
    pending: demoRequests.filter(r => r.status === 'pending').length,
    contacted: demoRequests.filter(r => r.status === 'contacted').length,
    scheduled: demoRequests.filter(r => r.status === 'scheduled').length,
    completed: demoRequests.filter(r => r.status === 'completed').length,
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Demo Requests Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {session?.user?.name} | Role: {(session?.user as any)?.role}
              </p>
            </div>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-gray-900">{stats.contacted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Industries</option>
                {Object.entries(industryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Demo Requests Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Demo Requests ({filteredRequests.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Demo Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.firstName} {request.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            <a href={`mailto:${request.email}`} className="hover:text-blue-600">
                              {request.email}
                            </a>
                          </div>
                          <div className="text-sm text-gray-500">
                            <a href={`tel:${request.phone}`} className="hover:text-blue-600">
                              {request.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.company}</div>
                      <div className="text-sm text-gray-500">{request.jobTitle}</div>
                      <div className="text-sm text-gray-500">{request.companySize} employees</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {industryLabels[request.industry] || request.industry}
                      </div>
                      {request.currentSoftware && (
                        <div className="text-sm text-gray-500">
                          Current: {request.currentSoftware}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.preferredDate}</div>
                      <div className="text-sm text-gray-500">{request.preferredTime}</div>
                      <div className="text-xs text-gray-400">
                        Requested: {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${statusColors[request.status as keyof typeof statusColors]}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {request.status === 'pending' && (
                          <button
                            onClick={() => updateRequestStatus(request.requestId, 'contacted')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {request.status === 'contacted' && (
                          <button
                            onClick={() => updateRequestStatus(request.requestId, 'scheduled')}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Mark Scheduled
                          </button>
                        )}
                        {request.status === 'scheduled' && (
                          <button
                            onClick={() => updateRequestStatus(request.requestId, 'completed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No demo requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || industryFilter !== 'all' 
                  ? 'Try adjusting your search criteria.' 
                  : 'Demo requests will appear here once submitted.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}