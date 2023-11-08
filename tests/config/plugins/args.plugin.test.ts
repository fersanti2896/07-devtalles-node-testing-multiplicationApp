import { exec } from 'child_process';

const runCommand = async( args: string[] ) => {
    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import('../../../src/config/plugins/args.plugin');

    return yarg;
}

describe('Test in the args.', () => { 
    const originalArgv = process.argv;

    /* Se limpian cada test */
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values.', async() => { 
        const argv = await runCommand(['-b', '5']);
        
        expect( argv ).toEqual( expect.objectContaining( {
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }));
    });

    test('should return configuration with custom values.', async() => { 
        const argv = await runCommand(['-b', '10', '-l', '20', '-s', '-n', 'multiplication-of-10', '-d', 'code']);
        
        expect( argv ).toEqual( expect.objectContaining( {
            b: 10,
            l: 20,
            s: true,
            n: 'multiplication-of-10',
            d: 'code'
        }) );
    });
});