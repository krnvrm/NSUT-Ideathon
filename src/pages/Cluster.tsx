import React, { useMemo, useState } from "react";
import dsiidc from '../assets/DSIIDC-Logo.webp';
import {
  Upload,
  CheckCircle2,
  FileText,
  ArrowRight,
  Users,
  X,
  ClipboardList,
  Calendar,
  Globe,
  Box,
  Building2,
  CreditCard,
  Shield,
  BadgeCheck,
  MapPin,
  Link as LinkIcon,
  Download,
} from "lucide-react";

// Example Data for Clusters and Members
const sampleClusterData = {
  name: "Delhi Auto Components Cluster",
  description:
    "A growing hub for auto parts manufacturing, facilitating cross-border trade and local market integration.",
  sector: "Auto Components",
  district: "Delhi",
  locality: "Mayapuri",
  members: 12,
};

type Member = {
  name: string;
  firm: string;
  category: string;
  turnover: string;
  district: string;
};

const ClusterOnboarding: React.FC = () => {
  // --- Top-level state
  const [isMember, setIsMember] = useState<boolean>(false); // becomes true after join/confirm
  const [cluster, setCluster] = useState({
    clusterName: "",
    clusterSector: "",
    district: "",
    description: "",
    locality: "",
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Profile, 2: Upload, 3: Confirmation
  const [showUpload, setShowUpload] = useState(false);

  // --- Mock: handle file upload
  const handleUpload = () => {
    const uploaded: Member[] = [
      {
        name: "Rajesh Kumar",
        firm: "Kumar Auto Components",
        category: "Auto Components",
        turnover: "₹2.4 Cr",
        district: "Delhi",
      },
      {
        name: "Priya Sharma",
        firm: "Sharma Textiles",
        category: "Textiles",
        turnover: "₹1.1 Cr",
        district: "Ghaziabad",
      },
      {
        name: "Amit Singh",
        firm: "Singh Electronics",
        category: "Electronics",
        turnover: "₹3.2 Cr",
        district: "Noida",
      },
    ];
    setMembers(uploaded);
    setStep(3);
    alert("Sample data uploaded successfully!");
  };

  // --- CTA: finalize onboarding → become member & load dashboard
  const finalizeAndJoin = () => {
    // If user left fields empty, backfill with sample cluster for demo
    const c = {
      clusterName:
        cluster.clusterName || sampleClusterData.name,
      clusterSector:
        cluster.clusterSector || sampleClusterData.sector,
      district:
        cluster.district || sampleClusterData.district,
      description:
        cluster.description || sampleClusterData.description,
      locality:
        cluster.locality || sampleClusterData.locality,
    };
    setCluster(c);
    if (members.length === 0) {
      // ensure we at least show some members on dashboard
      setMembers([
        {
          name: "Rajesh Kumar",
          firm: "Kumar Auto Components",
          category: "Auto Components",
          turnover: "₹2.4 Cr",
          district: "Delhi",
        },
        {
          name: "Amit Singh",
          firm: "Singh Electronics",
          category: "Electronics",
          turnover: "₹3.2 Cr",
          district: "Noida",
        },
        {
          name: "Varun Jain",
          firm: "Precision Fasteners Co.",
          category: "Fasteners",
          turnover: "₹1.7 Cr",
          district: "Delhi",
        },
      ]);
    }
    setIsMember(true);
  };

  // --------------------------
  // Step 1: Cluster Profile
  // --------------------------
  const renderClusterProfile = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cluster Profile</h2>
      <p className="text-lg text-gray-600 mb-4">
        Complete the cluster profile to start the onboarding process and enable integration with ONDC and financing
        platforms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Delhi Auto Components Cluster"
            value={cluster.clusterName}
            onChange={(e) => setCluster((s) => ({ ...s, clusterName: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Auto Components"
            value={cluster.clusterSector}
            onChange={(e) => setCluster((s) => ({ ...s, clusterSector: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Delhi"
            value={cluster.district}
            onChange={(e) => setCluster((s) => ({ ...s, district: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Locality / Cluster Area</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Mayapuri / Wazirpur / Okhla"
            value={cluster.locality}
            onChange={(e) => setCluster((s) => ({ ...s, locality: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Brief description of your cluster"
            rows={4}
            value={cluster.description}
            onChange={(e) => setCluster((s) => ({ ...s, description: e.target.value }))}
          />
        </div>
      </div>

      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg" onClick={() => setStep(2)}>
        Proceed to Upload Members
      </button>
    </div>
  );

  // --------------------------
  // Step 2: Member Upload
  // --------------------------
  const renderMemberUpload = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Members</h2>
      <p className="text-lg text-gray-600 mb-4">
        Upload the CSV/XLSX file containing details of your cluster members for bulk onboarding.
      </p>
      <div className="border border-dashed p-8 rounded-xl text-center mb-6">
        <Upload className="h-8 w-8 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-500">Drag & drop file here or click to browse</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setShowUpload(true)}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center gap-2"
        >
          <FileText className="h-5 w-5" /> Upload CSV
        </button>
        <button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center gap-2">
          <Download className="h-5 w-5" /> Use Sample Data
        </button>
      </div>
      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg" onClick={() => setStep(3)}>
        Finish Upload
      </button>
    </div>
  );

  // --------------------------
  // Step 3: Confirmation
  // --------------------------
  const renderConfirmation = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Onboarding Complete!</h2>
      <p className="text-lg text-gray-600 mb-4">Your cluster is now onboarded. You have access to ONDC, GeM, and financial services.</p>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          <span>Cluster profile successfully created</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          <span>Udyam Registration for all members completed</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          <span>ONDC & GeM integration is ready for use</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        <button onClick={() => setStep(1)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg">
          Back to Cluster Profile
        </button>
        <button onClick={finalizeAndJoin} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
          Go to Cluster Dashboard
        </button>
      </div>
    </div>
  );

  // --------------------------
  // Dashboard (after join)
  // --------------------------

  const kpis = useMemo(
    () => [
      { label: "Members", value: members.length || sampleClusterData.members, icon: Users, tone: "bg-blue-50 text-blue-700 border-blue-200" },
      { label: "Monthly Orders", value: "1,240", icon: Box, tone: "bg-green-50 text-green-700 border-green-200" },
      { label: "Avg. Ticket", value: "₹8,700", icon: CreditCard, tone: "bg-amber-50 text-amber-700 border-amber-200" },
      { label: "Fulfillment SLA", value: "96%", icon: BadgeCheck, tone: "bg-purple-50 text-purple-700 border-purple-200" },
    ],
    [members.length]
  );

  const progressSteps = [
    { name: "Profile", done: true },
    { name: "Members", done: members.length > 0 },
    { name: "Udyam", done: true },
    { name: "ONDC", done: true },
    { name: "GeM", done: false },
    { name: "Finance", done: false },
  ];
  const progressPct = Math.round((progressSteps.filter((s) => s.done).length / progressSteps.length) * 100);

  const Dashboard: React.FC = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-600 text-white grid place-items-center">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {cluster.clusterName || sampleClusterData.name}
              </h2>
              <p className="text-gray-600">
                {cluster.clusterSector || sampleClusterData.sector} • {cluster.district || sampleClusterData.district} •{" "}
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" /> {cluster.locality || sampleClusterData.locality}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {cluster.description || sampleClusterData.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/ondc"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
            >
              <Globe className="h-4 w-4" /> Access ONDC
            </a>
            <a
              href="/gem"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold"
            >
              <LinkIcon className="h-4 w-4" /> Open GeM
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className={`rounded-2xl border p-5 shadow-sm ${k.tone}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{k.label}</p>
                <p className="text-2xl font-bold">{k.value}</p>
              </div>
              <k.icon className="h-6 w-6 opacity-80" />
            </div>
          </div>
        ))}
      </div>

      {/* Progress + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Onboarding Progress</h3>
          <div className="h-2 rounded bg-gray-200 mb-2">
            <div className="h-2 rounded bg-green-600 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-sm text-gray-600 mb-4">{progressPct}% complete</p>
          <ul className="space-y-2 text-sm">
            {progressSteps.map((s, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className={`h-4 w-4 ${s.done ? "text-green-600" : "text-gray-300"}`} />
                <span className={s.done ? "text-gray-800" : "text-gray-500"}>{s.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border shadow p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="rounded-xl border p-4 hover:bg-gray-50 flex flex-col items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Generate Udyam Batch</span>
            </button>
            <button className="rounded-xl border p-4 hover:bg-gray-50 flex flex-col items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Invite Members</span>
            </button>
            <button className="rounded-xl border p-4 hover:bg-gray-50 flex flex-col items-center gap-2">
              <CreditCard className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium">Request Working Capital</span>
            </button>
            <button className="rounded-xl border p-4 hover:bg-gray-50 flex flex-col items-center gap-2">
              <Box className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">Create Buyer RFQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Integrations + Events + Notices */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Integrations</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between border rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>ONDC Seller App</span>
              </div>
              <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs">Connected</span>
            </li>
            <li className="flex items-center justify-between border rounded-xl p-3">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-gray-700" />
                <span>GeM</span>
              </div>
              <span className="text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full text-xs">Pending</span>
            </li>
            <li className="flex items-center justify-between border rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-700" />
                <span>Aadhaar eKYC</span>
              </div>
              <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs">Verified</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Upcoming Events</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between border rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Buyer–Seller Meet (Kirti Nagar)</span>
              </div>
              <span className="text-gray-600">Aug 28</span>
            </li>
            <li className="flex items-center justify-between border rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>ONDC Catalog Workshop (Okhla)</span>
              </div>
              <span className="text-gray-600">Sep 03</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Notices</h3>
          <ul className="space-y-3 text-sm">
            <li className="border rounded-xl p-3">
              <span className="font-medium">GST & E-Invoice Session</span>
              <p className="text-gray-600">Free webinar link will be shared on cluster WhatsApp group.</p>
            </li>
            <li className="border rounded-xl p-3">
              <span className="font-medium">Credit Camp</span>
              <p className="text-gray-600">Banks visiting Bawana industrial area next week.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Members Snapshot + Map/Location + Docs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border shadow p-6 xl:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-3">Members (Snapshot)</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Firm</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Turnover</th>
                  <th className="py-2 pr-4">District</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 pr-4">{m.name}</td>
                    <td className="py-2 pr-4">{m.firm}</td>
                    <td className="py-2 pr-4">{m.category}</td>
                    <td className="py-2 pr-4">{m.turnover}</td>
                    <td className="py-2 pr-4">{m.district}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {members.length === 0 && <p className="text-gray-600">No members uploaded yet.</p>}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">Download CSV</button>
            <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">Manage Members</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Cluster Location</h3>
          <div className="rounded-xl border bg-gray-100 h-48 grid place-items-center text-gray-600">
            {/* Map placeholder — replace with actual map embed later */}
            <span>
              {cluster.locality || sampleClusterData.locality}, {cluster.district || sampleClusterData.district}
            </span>
          </div>

          <h4 className="font-semibold text-gray-900 mt-6 mb-2">Documents</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between border rounded-xl p-3">
              <span>Cluster MoU (PDF)</span>
              <a href="#" className="text-blue-600 hover:underline">
                Download
              </a>
            </li>
            <li className="flex items-center justify-between border rounded-xl p-3">
              <span>Udyam Batch Summary</span>
              <a href="#" className="text-blue-600 hover:underline">
                Download
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Support */}
      <div className="bg-white rounded-2xl border shadow p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
        <p className="text-sm text-gray-600">
          Need help with ONDC catalog, GeM bids, or finance documents? Reach our cluster coordinator.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">Message Coordinator</button>
          <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">Book Help Center Slot</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      {/* DSIIDC Logo Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div id="dsiidc-logo" className="rounded-md grid place-items-center text-sm text-gray-500">
            <img src={dsiidc} alt="DSIIDC" className="h-16 object-contain" /> 
          </div>
          {isMember ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
              Cluster Member
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
              Onboarding
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!isMember ? (
          <>
            <div className="mb-12">{step === 1 && renderClusterProfile()}</div>
            <div className="mb-12">{step === 2 && renderMemberUpload()}</div>
            <div className="mb-12">{step === 3 && renderConfirmation()}</div>
          </>
        ) : (
          <Dashboard />
        )}
      </div>

      {/* Mock upload modal (visual only) */}
      {showUpload && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowUpload(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h4 className="text-lg font-semibold mb-2">Upload CSV</h4>
            <p className="text-sm text-gray-600 mb-4">
              This is a mock uploader. Use “Use Sample Data” to quickly preview the Dashboard.
            </p>
            <div className="border border-dashed rounded-xl p-10 text-center text-gray-500">
              Drag & drop your file here
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 rounded-lg border" onClick={() => setShowUpload(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                onClick={() => {
                  setShowUpload(false);
                  handleUpload();
                }}
              >
                Simulate Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClusterOnboarding;
