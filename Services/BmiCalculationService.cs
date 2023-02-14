namespace BMICalculator.Services
{
    public interface IBmiCalculationService
    {
        double ImperialCalculate(double weight, double height);
        double MetricCalculate(double weight, double height);
    }

    public class BmiCalculationService : IBmiCalculationService
    {
        public double MetricCalculate(double weight, double height)
        {
            double result = weight / (height * height);
            return result;
        }

        public double ImperialCalculate(double weight, double height)
        {
            double result = weight / (height * height) * 703;
            return result;
        }
    }
}
