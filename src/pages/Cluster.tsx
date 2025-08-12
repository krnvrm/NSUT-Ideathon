import React, { useState } from "react";
import { Upload, CheckCircle2, FileText, ArrowRight, Users, X, ClipboardList, Calendar, Globe, Box } from "lucide-react";

// Example Data for Clusters and Members
const sampleClusterData = {
  name: "Delhi Auto Components Cluster",
  description: "A growing hub for auto parts manufacturing, facilitating cross-border trade and local market integration.",
  sector: "Auto Components",
  district: "Delhi",
  members: 12,
};

const ClusterOnboarding: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [step, setStep] = useState(1); // Step for progress tracking (1: Profile, 2: Upload, 3: Confirmation)
  const [formData, setFormData] = useState({
    clusterName: "",
    clusterSector: "",
    district: "",
    description: "",
  });

  // Handle file upload (mock)
  const handleUpload = () => {
    setMembers([
      { name: "Rajesh Kumar", firm: "Kumar Auto Components", category: "Auto Components", turnover: "₹2.4 Cr", district: "Delhi" },
      { name: "Priya Sharma", firm: "Sharma Textiles", category: "Textiles", turnover: "₹1.1 Cr", district: "Ghaziabad" },
      { name: "Amit Singh", firm: "Singh Electronics", category: "Electronics", turnover: "₹3.2 Cr", district: "Noida" },
    ]);
    setStep(3);
    alert("Sample data uploaded successfully!");
  };

  // Step 1: Cluster Profile
  const renderClusterProfile = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cluster Profile</h2>
      <p className="text-lg text-gray-600 mb-4">
        Complete the cluster profile to start the onboarding process and enable integration with ONDC and financing platforms.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Delhi Auto Components Cluster"
            value={formData.clusterName}
            onChange={(e) => setFormData({ ...formData, clusterName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Auto Components"
            value={formData.clusterSector}
            onChange={(e) => setFormData({ ...formData, clusterSector: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Delhi"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Brief description of your cluster"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          onClick={() => setStep(2)}
        >
          Proceed to Upload Members
        </button>
      </div>
    </div>
  );

  // Step 2: Member Upload
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
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center gap-2"
        >
          <FileText className="h-5 w-5" /> Sample Download
        </button>
      </div>
      <button
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        onClick={() => setStep(3)}
      >
        Finish Upload
      </button>
    </div>
  );

  // Step 3: Confirmation
  const renderConfirmation = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Onboarding Complete!</h2>
      <p className="text-lg text-gray-600 mb-4">
        Your cluster is now onboarded. You have access to ONDC, GeM, and financial services.
      </p>
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
      <button
        onClick={() => setStep(1)}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        Back to Cluster Profile
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">{step === 1 && renderClusterProfile()}</div>
        <div className="mb-12">{step === 2 && renderMemberUpload()}</div>
        <div className="mb-12">{step === 3 && renderConfirmation()}</div>
      </div>
    </div>
  );
};

export default ClusterOnboarding;
