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
            double result = weight / ((height * 0.01) * (height * 0.01));
            return result;
        }

        public double ImperialCalculate(double weight, double height)
        {
            double result = 703 * weight / (height * height);
            return result;
        }
    }
}
