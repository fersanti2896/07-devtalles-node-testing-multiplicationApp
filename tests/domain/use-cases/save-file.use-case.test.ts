import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('Test in the save-file.', () => { 
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        // if( outputFolderExists ) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if( customOutputFolderExists ) fs.rmSync( customOptions.fileDestination, { recursive: true } );
    })

    test('should save file with default values.', () => { 
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute( options );
        const fileExits = fs.existsSync( filePath );
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect( result ).toBeTruthy();
        expect( fileExits ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );
    });

    test('should save file with custom values.', () => { 
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'custom content',
            fileDestination: 'custom-outputs',
            fileName: 'custom-table-name'
        }
        const filePath = `${options.fileDestination}/${options.fileName}.txt`;

        const result = saveFile.execute( options );
        const fileExits = fs.existsSync( filePath );
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect( result ).toBeTruthy();
        expect( fileExits ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );
    });

    test('should return false if directory could not be created.', () => { 
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation( 
            () => { throw new Error('This is a custom error message from testing.') } 
        );
        const result = saveFile.execute( customOptions );

        expect( result ).toBe( false );

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created.', () => { 
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation( 
            () => { throw new Error('This is a custom writing error message.') } 
        );
        const result = saveFile.execute( { fileContent: 'Hola' } );

        expect( result ).toBe( false );
        writeFileSpy.mockRestore();
    });
});