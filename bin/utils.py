def replace(file, begintoken, endtoken, replacementlines):
    destfile = open(file, "r")
    lines = destfile.readlines()
    destfile.close()
    destfile = open(file, "w")
    begintokenline = -1
    endtokenline = -1
    for i, line in enumerate(lines):
        if begintoken in line:
            destfile.write(line)
            begintokenline = i
        if endtoken in line:
            endtokenline = i
        if begintokenline == -1:
            destfile.write(line)
            continue;
        if endtokenline == -1:
            continue;
        for replacementline in replacementlines:
            destfile.write(replacementline + '\r\n')
        destfile.write(line)
        begintokenline = -1
        endtokenline = -1
    destfile.close()
