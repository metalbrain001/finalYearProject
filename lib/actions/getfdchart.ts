import { drizzledb } from '@/db/drizzle';
import { movieFeedback } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { ChartData } from '@/types';

export async function getLikesVsDislikes(): Promise<ChartData> {
  const res = await drizzledb
    .select({
      feedback_type: movieFeedback.feedback_type,
      count: sql<number>`count(*)`
    })
    .from(movieFeedback)
    .groupBy(movieFeedback.feedback_type);

  return {
    labels: res.map((r) => r.feedback_type),
    datasets: [
      {
        label: 'Feedback',
        data: res.map((r) => Number(r.count)),
        backgroundColor: '#3b82f6',
        borderColor: '#1d4ed8',
        borderWidth: 2
      }
    ]
  };
}