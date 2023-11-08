import { ServerApp } from '../src/presentation/server-app';

describe('Test in the app', () => { 
    test('should call Server.run with values', async() => { 
        const serverRunMock = jest.fn();

        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10']

        await import('../src/app');

        expect( serverRunMock ).toHaveBeenCalledWith({
            base: 10, 
            destination: "outputs", 
            limit: 10, 
            name: "multiplication-table", 
            showTable: false
        });
    });
})