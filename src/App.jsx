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
} from 'recharts'

const stats = [
  { label: 'Revenue (MTD)', value: 'SAR 128,400', delta: '+12.4%', trend: 'up' },
  { label: 'Qualified Leads', value: '42', delta: '+8.1%', trend: 'up' },
  { label: 'Conversion Rate', value: '6.9%', delta: '+1.3%', trend: 'up' },
  { label: 'Project Utilization', value: '81%', delta: '-2.0%', trend: 'down' },
]

const revenueTrend = [
  { week: 'W1', value: 84 },
  { week: 'W2', value: 96 },
  { week: 'W3', value: 108 },
  { week: 'W4', value: 128 },
]

const serviceMix = [
  { name: 'Automation', value: 38 },
  { name: 'AI Advisory', value: 29 },
  { name: 'Data/CX', value: 20 },
  { name: 'Managed Ops', value: 13 },
]

const pipeline = [
  { stage: 'Discovery', amount: 1200 },
  { stage: 'Proposal', amount: 840 },
  { stage: 'Negotiation', amount: 410 },
  { stage: 'Won', amount: 290 },
]

const COLORS = ['#4f8df6', '#47c3e6', '#7a6de7', '#45c79b']

const activities = [
  { title: 'Qiddiya workshop proposal sent', time: '2h ago' },
  { title: 'Aramco automation discovery booked', time: '5h ago' },
  { title: 'New partner profile approved', time: 'Yesterday' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar card">
        <h2>DTS</h2>
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
          <div>
            <h1>DTS Executive Dashboard</h1>
            <p>Contemporary snapshot of growth, pipeline, and delivery</p>
          </div>
          <div className="topbar-actions">
            <div className="filters">
              <button className="chip active">7D</button>
              <button className="chip">30D</button>
              <button className="chip">QTD</button>
              <button className="chip">YTD</button>
            </div>
            <button className="action-btn">Export Brief</button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((s) => (
            <article key={s.label} className="card stat-card">
              <span>{s.label}</span>
              <h2 className="count-up">{s.value}</h2>
              <small className={s.trend === 'up' ? 'up' : 'down'}>{s.delta} vs last week</small>
            </article>
          ))}
        </section>

        <section className="chart-grid">
          <article className="card">
            <h3>Revenue Trend (SAR K)</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f8df6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#4f8df6" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e6edf8" vertical={false} />
                  <XAxis dataKey="week" stroke="#7c95ba" />
                  <YAxis stroke="#7c95ba" />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e4f8' }} />
                  <Area type="monotone" dataKey="value" stroke="#47c3e6" fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="card">
            <h3>Service Mix (%)</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={serviceMix} dataKey="value" nameKey="name" innerRadius={45} outerRadius={78} paddingAngle={3}>
                    {serviceMix.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e4f8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              {serviceMix.map((item, idx) => (
                <span key={item.name}><i style={{ background: COLORS[idx] }} />{item.name}</span>
              ))}
            </div>
          </article>

          <article className="card">
            <h3>Pipeline Value by Stage (SAR K)</h3>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={pipeline}>
                  <CartesianGrid stroke="#e6edf8" vertical={false} />
                  <XAxis dataKey="stage" stroke="#7c95ba" />
                  <YAxis stroke="#7c95ba" />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e4f8' }} />
                  <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#4f8df6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="card">
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
    </div>
  )
}

export default App
