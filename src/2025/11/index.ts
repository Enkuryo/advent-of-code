import BaseChallenge from '@lib/BaseChallenge';

type Connection = { [key: string]: Connection | null | 'out' };

export default class Challenge extends BaseChallenge {
  override getPath(): string {
    return __dirname;
  }

  override partOne(): number {
    const input = this.getPuzzleInput().reduce<{
      [key: string]: string[];
    }>((connections, current) => {
      let [key, to] = current.split(': ');
      connections[key!] = to!.split(' ');
      return connections;
    }, {});

    const memo = new Map<string, Connection | 'out'>();

    const buildTreeRecursive = (hop: string): Connection | 'out' => {
      // Return the memoized result
      if (memo.has(hop)) {
        return memo.get(hop)!;
      }

      // Getting the next hops recursively
      const nextHops = input[hop];
      if (!nextHops) return 'out';

      const connections: Connection = {};
      memo.set(hop, connections);

      for (let nextHop of nextHops!) {
        // Return 'out' if the hop is an out hop
        if (nextHop === 'out') {
          memo.set(hop, 'out');
          return 'out';
        }
        // Else start the building again
        connections[nextHop] = buildTreeRecursive(nextHop);
      }

      // Return the fully build tree for this hop
      return connections;
    };

    let tree: Connection = {};
    for (let hop of Object.keys(input)) {
      tree = { ...tree, [hop]: buildTreeRecursive(hop) };
    }

    const json = JSON.stringify(tree['you']);
    const matches = json.match(/(out)/g) ?? [];

    return matches.length;
  }

  override partTwo(): number {
    throw new Error('Method not implemented.');
  }
}
