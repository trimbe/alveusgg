import { prisma } from "@/server/db/client";

export async function getRecentNotificationsForTags({
  tags,
  take,
}: {
  tags: string[];
  take: number;
}) {
  return prisma.notification.findMany({
    where: { tag: { in: tags } },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export async function getActiveAnnouncements() {
  return prisma.notification.findMany({
    where: {
      tag: "announcements",
      OR: [{ expiresAt: { gt: new Date() } }],
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function getNotificationById(notificationId: string) {
  return prisma.notification.findUnique({
    where: { id: notificationId },
  });
}

export async function getRecentNotifications({ take }: { take: number }) {
  return prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take,
  });
}

export async function updateNotificationPushStatus({
  processingStatus,
  notificationId,
  subscriptionId,
  failedAt,
  deliveredAt,
}: {
  processingStatus: "DONE" | "PENDING";
  notificationId: string;
  subscriptionId: string;
  failedAt?: Date;
  deliveredAt?: Date;
}) {
  return prisma.notificationPush.update({
    where: {
      notificationId_subscriptionId: {
        notificationId: notificationId,
        subscriptionId: subscriptionId,
      },
    },
    data: {
      processingStatus,
      failedAt,
      deliveredAt,
    },
  });
}
