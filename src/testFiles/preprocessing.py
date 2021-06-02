import os

PathToProcess = './src/testFiles/testInput/'
os.chdir(PathToProcess)

def preprocess():
    '''Function that removes repeated edges, as well as self loops. Intended to be use on small .txt files (<30Mb)'''
    for file in os.listdir():
        file_name,file_ext = os.path.splitext(file)
        with open(file,'r') as inputFile, open(f'{file_name}_proc{file_ext}','w') as output:
            header = inputFile.readline()
            output.write(header)
            NoRepeat=[]  
            for line in inputFile:
                nodeA,nodeB,weight = line.split(' ')
                if nodeA == nodeB:
                    continue
                edge = ([nodeA,nodeB] if (int(nodeA) < int(nodeB)) else [nodeB,nodeA])
                if edge not in NoRepeat:
                    NoRepeat.append(edge)
                    output.write(' '.join(edge)+' '+ weight)
                    
        print(f'preprocessing of {file} is done')

if __name__ == '__main__':
    preprocess()