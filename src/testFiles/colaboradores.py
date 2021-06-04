import pandas as pd
import os

PathToProcess = './src/testFiles/testInput/'
os.chdir(PathToProcess)

df = pd.read_csv('https://www.cos.ufrj.br/~daniel/grafos/data/rede_colaboracao_vertices.txt',header=None,index_col=0)
series = df.squeeze();
series = series.str.replace(' ','_')
with open('colaboradores.txt','r') as inputFile ,open('mappedcolaborators.txt','w') as output:
    header = inputFile.readline()
    output.write(header)
    for line in inputFile:
        [colaborator1,colaborator2,weight] = line.split(' ')
        output.write(f'{series[int(colaborator1)]} {series[int(colaborator2)]} {weight}')
print('done')