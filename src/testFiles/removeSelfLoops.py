import os


pathToFile = './src/testFiles/testInput/'
os.chdir(pathToFile)

file = 'grafo_W_5.txt'

def removeSelfLoops():
    '''This function removes only self loops. As files get too large, it becomes unviable to remove repeated edges in a practical time. That's why this function exists'''
    file_name, file_ext = os.path.splitext(file)
    with open(file,'r') as inputFile, open(f'{file_name}_proc{file_ext}','w') as output:
        header = inputFile.readline()
        output.write(header)
        for line in inputFile:
            nodeA,nodeB,weight = line.split(' ')
            if int(nodeA) != int(nodeB):
                output.write(line)
    print('done')


if __name__ =='__main__':
    removeSelfLoops()