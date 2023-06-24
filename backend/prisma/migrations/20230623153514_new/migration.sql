-- CreateTable
CREATE TABLE "Conversation" (
    "conversationId" TEXT NOT NULL,
    "orgName" TEXT,
    "userEmail" TEXT,
    "orgId" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("conversationId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "sender" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "conversationId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("conversationId") ON DELETE RESTRICT ON UPDATE CASCADE;
