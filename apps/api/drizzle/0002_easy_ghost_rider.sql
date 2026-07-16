ALTER TABLE "briefs" ADD COLUMN "key_takeaways" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "model" text;