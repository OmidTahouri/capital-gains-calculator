const fs = require('fs');
const commander = require('commander');

function mergeAndAdjustDates(file1Path, file2Path, outputPath) {
    if (!file1Path || !file2Path) {
      throw new Error('Please provide two valid file paths');
    }
 
    const file1Data = JSON.parse(fs.readFileSync(file1Path, 'utf-8'));
    const file2Data = JSON.parse(fs.readFileSync(file2Path, 'utf-8'));
  
    const combinedTransactions = file1Data.Transactions.concat(file2Data.Transactions);
  
    // Sort the combined transactions by date (descending)
    combinedTransactions.sort((a, b) => new Date(b.Date) - new Date(a.Date));
  
    const allDates = [
        file1Data.FromDate, file1Data.ToDate,
        file2Data.FromDate, file2Data.ToDate,
    ];
    
    // Sort all dates in ascending order
    allDates.sort((a, b) => new Date(a) - new Date(b));

    const newFromDate = allDates[0];
    const newToDate = allDates[allDates.length - 1];
  
    const mergedData = {
      FromDate: newFromDate, 
      ToDate: newToDate,
      Transactions: combinedTransactions 
    };
  
    // Write the merged and sorted data to file
    fs.writeFileSync(outputPath, JSON.stringify(mergedData, null, 2)); 
  
    console.log('Transactions merged and written to ' + outputPath);
}

const program = new commander.Command();
program.option('-o, --output <path>', 'Output file path', 'merged.json');
program.parse(process.argv);
const options = program.opts();

const file1Path = process.argv[2];
const file2Path = process.argv[3];
const outputPath = options.output;

if (!file1Path || !file2Path) {
    console.error('Error: Please provide two file paths as arguments');
    process.exit(1); 
} else {
    if (!fs.existsSync(file1Path) || !fs.existsSync(file2Path)) {
        console.error('Error: One or both of the files do not exist');
        process.exit(1); 
    }
}

mergeAndAdjustDates(file1Path, file2Path, outputPath);
