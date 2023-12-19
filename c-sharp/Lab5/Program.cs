// See https://aka.ms/new-console-template for more information

using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text;

public class TimeSpanJsonConverter : JsonConverter<TimeSpan>
{
    public override TimeSpan Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options) =>
            TimeSpan.Parse(reader.GetString()!);

    public override void Write(
        Utf8JsonWriter writer,
        TimeSpan timeSpanValue,
        JsonSerializerOptions options) =>
            writer.WriteStringValue(timeSpanValue.ToString());
}


enum FlightStatus{
    OnTime,
    Delayed,
    Cancelled,
    Boarding,
    InFlight
}

class Flight{
    public string? FlightNumber { get; set; }
    public string? Airline { get; set; }
    public string? Destination { get; set; }
    public DateTime DepartureTime { get; set; }
    public DateTime ArrivalTime { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public FlightStatus Status { get; set; }

    [JsonConverter(typeof(TimeSpanJsonConverter))]
    public TimeSpan Duration { get; set; }
    public string? AirlineType { get; set; }
    public string? Terminal { get; set; }
    public string? Gate { get; set; }

    public void printInfo(){
        Console.WriteLine($"FlightNumber: {FlightNumber}");
        Console.WriteLine($"Airline: {Airline}");
        Console.WriteLine($"Destination: {Destination}");
        Console.WriteLine($"DepartureTime: {DepartureTime}");
        Console.WriteLine($"ArrivalTime: {ArrivalTime}");
        Console.WriteLine($"Status: {Status}");
        Console.WriteLine($"Duration: {Duration}");
        Console.WriteLine($"AirlineType: {AirlineType}");
        Console.WriteLine($"Terminal: {Terminal}");
        Console.WriteLine($"Gate: {Gate}");
        Console.WriteLine("\n");
    }

    public Flight(string flightNumber, string airline, string destination, 
    DateTime departureTime, DateTime arrivalTime, string gate, FlightStatus status, 
    TimeSpan duration, string airlineType, string terminal){
        FlightNumber = flightNumber;
        Airline = airline;
        Destination = destination;
        DepartureTime = departureTime;
        ArrivalTime = arrivalTime;
        Gate = gate;
        Status = status;
        Duration = duration;
        AirlineType = airlineType;
        Terminal = terminal;
    }

}


class FlightInformationSystem{
    private List<Flight> flights = new();

    public FlightInformationSystem(string pathtoFile){
        flights.Clear();
        LoadData(pathtoFile);
    }

    async void LoadData(string pathToFile){
        string jsonString = TransformFlightsDataFormat(File.ReadAllText(pathToFile));
        using var stream = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));

        try{
            await foreach (Flight item in JsonSerializer.DeserializeAsyncEnumerable<Flight>(stream))
            {
                flights.Add(item);
            }
        } 
        catch (FormatException){
            Console.WriteLine("Error");
        }
    }

    public void SaveData(string pathToFile, List<Flight> data){
        string jsonString = JsonSerializer.Serialize(data);
        File.WriteAllText(pathToFile, jsonString);
    }

    public void AddFlight(string flightNumber, string airline, string destination, 
    DateTime departureTime, DateTime arrivalTime, string gate, FlightStatus status, 
    TimeSpan duration, string airlineType, string terminal){
        Flight newFlight = new(flightNumber, airline, destination, 
        departureTime, arrivalTime, gate, status, duration, airlineType, terminal);
        flights.Add(newFlight);
    }

    public void DeleteFlight(string flightNumber){
        for (int i = 0; i < flights.Count; i++){
            if (flights[i].FlightNumber == flightNumber){
                flights.RemoveAt(i);
            }
        }
    }

    public List<Flight> GetFlightsFromCompany(string companyName){
        List<Flight> selectedFlights = new();
        foreach (Flight flight in flights){
            if (companyName == flight.Airline){
                selectedFlights.Add(flight);
            }
        }
        selectedFlights.Sort(CompareByDepartureTimeAscending);
        SaveData("data/test1.json", selectedFlights);


        return selectedFlights;
    }

    public List<Flight> GetDelayedFlights(){

        List<Flight> selectedFlights = new();
        foreach (Flight flight in flights){
            if (flight.Status == FlightStatus.Delayed){
                selectedFlights.Add(flight);
            }
        }

        selectedFlights.Sort(CompareByArrivalTimeAscending);
        SaveData("data/test1.json", selectedFlights);

        return selectedFlights;
    }

    public List<Flight> GetFlightsForDay(int month, int day, int year){
        List<Flight> selectedFlights = new();
        foreach (Flight flight in flights){
            if (flight.ArrivalTime.Day == day & 
                flight.ArrivalTime.Month == month & 
                flight.ArrivalTime.Year == year){
                selectedFlights.Add(flight);
            }
        }
        selectedFlights.Sort(CompareByDepartureTimeAscending);
        SaveData("data/test1.json", selectedFlights);

        return selectedFlights;
    }

    public List<Flight> GetFlightsForPeriodTo(string destination, DateTime startDate, DateTime endDate){
        List<Flight> selectedFlights = new();
        foreach (Flight flight in flights){
            if (flight.Destination == destination & (
            (flight.ArrivalTime > startDate & flight.ArrivalTime < endDate) | 
            (flight.DepartureTime > startDate & flight.DepartureTime < endDate))) {
                selectedFlights.Add(flight);
            }
        }
        selectedFlights.Sort(CompareByDepartureTimeAscending);
        SaveData("data/test1.json", selectedFlights);

        return selectedFlights;
    }

    public List<Flight> GetFlightsForPeriodHour(DateTime startDate, DateTime endDate){
        List<Flight> selectedFlights = new();
        foreach (Flight flight in flights){
            if ((flight.ArrivalTime > DateTime.Now.AddHours(-1) & flight.ArrivalTime < DateTime.Now) | 
            (flight.ArrivalTime > startDate & flight.ArrivalTime < endDate)) {
                selectedFlights.Add(flight);
            }
        }
        selectedFlights.Sort(CompareByArrivalTimeAscending);
        SaveData("data/test1.json", selectedFlights);

        return selectedFlights;
    }

    public static void PrintFlights(List<Flight> data){
        foreach (Flight flight in data){
            flight.printInfo();
        }
    }

    static string TransformFlightsDataFormat(string data){
        int start = data.IndexOf('[');
        int end = data.IndexOf(']') + 1;
        return data[start..end];
    }

    public static int CompareByDepartureTimeAscending(Flight x, Flight y){
            if (x.DepartureTime > y.DepartureTime)
            {
                return 1;
            }
            if (x.DepartureTime < y.DepartureTime){
                return -1;
            }
            else
            {
                return 0;
            }
        }

    public static int CompareByArrivalTimeAscending(Flight x, Flight y){
        if (x.ArrivalTime > y.ArrivalTime)
        {
            return 1;
        }
        if (x.ArrivalTime < y.ArrivalTime){
            return -1;
        }
        else
        {
            return 0;
        }   
    }

}




class Program{

    static void Main(){

        FlightInformationSystem controller = new("data/flights_data.json");

        var start1 = new DateTime(2023, 11, 29, 15, 0, 0);
        var end1 = DateTime.Now.AddMinutes(-30);
        var dur = new TimeSpan(10000);
        controller.AddFlight("DL6356", "Turkish Airlines", "Barcelona", 
        start1, end1, "C11", 
        FlightStatus.OnTime, dur, "AN 148", "2");
        // List<Flight> test = controller.GetFlightsForDay(11, 29, 2023);

        var start = new DateTime(2023, 11, 29, 19, 0, 0);
        var end = new DateTime(2023, 11, 29, 20, 0, 0);
        List<Flight> test = controller.GetFlightsForPeriodHour(start, end);
        foreach (Flight flight in test){
            flight.printInfo();
        }

        Console.WriteLine("------------");
        controller.DeleteFlight("DL6356");

        test = controller.GetFlightsForPeriodHour(start, end);
        foreach (Flight flight in test){
            flight.printInfo();
        }
    }

}
