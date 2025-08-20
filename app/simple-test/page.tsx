export default function SimpleTest() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Simple Test Page</h1>
      <p className="text-lg text-gray-700">
        This page should render without any context providers.
      </p>
      <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
        <p className="text-green-800">If you can see this, the basic app is working!</p>
      </div>
    </div>
  );
}
