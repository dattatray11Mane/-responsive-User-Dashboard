import { useState, useEffect } from 'react';
import { Table, Button, Card, Input, Dropdown } from '@shadcn/ui';
import Link from 'next/link';

const Dashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch assessments from the API
  const fetchAssessments = async () => {
    const res = await fetch('/api/assessments');
    const data = await res.json();
    setAssessments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const filteredAssessments = assessments.filter(assessment => 
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (column) => {
    const sorted = [...assessments].sort((a, b) => {
      if (column === 'date') {
        return new Date(a.date_assigned) - new Date(b.date_assigned);
      } else if (column === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
    setAssessments(sorted);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">Logo Placeholder</div>
        <nav className="nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/assessments">Assessments</Link>
          <Link href="/profile">Profile</Link>
        </nav>
        <Dropdown label="User">
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown>
      </header>
      
      <main className="main-content">
        <div className="assessments-summary">
          <Card>
            <h2>Total Assessments</h2>
            <p>{assessments.length}</p>
          </Card>
          <Card>
            <h2>Completed Assessments</h2>
            <p>{assessments.filter(a => a.status === 'Completed').length}</p>
          </Card>
        </div>

        <Input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title"
        />

        <Table>
          <thead>
            <tr>
              <th onClick={() => handleSort('date')}>Date Assigned</th>
              <th>Assessment Title</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4">Loading...</td></tr>
            ) : (
              filteredAssessments.map(assessment => (
                <tr key={assessment.id}>
                  <td>{new Date(assessment.date_assigned).toLocaleDateString()}</td>
                  <td>{assessment.title}</td>
                  <td>{assessment.status}</td>
                  <td>{assessment.status === 'Completed' ? assessment.score : '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Button onClick={() => alert('Start New Assessment!')}>Start New Assessment</Button>
      </main>
    </div>
  );
};

export default Dashboard;
