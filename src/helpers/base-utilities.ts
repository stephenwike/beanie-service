export class BaseUtilites {
    public static Shuffle(array: any[]) {

        var i = 0
            , j = 0
            , temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array;
    }

    public static GetRandomNumberBetween(min: number, max: number): number {
        let retVal: number;
        retVal = (Math.random() * (max - min)) + min;
        return retVal;
    }

    public static FindDuplicate(arr: any[]): boolean {
        var counts = [];
        for (var i = 0; i <= arr.length; i++) {
            if (counts[arr[i]] === undefined) {
                counts[arr[i]] = 1;
            } else {
                return true;
            }
        }
        return false;
    }
}