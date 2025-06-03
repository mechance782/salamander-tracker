import 'group.js'
class dfsGroupFinder{

    constructor(){}

    findConnectedGroups(image){
        if(image == null){
            throw new Error("Null Pointer Exception");
        }

        let imageClone = image;

        let groups = [];

        for(let y=0; y< imageClone.length; y++){
            for(let x =0; x<imageClone[y].length; x++){
                let value = imageClone[y][x];
                if(value !== 0 && value !== 1){
                    throw new Error("Invalid image value: " + value);
                }
                if (value === 1) {
                    let groupInfo = [0,0,0];
                    dfs(imageClone, y, x, groupInfo);

                    let size = groupInfo[0];
                    let xCentroid = Math.floor(groupInfo[1]/size);
                    let yCentroid = Math.floor(groupInfo[2]/size);
                    // TODO: Confirm import here for coordinate
                    groups.push(size, new Coordinate(xCentroid, yCentroid));

                }
            }
        }

        // TODO: Figure out import here
        groups.sort(compareGroups);
        return groups;
    }

    dfs(image, startY, startX, groupInfo){
        const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];

        const stack = [[startX, startY]];

        while(stack.length > 0){
            const [x, y] = stack.pop();

            if(y<0 || y>=image.length || x<0 || x>=image[y].length || image[y][x] ===0){
                continue;
            }

            image[x][y] = 0;

            groupInfo[0] += 1;
            groupInfo[1] +=x;
            groupInfo[2] += y;

            for (const [dx, dy] of directions){
                stack.push([x + dx, y + dy]);
            }
        }
    }
}