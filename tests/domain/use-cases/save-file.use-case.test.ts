import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('Test in the save-file.', () => { 
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }

    const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach(() => {
        const outputFolder = fs.existsSync('outputs');

        if( outputFolder ) fs.rmSync('outputs', { recursive: true });

        const filePathExists = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
        if( filePathExists ) fs.rmSync( customOptions.fileDestination, { recursive: true } )

    })

    test('should save file wit default values.', () => { 
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
});