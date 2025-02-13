interface ChatToFilePageProps {
  params: {
    id: string;
  };
}

const ChatToFilePage = ({ params: { id } }: ChatToFilePageProps) => {
  return <div>{id}</div>;
};

export default ChatToFilePage;
