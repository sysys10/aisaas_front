import CustomIcons from "@components/common/CustomIcons";

// AIResponseFooter를 더 작게 분리하는 예시
export default function DownloadButton({ handleDownloadCSV }: { handleDownloadCSV: () => void }) {
  return (
    <CustomIcons
      name='csvDownload'
      iconClassName='w-5 h-5 text-gray-100'
      onClick={handleDownloadCSV}
    />
  );
}
