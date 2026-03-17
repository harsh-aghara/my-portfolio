export interface ArchNode {
  id: string;
  name: string;
  sub: string;
  label: string;
  tooltip: string;
  dotColor: 'green' | 'blue';
  active: boolean;
}

export const archNodes: ArchNode[] = [
  { id: 'http', name: 'HTTP', sub: 'Express', label: 'entry point', tooltip: '500 VUs · k6 load test', dotColor: 'green', active: true },
  { id: 'redis', name: 'Redis Lua', sub: 'atomic lock', label: 'inventory guard', tooltip: 'EVAL script — compare-and-decrement', dotColor: 'green', active: true },
  { id: 'bull', name: 'BullMQ', sub: 'job queue', label: 'async confirm', tooltip: 'DLQ + self-healing rollback', dotColor: 'blue', active: true },
  { id: 'pg', name: 'PostgreSQL', sub: 'persistence', label: 'order store', tooltip: 'transactional write on job success', dotColor: 'green', active: true },
  { id: 'prom', name: 'Prometheus', sub: '×3 scrapers', label: 'observability', tooltip: 'custom metrics per process', dotColor: 'green', active: true },
  { id: 'graf', name: 'Grafana', sub: 'dashboards', label: 'visibility', tooltip: 'latency, errors, queue depth', dotColor: 'blue', active: true },
];
