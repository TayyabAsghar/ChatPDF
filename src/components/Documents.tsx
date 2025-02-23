import { auth } from "@clerk/nextjs/server";
import Document from "@/components/Document";
import UploadDocument from "@/components/uploader/UploadDocument";
import { getAllFilesSnapshot } from "@/lib/firebase/firebaseFunctions";

const Documents = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not Found");

  const documentsSnapshot = await getAllFilesSnapshot(userId);

  return (
    <div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      <UploadDocument buttonType="text" buttonText="Add a Document" />

      {documentsSnapshot.docs.map((doc) => {
        const { size, name, url, createdAt } = doc.data();

        return (
          <Document
            url={url}
            id={doc.id}
            name={name}
            size={size}
            key={doc.id}
            date={createdAt.toDate()}
          />
        );
      })}
    </div>
  );
};

export default Documents;
