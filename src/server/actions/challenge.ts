"use server";

import {
  getAttempts,
  getLikes,
  getViews,
  incrementAttempts,
} from "@/server/data-access/activities";
import { isValidChallengeId } from "@/server/utils/challenge";

export async function getChallengeAttempts(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await getAttempts(challengeId);
}

export async function incrementChallengeAttempts(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await incrementAttempts(challengeId);
}

export async function getChallengeActivity(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return {
    views: await getViews(challengeId),
    likes: await getLikes(challengeId),
    attempts: await getAttempts(challengeId),
  };
}
