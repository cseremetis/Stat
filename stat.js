/** !
  * Author: Christian Seremetis
  * 5 July 2018
  * Personal statistics library.
  * stores valuable functions for
  * linear algebra and statistical analysis.
  * Methods return values as doubles.
  * Arrays interpreted as vectors
  */
var stat = (function() {
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
		distance:function(a, b) {
			checkArray(a);
			checkArray(b);
			var distance = 0;			
			for (let i = 0; i < a.length; i++) {
				distance += Math.pow(a[i] - b[i], 2);
			}

			return Math.sqrt(distance);
		},

		/** Finds the magnitude of a vector
		  * @param a the vector we're evaluating
		  * @return the magnitude
		  */
		norm:function(a) {
			var result = 0;
			for (let i = 0; i < a.length; i++) {
				result += Math.pow(a[i], 2);
			}

			return Math.sqrt(result);
		},

		/** Normalizes a vector
		  * @param a the vector we're manipulating
		  * @return the normalized vector
		  */
		normalize:function(a) {
			checkArray(a);
			var result = [];
			var norm = stat.norm([1, 2, 3]);
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
		dotp:function(a, b) {
			checkArray(a);
			checkArray(b);
			var result = 0;
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
		vSubtract :function(a, b) {
			checkArray(a);
			checkArray(b);
			var result = [];
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
		vAdd:function(a, b) {
			checkArray(a);
			checkArray(b);
			var result = [];
			for (let i = 0; i < a.length; i++) {
				result[i] = a[i] + b[i];
			}

			return result;
		},

		/** Finds the transpose of a given matrix.
		  * @param a the matrix we're manipulating
		  * @return the transpose
		  */
		transpose:function(a) {
			checkArray(a);
			var temp;
			for (let i = 0; i < a.length; i++) {
				for (let j = i; j < a[i].length; j++) {
					temp = a[i][j];
					a[i][j] = a[j][i];
					a[j][i] = temp;
				}
			}

			return a;
		},

		/** Matrix multiplication.
		  * @param a the first matrix
		  * @param b the second matrix
		  * @return the product
		  */
		multiply:function(a, b) {
			checkArray(a);
			checkArray(b);

			if (a[0].length < b.length) {
				throw "matrices must be multipliable";
			}

			result = [];

			stat.transpose(b);
			for (let i = 0; i < a.length; i++) {
				result.push(stat.dotp(a[i], b[i]));
			}

			return result;
		},

		/** An orthogonal projection of a vector onto a subspace.
		  * @param a the subspace (in the form of a matrix)
		  * @param b the vector
		  * @return the projection vector
		  */
		project:function(a, b) {
			checkArray(a);
			checkArray(b);
			var result = [];
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
		gramSchmidt:function(a) {
			checkArray(a);
			var v = [];
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
		},
	}
})();