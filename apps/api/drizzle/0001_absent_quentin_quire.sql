CREATE TABLE IF NOT EXISTS "ingestion_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid,
	"status" text NOT NULL,
	"fetched_count" integer DEFAULT 0 NOT NULL,
	"inserted_count" integer DEFAULT 0 NOT NULL,
	"error_message" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "importance_score" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "raw_payload" jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingestion_runs" ADD CONSTRAINT "ingestion_runs_source_id_news_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_sources"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ingestion_runs_source_started_at_idx" ON "ingestion_runs" USING btree ("source_id","started_at");