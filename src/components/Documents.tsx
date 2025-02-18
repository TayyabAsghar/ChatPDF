import UploadDocument from "@/components/uploader/UploadDocument";

const Documents = () => {
  return (
    <div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      <UploadDocument buttonType="text" buttonText="Add a Document" />
    </div>
  );
};

export default Documents;
