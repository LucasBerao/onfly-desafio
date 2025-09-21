import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    group: ['transform'],
    version: 1,
    description: 'True Random Number Generator via Random.org',
    defaults: {
      name: 'Random',
    },
    icon: 'file:random.svg',
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'True Random Number Generator',
            value: 'trueRandomNumber',
          },
        ],
        default: 'trueRandomNumber',
        description: 'Choose the operation to perform',
      },
      {
        displayName: 'Min',
        name: 'min',
        type: 'number',
        default: 1,
        description: 'Minimum integer (inclusive)',
      },
      {
        displayName: 'Max',
        name: 'max',
        type: 'number',
        default: 60,
        description: 'Maximum integer (inclusive)',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const operation = this.getNodeParameter('operation', itemIndex) as string;
      if (operation !== 'trueRandomNumber') {
        throw new Error('Unsupported operation');
      }
      const min = this.getNodeParameter('min', itemIndex) as number;
      const max = this.getNodeParameter('max', itemIndex) as number;

      if (Number.isNaN(min) || Number.isNaN(max)) {
        throw new Error('Parameters min and max must be numbers.');
      }
      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error('Parameters min and max must be integers.');
      }
      if (min > max) {
        throw new Error('Parameter min must be less than or equal to max.');
      }

      const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

      const response = await this.helpers.httpRequest({
        method: 'GET',
        url,
        headers: { 'Accept': 'text/plain' },
        returnFullResponse: false,
      });

      const value = parseInt(String(response).trim(), 10);
      if (Number.isNaN(value)) {
        throw new Error('Failed to parse integer from Random.org response');
      }

      returnData.push({ json: { value, min, max, source: 'random.org' } });
    }

    return [returnData];
  }
}


