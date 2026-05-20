import mongoose, { InferSchemaType } from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true, index: true },
    content: { type: String, required: true, trim: true, maxlength: 2000 }
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type CommentDocument = InferSchemaType<typeof commentSchema> & { _id: mongoose.Types.ObjectId };
export const Comment = mongoose.model('Comment', commentSchema);
