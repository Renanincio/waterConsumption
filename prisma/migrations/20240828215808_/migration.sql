-- CreateTable
CREATE TABLE "Customer" (
    "customer_code" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_code")
);

-- CreateTable
CREATE TABLE "Measures" (
    "measure_uuid" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measure_type" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "customerCustomer_code" TEXT NOT NULL,

    CONSTRAINT "Measures_pkey" PRIMARY KEY ("measure_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Measures_measure_uuid_key" ON "Measures"("measure_uuid");

-- AddForeignKey
ALTER TABLE "Measures" ADD CONSTRAINT "Measures_customerCustomer_code_fkey" FOREIGN KEY ("customerCustomer_code") REFERENCES "Customer"("customer_code") ON DELETE RESTRICT ON UPDATE CASCADE;
