import PDFView from "@/components/PDFView";
import { getFileDownloadUrl } from "@/lib/firebase/firebaseFunctions";
import { auth } from "@clerk/nextjs/server";

interface ChatToFilePageProps {
  params: Promise<{ id: string }>;
}

const ChatToFilePage = async ({ params }: ChatToFilePageProps) => {
  auth.protect();

  const id = (await params).id;
  const { userId } = await auth();

  const downloadUrl = await getFileDownloadUrl(userId!, id);

  return (
    <div className="grid lg:grid-cols-5 h-full overflow-hidden">
      <div className="col-span-5 lg:col-span-2 overflow-y-auto"></div>
      <div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-indigo-600 lg:-order-1 overflow-auto">
        <PDFView url={downloadUrl} />
      </div>
    </div>
  );
};

export default ChatToFilePage;
