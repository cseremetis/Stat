//Tests for Statistics Library functions.

QUnit.test("Test Distance", function(assert) {
  p1 = [0, 0, 1];
  p2 = [0, 0, 10];
  assert.equal(9, stat.distance(p1, p2));
});

QUnit.test("Test Norm", function(assert) {
  let v = [3, 4];
  assert.equal(5, stat.norm(v));
});

QUnit.test( "Test Dot Product", function( assert ) {
  let v1 = [1, 2, 3, 4];
  let v2 = [5, 6, 7, 8];
  assert.equal(70, stat.dotp(v1, v2));
});

QUnit.test("Test Transpose", function(assert) {
  let a = [
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3]
  ];

  let b = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ];

  stat.transpose(a, function(result) {
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < b[i].length; j++) {
        assert.equal(b[i][j], result[i][j]);
      }
    }
  });
});

QUnit.test("Test Multiplication", function(assert) {
  let identity = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]

  let a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  let b = [
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18]
  ];

  stat.multiply(a, identity, function(result){
    console.log(result);
    console.log(a);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[i].length; j++) {
        assert.equal(a[i][j], result[i][j]);
      }
    }
  });
});
