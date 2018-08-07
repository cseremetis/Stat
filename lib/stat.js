/** !
  * Author: Christian Seremetis
  * 5 July 2018
  * Personal statistics library.
  * stores valuable functions for
  * linear algebra and statistical analysis.
  * Methods return values as doubles.
  * Arrays interpreted as vectors
  */
let stat = (function() {
  /** Checks if a given value is an array (ie. vector).
    * @param a the value we're checking
    */
	function checkArray(a) {
    if (Object.prototype.toString.call(a) != '[object Array]') {
      throw "incorrect data type required: Array";
    }
	}

  return {

  /** Finds the distance between two points.
    * @param a the first point
    * @param b the second point
    * @return the distance
    */
    distance: function(a, b) {
      checkArray(a);
      checkArray(b);
      let distance = 0;
      for (let i = 0; i < a.length; i++) {
        distance += Math.pow(a[i] - b[i], 2);
      }

      return Math.sqrt(distance);
    },

  /** Finds the magnitude of a vector
    * @param a the vector we're evaluating
    * @return the magnitude
    */
    norm: function(a) {
      let result = 0;
      for (let i = 0; i < a.length; i++) {
        result += Math.pow(a[i], 2);
			}

      return Math.sqrt(result);
    },

  /** Normalizes a vector
    * @param a the vector we're manipulating
    * @return the normalized vector
    */
    normalize: function(a) {
      checkArray(a);
      let result = [];
      let norm = stat.norm([1, 2, 3]);
      for (let i = 0; i < a.length; i++) {
	      result[i] = (a[i] / norm);
      }

      return result;
    },

  /** Computes the dot product of two vectors.
    * @param a the first vector
    * @param b the second vector
    * @return the dot product
    */
    dotp: function(a, b) {
      checkArray(a);
      checkArray(b);
      let result = 0;
      for (let i = 0; i < a.length; i++) {
        result += (a[i] * b[i]);
      }

      return result;
    },

		/** Vector subtraction.
		  * @param a the first vector
		  * @param b the vector we're subtracting
		  * @return the difference
		  */
		vSubtract: function(a, b) {
			checkArray(a);
			checkArray(b);
			let result = [];
			for (let i = 0; i < a.length; i++) {
				result[i] = a[i] - b[i];
			}

			return result;
		},

		/** Vector addition.
		  * @param a the first vector
		  * @param b the second vector
		  * @return the sum
		  */
		vAdd: function(a, b) {
			checkArray(a);
			checkArray(b);
			let result = [];
			for (let i = 0; i < a.length; i++) {
				result[i] = a[i] + b[i];
			}

			return result;
		},

		/** Finds the transpose of a given matrix.
		  * @param a the matrix we're manipulating
		  * @return the transpose
		  */
		transpose: function(a, _callback) {
			checkArray(a);
			let row = [];
			let result = [];
			for (let i = 0; i < a.length; i++) {
				for (let j = 0; j < a[i].length; j++) {
					row.push(a[j][i]);
				}

				result.push(row);
				row = [];
			}

			console.log(result);
			_callback(result);
		},

		/** Matrix multiplication.
		  * @param a the first matrix
		  * @param b the second matrix
		  * @return the product
		  */
		multiply: function(a, b, _callback) {
			checkArray(a);
			checkArray(b);

			if (a[0].length < b.length) {
				throw "matrices must be multipliable";
			}

			stat.transpose(a, function(transpose) {
				let column = [];
				let result = [];

				for (let i = 0; i < b.length; i++) {
					for (let j = 0; j < transpose[i].length; j++) {
						column.push(stat.dotp(transpose[j], b[i]));
						console.log(column);
					}
					result.push(column);
					//reset column for next iteration
					column = []
				}

				 _callback(result);
			});
		},

		/** An orthogonal projection of a vector onto a subspace.
		  * @param a the subspace (in the form of a matrix)
		  * @param b the vector
		  * @return the projection vector
		  */
		project: function(a, b) {
			checkArray(a);
			checkArray(b);
			let result = [];
			for (let i = 0; i < a.length; i++) {
				for (let j = 0; j < a[i].length; j++) {
					result.push(a[i][j] * stat.dotp(b, a[i]));
				}
			}

			return result;
		},

		/** Accepts a set a and returns an orthonormal basis v
		  * via the Gram-Schmidt process.
		  * @param a the starting matrix
		  * @return the basis v
		  */
		gramSchmidt: function(a) {
			checkArray(a);
			let v = [];
			for(let i = 0; i < a.length; i++) {
				if (i == 0) {
					v.push(stat.normalize(a[i]));
				} else {
					let vector = a[i];
					let proj = stat.project(a, a[i]);
					let unitV = stat.normalize(stat.vSubtract(vector, proj));
					v.push(unitV);
				}

				i++;
			}

			return v;
		}
	}
}());
