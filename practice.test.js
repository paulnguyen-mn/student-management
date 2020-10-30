const grading = (grade) => {
  if (grade <= 5) return 'Trung Binh';

  if (grade <= 8) return 'Kha';

  return 'Gioi';
};

const expect = chai.expect;

describe('function grading()', () => {
  it('should be Gioi if grade >= 9', () => {
    const result9 = grading(9);
    expect(result9).to.equal('Gioi');

    const result10 = grading(10);
    expect(result10).to.equal('Gioi');
  });

  it('should be Kha if grade in [6-8]', () => {
    [6, 7, 8].forEach((grade) => {
      const result = grading(grade);
      expect(result).to.equal('Kha');
    });
  });

  it('should be Trung Binh if grade <= 5', () => {
    [1, 2, 3, 4, 5].forEach((grade) => {
      const result = grading(grade);
      expect(result).to.equal('Trung Binh');
    });
  });
});
