interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NicknameInput({ value, onChange }: Props) {
  return (
    <>
      <label className="text-sm text-gray-600 mb-2">닉네임</label>
      <input
        type="text"
        name="nickname"
        placeholder="닉네임"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 mb-4 border rounded-md"
      />
    </>
  );
}
