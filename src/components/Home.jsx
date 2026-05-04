import { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function Home() {
    const lineData = {
        labels: Array.from({ length: 30 }, (_, i) => i + 1),
        datasets: [
            {
                label: "Cost",
                data: [120, 140, 125, 160, 145, 180, 165, 200, 185, 220, 195, 240, 210, 260, 230, 280, 250, 300, 270, 320, 285, 340, 310, 360, 335, 380, 350, 410, 380, 430],
                borderColor: "#f5611a",
                backgroundColor: "rgba(245,97,26,0.1)",
                fill: true,
            },
        ],
    };

    const pieData = {
        labels: ["EC2", "RDS", "S3", "Lambda"],
        datasets: [
            {
                data: [48, 29, 16, 7],
                backgroundColor: ["#f5611a", "#2563eb", "#16a34a", "#7c3aed"],
            },
        ],
    };
    const [page, setPage] = useState("home");
    const [showAlerts, setShowAlerts] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I’m your FinOps AI assistant 👋", from: "bot" }
    ]);
    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages([...messages, { text: input, from: "user" }]);
        setInput("");
    };

    const [input, setInput] = useState("");
    return (
        <>
            {/* NAV */}
            <nav>
                <div className="nav-right">

                    <div style={{ position: "relative" }}>
                        <button className="icon-btn" onClick={() => setShowAlerts(!showAlerts)}>
                            <div className="notif-dot"></div>🔔
                        </button>

                        {showAlerts && (
                            <div className="alert-dropdown show">
                                <div style={{ fontSize: "11px", fontWeight: "800" }}>Notifications</div>

                                <div className="alert-item">
                                    <div className="alert-dot ad-red"></div>
                                    <div>
                                        <div>Cost spike in EC2</div>
                                        <div style={{ fontSize: "11px" }}>2m ago</div>
                                    </div>
                                </div>

                                <div className="alert-item">
                                    <div className="alert-dot ad-amber"></div>
                                    <div>
                                        <div>CPU usage high</div>
                                        <div style={{ fontSize: "11px" }}>15m ago</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="btn btn-outline btn-sm" onClick={() => setPage("projects")}>
                        Get Started
                    </button>

                    <div className="avatar">AK</div>
                </div>
            </nav>

            {/* HOME */}
            {page === "home" && (
                <div className="page active">
                    <section className="hero">
                        <div className="hero-left">
                            <div className="hero-pill">✦ Powered by AI Intelligence</div>

                            <h1>
                                AI-Powered Cloud Cost <br />
                                <em>Optimization</em> Platform
                            </h1>

                            <p className="hero-sub">
                                Track, analyze, and reduce your AWS / GCP / Azure costs using real-time AI insights.
                            </p>

                            <div className="hero-btns">
                                <button className="btn btn-dark" onClick={() => setPage("projects")}>
                                    Get Started →
                                </button>

                                <button className="btn btn-outline" onClick={() => setPage("projects")}>
                                    Connect Cloud Account
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* PROJECTS */}
            {page === "projects" && (
                <div className="page active">
                    <div className="proj-page">
                        <h2>Your Cloud Projects</h2>

                        <div className="proj-grid">
                            <div className="proj-card" onClick={() => setPage("dashboard")}>
                                <div className="proj-header">
                                    <div className="proj-icon">☁️</div>
                                </div>
                                <div className="proj-name">Production AWS</div>
                                <button className="btn btn-primary btn-sm">
                                    Open Dashboard →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {page === "dashboard" && (
                <div className="page active">
                    <div className="dash-wrap">

                        {/* SIDEBAR */}
                        <div className="sidebar">
                            <div className="sb-project">
                                <div className="sp-label">Active Project</div>
                                <div className="sp-name">
                                    <div className="dot-g"></div> Production AWS
                                </div>
                            </div>

                            <div className="sb-sec">
                                <div className="sb-sec-lbl">Main</div>
                                <div className="sb-item active">📊 Overview</div>
                                <div className="sb-item">💰 Cost Analysis</div>
                                <div className="sb-item">📈 Usage</div>
                                <div className="sb-item" onClick={() => setPage("ai")}>
                                    🤖 AI Insights
                                </div>
                            </div>
                        </div>

                        {/* MAIN */}
                        <div className="dash-main">

                            <div className="dash-top">
                                <div>
                                    <h2>Cost Overview</h2>
                                    <p>Production AWS · Updated 2 min ago</p>
                                </div>
                            </div>

                            {/* METRICS */}
                            <div className="metric-grid">
                                <div className="metric-card">
                                    <div className="metric-label">Total Cost</div>
                                    <div className="metric-val mv-or">₹12,84,320</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-label">Forecast</div>
                                    <div className="metric-val mv-b">₹15,20,000</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-label">CPU Usage</div>
                                    <div className="metric-val mv-g">34%</div>
                                </div>

                                <div className="metric-card">
                                    <div className="metric-label">Services</div>
                                    <div className="metric-val">47</div>
                                </div>
                            </div>

                            {/* CHARTS */}
                            <div className="chart-row">

                                <div className="chart-card">
                                    <div className="chart-title">Cost Over Time</div>
                                    <Line data={lineData} />
                                </div>

                                <div className="chart-card">
                                    <div className="chart-title">Distribution</div>
                                    <Doughnut data={pieData} />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )}
            {page === "ai" && (
                <div className="page active">

                    <div className="dash-main">

                        <div className="dash-top center">
                            <div>
                                <div className="ai-head">AI INTELLIGENCE</div>
                                <h2>Optimization Insights</h2>
                                <p>
                                    AI-powered recommendations to reduce your cloud spend. Updated every hour.
                                </p>
                            </div>
                        </div>

                        {/* METRICS */}
                        <div className="metric-grid">

                            <div className="metric-card">
                                <div className="metric-val mv-g">₹4.8L</div>
                                <div className="metric-label">Potential monthly savings</div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-val mv-or">12</div>
                                <div className="metric-label">Active recommendations</div>
                            </div>

                            <div className="metric-card">
                                <div className="metric-val mv-r">3</div>
                                <div className="metric-label">Critical actions</div>
                            </div>

                        </div>

                        {/* MAIN CARD */}
                        <div className="chart-card" style={{ marginTop: "20px" }}>

                            <div className="chart-title">
                                🤖 AI INSIGHT
                                <span style={{ float: "right", fontSize: "12px" }}>Confidence 94%</span>
                            </div>

                            <h3 style={{ marginTop: "10px" }}>
                                EC2 Instances Are Severely Underutilized
                            </h3>

                            <p>
                                Your 6 EC2 instances in us-east-1 are averaging only 8% CPU utilization over the past 30 days.
                                Downsizing to the next instance family could save ₹1.8L per month with zero performance impact.
                            </p>

                            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                                <button className="btn btn-outline">Explain More</button>
                                <button className="btn btn-primary">Apply Suggestion</button>
                                <span style={{ marginLeft: "auto", color: "#16a34a" }}>
                                    💚 Save ₹1.8L/mo
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}