"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, doc } from "firebase/firestore";
import { DOC_FREE_LIMIT, DOC_PRO_LIMIT } from "@/data/limits";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const useSubscriptions = () => {
  const { user } = useUser();
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);
  const [hasActiveMembership, setHasActiveMembership] = useState(null);

  const [filesSnapshot, filesLoading, error] = useCollection(
    user && collection(db, "users", user?.id, "files")
  );
  const [snapshot, loading] = useDocument(user && doc(db, "users", user.id), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (!snapshot) return;

    const data = snapshot.data();

    if (!data) return;

    setHasActiveMembership(data.hasActiveMembership);
  }, [snapshot]);

  useEffect(() => {
    if (!filesSnapshot || hasActiveMembership === null) return;

    const files = filesSnapshot.docs;
    const usersLimit = hasActiveMembership ? DOC_PRO_LIMIT : DOC_FREE_LIMIT;

    setIsOverFileLimit(files.length >= usersLimit);
  }, [filesSnapshot, hasActiveMembership]);

  return { hasActiveMembership, loading, error, isOverFileLimit, filesLoading };
};

export default useSubscriptions;
