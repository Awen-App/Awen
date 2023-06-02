-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Organization" (
    "orgId" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "orgEmail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "orgImg" TEXT NOT NULL,
    "rip" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "Cause" (
    "causeId" TEXT NOT NULL,
    "causeImg" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "causeDescription" TEXT NOT NULL,
    "causeCategory" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "target" INTEGER NOT NULL,
    "current" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Cause_pkey" PRIMARY KEY ("causeId")
);

-- CreateTable
CREATE TABLE "Donation" (
    "donationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "causeId" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("donationId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- AddForeignKey
ALTER TABLE "Cause" ADD CONSTRAINT "Cause_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Organization"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_causeId_fkey" FOREIGN KEY ("causeId") REFERENCES "Cause"("causeId") ON DELETE RESTRICT ON UPDATE CASCADE;
