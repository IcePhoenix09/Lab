using Prime.Services; 

namespace Prime.UnitTests.Services
{
    [TestFixture]
    public class PrimeService_IsPrimeShould
    {
        private PrimeService _primeService;

        [SetUp]
        public void SetUp()
        {
            
            _primeService = new PrimeService();
        }

        [Test]
        public void IsPrime_InputIs1_ReturnFalse()
        {

            var result = _primeService.IsPrime(1);

            Assert.IsFalse(result, "1 should not be prime");
        }

        public bool IsPrime(int candidate)
        {
            if (candidate == 1)
            {
                return false;
            }
            throw new NotImplementedException("Please create a test first.");
        }

    }
}
