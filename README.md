# ReadAndGroupCSV

#Instructions to run

NodeJS script that takes as an input a path to a CSV file containing an arbitrary set of data, and outputs the same data in multiple CSV files, where values got grouped by the value of the column A. Each file should be named after the value of the column A. Output CSV files should not contain the value of column A inside.

An example of input.csv:

Column A,Column B,Column C

1,aaa,qqq

1,bbb,www

2,ccc,eee

2,ddd,rrr

3,eee,ttt

3,fff,yyy

Script should output 3 files:

1.csv:

Column B,Column C

aaa,qqq

bbb,www

2.csv:

Column B,Column C

ccc,eee

ddd,rrr

3.csv:

Column B,Column C

eee,ttt


Please follow below steps to run csv converter

- run `npm install` 

- run `node csv-converter --file=<in-file-dir> --out=<out-dir>`

- -`<in-file-dir>` can be any csv file directory (there is a test file u can use that (test file path ./input.csv) )

- -`<out-dir>`can be any dir where u want ot store result.

