"use server";

import {
  createUserChallengeInfo,
  readUserChallengeInfo,
  updateUserChallengeInfo,
} from "@/server/data-access/user-challenge";
import { isValidChallengeId } from "@/server/utils/challenge";
import { updateLikes } from "@/server/data-access/activities";
import { getLoggedInUser } from "./auth";

export async function getUserChallengeInfo(challengeId: number) {
  if ((await getLoggedInUser()) === null) {
    return { like: null, done: null };
  }

  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await readUserChallengeInfo(challengeId);
}

export async function setUserChallengeLike(challengeId: number, like: boolean) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  const document = await readUserChallengeInfo(challengeId);
  let updatedDoc = null;

  if (!document) {
    updatedDoc = await createUserChallengeInfo(challengeId, {
      like,
    });
    updateLikes(challengeId, like);
  } else if (document.like !== like) {
    updatedDoc = await updateUserChallengeInfo(document.$id, challengeId, {
      like,
    });
    updateLikes(challengeId, like);
  } else {
    updatedDoc = document;
  }

  return {
    $id: updatedDoc.$id,
    like: updatedDoc.like,
  };
}
