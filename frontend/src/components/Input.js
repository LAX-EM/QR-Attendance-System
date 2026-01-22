export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
