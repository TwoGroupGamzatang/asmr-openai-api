import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
    userId: { type: String, require: true },
    url: { type: String, require: false },
    originalText: { type: String, require: true },
    readTime: { type: Number, require: true },
    title: { type: String, require: false },
    tags: { type: [String], require: false },
    summarizedText: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
});

summarySchema.index({ userId: 1 });
summarySchema.index({ url: 1 });
summarySchema.index({ tags: 1 });
summarySchema.index({ userId: 1, url: 1, readTime: 1 }, { unique: true });

export const Summary = mongoose.model('Summary', summarySchema);
