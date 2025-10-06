import * as React from 'react';

interface JobSubmissionConfirmationEmailProps {
  jobTitle: string;
  companyName: string;
  contactEmail: string;
}

export const JobSubmissionConfirmationEmail: React.FC<JobSubmissionConfirmationEmailProps> = ({
  jobTitle,
  companyName,
  contactEmail,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9fafb' }}>
    {/* Header */}
    <div style={{ backgroundColor: '#111827', padding: '30px 20px', borderRadius: '8px 8px 0 0', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
          <span style={{ color: '#111827', fontSize: '18px', fontWeight: 'bold' }}>ACP</span>
        </div>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>ACP Market</span>
      </div>
    </div>

    {/* Body */}
    <div style={{ backgroundColor: 'white', padding: '40px 30px', borderRadius: '0 0 8px 8px', border: '1px solid #e5e7eb' }}>
      {/* Success Icon */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', backgroundColor: '#d1fae5', borderRadius: '50%', marginBottom: '20px' }}>
          <span style={{ fontSize: '30px' }}>✓</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 10px 0' }}>
          Job Posted Successfully!
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: '0' }}>
          Thank you for posting on ACP Market
        </p>
      </div>

      {/* Job Details */}
      <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 15px 0' }}>
          Your Job Posting
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>Position:</td>
            <td style={{ padding: '8px 0', fontSize: '14px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>{jobTitle}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>Company:</td>
            <td style={{ padding: '8px 0', fontSize: '14px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>{companyName}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontSize: '14px', color: '#6b7280' }}>Contact Email:</td>
            <td style={{ padding: '8px 0', fontSize: '14px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>{contactEmail}</td>
          </tr>
        </table>
      </div>

      {/* What Happens Next */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
          What Happens Next?
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flexShrink: '0', width: '28px', height: '28px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#2563eb' }}>
              1
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                Review Process
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.5' }}>
                Our team will review your job posting to ensure it meets our guidelines and is relevant to the AI/MCP community.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flexShrink: '0', width: '28px', height: '28px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#2563eb' }}>
              2
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                Approval & Publishing
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.5' }}>
                Once approved (typically within 24 hours), your job will be published and visible to thousands of AI professionals.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flexShrink: '0', width: '28px', height: '28px', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#2563eb' }}>
              3
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                30-Day Visibility
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0', lineHeight: '1.5' }}>
                Your job will remain active for 30 days, reaching over 100,000+ monthly visitors interested in AI and MCP technologies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <a href="https://acp-market.com/jobs" style={{ display: 'inline-block', padding: '12px 32px', backgroundColor: '#111827', color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>
          Browse All Jobs
        </a>
      </div>

      {/* Info Box */}
      <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px', borderRadius: '8px', marginBottom: '30px' }}>
        <p style={{ fontSize: '14px', color: '#1e40af', margin: '0', lineHeight: '1.5' }}>
          <strong>📧 Email Notification:</strong> We'll send you another email when your job is approved and goes live.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
          Typical Timeline
        </h3>
        <ul style={{ margin: '0', padding: '0 0 0 20px', fontSize: '14px', color: '#6b7280', lineHeight: '1.8' }}>
          <li><strong>Within 24 hours:</strong> Review and approval</li>
          <li><strong>After approval:</strong> Immediate publication on the jobs page</li>
          <li><strong>30 days:</strong> Your job remains active and visible</li>
        </ul>
      </div>
    </div>

    {/* Footer */}
    <div style={{ textAlign: 'center', padding: '30px 20px', color: '#6b7280', fontSize: '12px' }}>
      <p style={{ margin: '0 0 10px 0' }}>
        Questions or need help?{' '}
        <a href="mailto:jobs@acp-market.com" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Contact us
        </a>
      </p>
      <p style={{ margin: '0 0 10px 0' }}>
        <a href="https://acp-market.com" style={{ color: '#6b7280', textDecoration: 'none' }}>
          ACP Market
        </a>
        {' · '}
        <a href="https://acp-market.com/jobs" style={{ color: '#6b7280', textDecoration: 'none' }}>
          Jobs
        </a>
        {' · '}
        <a href="https://acp-market.com/categories" style={{ color: '#6b7280', textDecoration: 'none' }}>
          Categories
        </a>
      </p>
      <p style={{ margin: '0', color: '#9ca3af' }}>
        © 2025 ACP Market. All rights reserved.
      </p>
    </div>
  </div>
);

export default JobSubmissionConfirmationEmail;

