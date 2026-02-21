import { useMemo, useState } from 'react'
import './App.css'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts'

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981']

const datasets = {
  '7D': {
    stats: [
      { label: 'Revenue (MTD)', value: 'SAR 128,400', delta: '+12.4%', trend: 'up' },
      { label: 'Qualified Leads', value: '42', delta: '+8.1%', trend: 'up' },
      { label: 'Conversion Rate', value: '6.9%', delta: '+1.3%', trend: 'up' },
      { label: 'Project Utilization', value: '81%', delta: '-2.0%', trend: 'down' },
    ],
    revenueTrend: [
      { label: 'Mon', value: 72 },
      { label: 'Tue', value: 84 },
      { label: 'Wed', value: 96 },
      { label: 'Thu', value: 108 },
      { label: 'Fri', value: 128 },
    ],
    pipeline: [
      { stage: 'Discovery', amount: 1200 },
      { stage: 'Proposal', amount: 840 },
      { stage: 'Negotiation', amount: 410 },
      { stage: 'Won', amount: 290 },
    ],
    serviceMix: [
      { name: 'Automation', value: 38 },
      { name: 'AI Advisory', value: 29 },
      { name: 'Data/CX', value: 20 },
      { name: 'Managed Ops', value: 13 },
    ],
    leadFunnel: [
      { step: 'Visitors', value: 480 },
      { step: 'MQL', value: 121 },
      { step: 'SQL', value: 63 },
      { step: 'Deals', value: 17 },
    ],
    delivery: [
      { week: 'W1', onTime: 92 },
      { week: 'W2', onTime: 89 },
      { week: 'W3', onTime: 94 },
      { week: 'W4', onTime: 96 },
    ],
  },
  '30D': {
    stats: [
      { label: 'Revenue (MTD)', value: 'SAR 446,000', delta: '+19.1%', trend: 'up' },
      { label: 'Qualified Leads', value: '156', delta: '+15.2%', trend: 'up' },
      { label: 'Conversion Rate', value: '7.4%', delta: '+0.9%', trend: 'up' },
      { label: 'Project Utilization', value: '84%', delta: '+1.2%', trend: 'up' },
    ],
    revenueTrend: [
      { label: 'W1', value: 290 },
      { label: 'W2', value: 340 },
      { label: 'W3', value: 390 },
      { label: 'W4', value: 446 },
    ],
    pipeline: [
      { stage: 'Discovery', amount: 3200 },
      { stage: 'Proposal', amount: 2140 },
      { stage: 'Negotiation', amount: 1280 },
      { stage: 'Won', amount: 990 },
    ],
    serviceMix: [
      { name: 'Automation', value: 34 },
      { name: 'AI Advisory', value: 31 },
      { name: 'Data/CX', value: 21 },
      { name: 'Managed Ops', value: 14 },
    ],
    leadFunnel: [
      { step: 'Visitors', value: 1800 },
      { step: 'MQL', value: 542 },
      { step: 'SQL', value: 231 },
      { step: 'Deals', value: 62 },
    ],
    delivery: [
      { week: 'W1', onTime: 90 },
      { week: 'W2', onTime: 91 },
      { week: 'W3', onTime: 93 },
      { week: 'W4', onTime: 95 },
    ],
  },
  QTD: {
    stats: [
      { label: 'Revenue (QTD)', value: 'SAR 1.34M', delta: '+23.0%', trend: 'up' },
      { label: 'Qualified Leads', value: '392', delta: '+21.6%', trend: 'up' },
      { label: 'Conversion Rate', value: '7.1%', delta: '+0.7%', trend: 'up' },
      { label: 'Project Utilization', value: '86%', delta: '+2.1%', trend: 'up' },
    ],
    revenueTrend: [
      { label: 'Jan', value: 390 },
      { label: 'Feb', value: 446 },
      { label: 'Mar', value: 508 },
    ],
    pipeline: [
      { stage: 'Discovery', amount: 5700 },
      { stage: 'Proposal', amount: 4020 },
      { stage: 'Negotiation', amount: 2500 },
      { stage: 'Won', amount: 1700 },
    ],
    serviceMix: [
      { name: 'Automation', value: 33 },
      { name: 'AI Advisory', value: 35 },
      { name: 'Data/CX', value: 18 },
      { name: 'Managed Ops', value: 14 },
    ],
    leadFunnel: [
      { step: 'Visitors', value: 5300 },
      { step: 'MQL', value: 1490 },
      { step: 'SQL', value: 621 },
      { step: 'Deals', value: 173 },
    ],
    delivery: [
      { week: 'M1', onTime: 90 },
      { week: 'M2', onTime: 92 },
      { week: 'M3', onTime: 95 },
    ],
  },
  YTD: {
    stats: [
      { label: 'Revenue (YTD)', value: 'SAR 4.8M', delta: '+27.8%', trend: 'up' },
      { label: 'Qualified Leads', value: '1,420', delta: '+18.4%', trend: 'up' },
      { label: 'Conversion Rate', value: '7.6%', delta: '+1.0%', trend: 'up' },
      { label: 'Project Utilization', value: '88%', delta: '+3.2%', trend: 'up' },
    ],
    revenueTrend: [
      { label: 'Q1', value: 1340 },
      { label: 'Q2', value: 1620 },
      { label: 'Q3', value: 1840 },
    ],
    pipeline: [
      { stage: 'Discovery', amount: 9800 },
      { stage: 'Proposal', amount: 7100 },
      { stage: 'Negotiation', amount: 4400 },
      { stage: 'Won', amount: 3100 },
    ],
    serviceMix: [
      { name: 'Automation', value: 30 },
      { name: 'AI Advisory', value: 38 },
      { name: 'Data/CX', value: 19 },
      { name: 'Managed Ops', value: 13 },
    ],
    leadFunnel: [
      { step: 'Visitors', value: 16500 },
      { step: 'MQL', value: 4320 },
      { step: 'SQL', value: 1840 },
      { step: 'Deals', value: 520 },
    ],
    delivery: [
      { week: 'Q1', onTime: 91 },
      { week: 'Q2', onTime: 93 },
      { week: 'Q3', onTime: 96 },
    ],
  },
}

const activities = [
  { title: 'Qiddiya workshop proposal sent', time: '2h ago' },
  { title: 'Aramco automation discovery booked', time: '5h ago' },
  { title: 'New partner profile approved', time: 'Yesterday' },
]

export default function App() {
  const [range, setRange] = useState('7D')
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const data = useMemo(() => datasets[range], [range])

  return (
    <div className={`app-shell ${dark ? 'theme-dark' : 'theme-light'}`}>
      <aside className={`sidebar card ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <h2>DTS</h2>
          <span>Executive</span>
        </div>
        <nav>
          <a className="active" href="#">Overview</a>
          <a href="#">Pipeline</a>
          <a href="#">Clients</a>
          <a href="#">Projects</a>
          <a href="#">Reports</a>
        </nav>
        <div className="sidebar-foot">
          <small>Riyadh Office</small>
          <strong>Executive View</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar card">
          <div className="mobile-top-row">
            <button className="icon-btn" onClick={() => setMenuOpen((v) => !v)}>☰</button>
            <button className="icon-btn" onClick={() => setDark((v) => !v)}>{dark ? '☀️' : '🌙'}</button>
          </div>
          <div>
            <h1>DTS Executive Dashboard</h1>
            <p>Mobile-first, contemporary, and fully responsive</p>
          </div>
          <div className="topbar-actions">
            <div className="filters">
              {['7D', '30D', 'QTD', 'YTD'].map((k) => (
                <button key={k} className={`chip ${range === k ? 'active' : ''}`} onClick={() => setRange(k)}>{k}</button>
              ))}
            </div>
            <button className="action-btn">Export Brief</button>
          </div>
        </header>

        <section className="stats-grid">
          {data.stats.map((s) => (
            <article key={s.label} className="card stat-card">
              <span>{s.label}</span>
              <h2>{s.value}</h2>
              <small className={s.trend === 'up' ? 'up' : 'down'}>{s.delta} vs previous</small>
            </article>
          ))}
        </section>

        <section className="chart-grid">
          <article className="card panel-large">
            <h3>Revenue Trend</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data.revenueTrend}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.55} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.08} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#rev)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="card panel-small">
            <h3>Service Mix</h3>
            <div className="chart-wrap chart-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={data.serviceMix} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3}>
                    {data.serviceMix.map((e, i) => <Cell key={e.name} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              {data.serviceMix.map((item, idx) => (
                <span key={item.name}><i style={{ background: COLORS[idx] }} />{item.name}</span>
              ))}
            </div>
          </article>

          <article className="card panel-large">
            <h3>Pipeline Value by Stage</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.pipeline}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" radius={[10, 10, 2, 2]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="card panel-small">
            <h3>Lead Funnel</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart layout="vertical" data={data.leadFunnel}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="step" width={62} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="card panel-large">
            <h3>On-time Delivery %</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.delivery}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="card panel-small">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              {activities.map((a) => (
                <li key={a.title}>
                  <div>
                    <strong>{a.title}</strong>
                    <p>{a.time}</p>
                  </div>
                  <span>→</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
      {menuOpen && <button className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}
    </div>
  )
}
