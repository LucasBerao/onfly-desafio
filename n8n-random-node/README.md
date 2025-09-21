## Random (n8n Custom Node)

Node: Random — True Random Number Generator using Random.org.

### What it does
- Operation: "True Random Number Generator"
- Inputs: `Min` (integer), `Max` (integer)
- Output: `{ value, min, max, source: 'random.org' }`

### Requirements
- Node.js LTS and npm
- Docker and Docker Compose
- n8n container running (with `/home/node/.n8n/custom` mounted)

### Build & Deploy (local dev)
```bash
cd n8n-random-node
npm install
npm run build
# Build outputs to ./dist which is mounted in docker-compose
docker compose -f ../docker-compose.yml restart n8n
```

The n8n service loads custom nodes from `/home/node/.n8n/custom`, which is bind-mounted from `./dist`.

### Validate in n8n UI
1) Open `http://localhost:5678`
2) Create a workflow, add node "Random"
3) Operation: "True Random Number Generator"
4) Set Min and Max, then Execute
5) Output shows a random integer within [Min, Max]

### References (official docs)
- Programmatic-style node build: [n8n docs](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/)
- Run a custom node locally: [n8n docs](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/)
- Install private nodes: [n8n docs](https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/)
- Random.org HTTP API (integers): [Random.org](https://www.random.org/clients/http/)

### Notes
- Icon file: `src/nodes/Random/random.svg` (referenced as `file:random.svg`)
- Implementation lives in `src/nodes/Random/Random.node.ts`

