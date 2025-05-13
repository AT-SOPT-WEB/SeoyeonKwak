interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export default function IdInput({ value, onChange, error }: Props) {
  return (
    <>
      <label className="text-sm text-gray-600 mb-2">아이디</label>
      <input
        type="text"
        name="id"
        placeholder="아이디"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 mb-4 border border-gray-200 rounded-md"
      />
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
    </>
  );
}
