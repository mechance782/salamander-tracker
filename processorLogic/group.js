class Group {
    constructor(size, centroid){
        this.size = size;
        this.centroid = centroid;
    }

    compareTo(other){
        let comp = this.size - other.size;
        if (comp !== 0) return comp;

        comp = this.centroid.x - other.centroid.x;
        if (comp !== 0) return comp;

        return this.centroid.y - other.centroid.y;
    }

    toCsvRow(){
        return `${this.size}, ${this.centroid.x}, ${this.centroid.y}`;
    }
}