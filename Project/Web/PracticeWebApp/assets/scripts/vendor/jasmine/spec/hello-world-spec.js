describe('Hello, Jasmine:', function () {
    
    it("should be passed always", function () {
        expect(true).toEqual(true);
    });

    var functionForTest = function (a, b) {
        return a + b;
    };

    var deleteObjectOfArray = function(array, i) {
        array.splice(i, 1);
    };

    var incThirdDigitOfArray = function (array) {
        if (array) {
            if (array[2]) {
                array[2] = ++array[2];
            }
        }
    };

    describe("function mostUsefullFunction:", function () {
        
        it("tests mostUsefullFunction", function () {
            expect(functionForTest(2, 2)).toBe(4);
            expect(functionForTest(2, 2)).toBeDefined();
            expect(functionForTest()).toBeNaN();
            expect(functionForTest(2, 2)).toBeGreaterThan(2);
        });
        
    });

    describe("function deleteObjectOfArray:", function () {
        
        it("tests splice of array", function () {
            var a = [1, 2, 3, 4];

            expect(a.length).toBe(4);

            deleteObjectOfArray(a, 0);

            expect(a.length).toBe(3);
            expect(a).toEqual([2, 3, 4]);

            for (var i = 0; i < a.length; i++) {
                deleteObjectOfArray(a, 0);
                i--;
            }

            expect(a.length).toBe(0);
        });
        
    });

    describe("function incThirdDigitOfArray:", function () {
        
        it("tests normal work of function", function () {
            var a = [1, 2, 3, 4];
            
            incThirdDigitOfArray(a);
            expect(a[2]).toBe(4);
        });
        
        it("tests work of function with 0 length array", function () {
            var b = [];

            incThirdDigitOfArray(b);
            expect(b.length).toBe(0);

            incThirdDigitOfArray(null);
        });
        
        it("tests work of function with null", function () {
            incThirdDigitOfArray(null);
        });

        xit("tests work of function with non digit at index = 2", function() {
            var c = [1, 2, 'test', 3];
            incThirdDigitOfArray(c);
            expect(c[2]).toBe('test');
        });
    });
});