import { Results } from '@splatoon-stats/types';
import { fetchSplatnet } from './splatnet';
import { formatTime, hmsToSeconds } from './utils';

(async () => {
  // Parse args
  const [_1, _2, ...options] = process.argv;
  const [fromIdStr, toIdStr, startOffsetStr] = options;
  const fromId = Number(fromIdStr);
  const toId = Number(toIdStr);
  const startOffsetSec = hmsToSeconds(startOffsetStr);

  // Fetch results
  const res = await fetchSplatnet<Results>('results');
  const { results } = res.data;

  // Generate video description text
  const battles = results
    .filter(({ battle_number }) => {
      const battleId = Number(battle_number);
      return battleId >= fromId && battleId <= toId;
    })
    .reverse(); // Make battles in chronogical order
  const firstBattleStartTime = battles[0].start_time;

  const description = battles
    .map((result) => {
      return `${formatTime(result.start_time + startOffsetSec - firstBattleStartTime)}`;
    })
    .join('\n');

  console.log(description);
})();
