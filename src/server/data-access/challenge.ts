import { Databases, Query } from "node-appwrite";
import { DB, USER_CHALLENGE_INFO_COLLECTION } from "@/server/config/server";
import { createSessionClient, getUniqueID } from "@/server/services/appwrite";

export async function readUserChallengeInfo(challengeId: number) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  const result = await databases.listDocuments(
    DB,
    USER_CHALLENGE_INFO_COLLECTION,
    [Query.equal("cId", challengeId), Query.limit(1)]
  );

  const document = result.documents[0];
  return document
    ? {
        $id: document.$id,
        like: document.like,
        done: document.done,
      }
    : null;
}

export async function createChallengeInfo(
  challengeId: number,
  data: Partial<{ like: boolean; done: boolean }>
) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  return await databases.createDocument(
    DB,
    USER_CHALLENGE_INFO_COLLECTION,
    getUniqueID(),
    {
      cId: challengeId,
      ...data,
    }
  );
}

export async function updateUserChallengeInfo(
  documentId: string,
  challengeId: number,
  data: Partial<{ liked: boolean; done: boolean }>
) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  const doc = await databases.updateDocument(
    DB,
    USER_CHALLENGE_INFO_COLLECTION,
    documentId,
    {
      cId: challengeId,
      ...data,
    }
  );

  return {
    $id: doc.$id,
    like: doc.like,
    done: doc.done,
  };
}
