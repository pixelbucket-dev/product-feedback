import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { ReviewClient, ReviewClientList } from '../types/reviews.types';

interface Column {
  rating: ReviewClient['rating'];
  count: number;
}

type RatingDict = Record<string, number>;

interface Props {
	reviews: ReviewClientList;
}

export default function RatingCountChart({ reviews }: Props) {
  const ratingDict: RatingDict = reviews.reduce(
    (acc, { rating }) => {
      if (!rating) {
        return acc;
      }

      acc[rating] = (acc[rating] || 0) + 1;

      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as RatingDict
  );

  const sortedRatingArray = Object.entries(ratingDict);
  const data = sortedRatingArray.reduce((acc, [rating, count]) => {
    acc.push({
      rating: Number(rating) as ReviewClient['rating'],
      count,
    });

    return acc;
  }, [] as Column[]);

  const maxCount = data.reduce((max, tuple) => Math.max(max, tuple.count), 0);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
      padding={{ left: 40, bottom: 40 }}
    >
      <VictoryAxis
        tickFormat={(t) => (Number.isInteger(t) ? t : null)}
        label="Rating"
        style={{
          axisLabel: {
            padding: 25,
          },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(t) => (Number.isInteger(t) ? t : null)}
        label="Number of ratings"
        style={{
          axisLabel: {
            padding: 25,
          },
        }}
        tickCount={maxCount || 1}
      />
      <VictoryBar
        horizontal={true}
        data={data}
        x="rating"
        y="count"
        barRatio={20}
        barWidth={30}
      />
    </VictoryChart>
  );
}
