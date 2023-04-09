

#include "Main.h"


using namespace Element;
using namespace TrainSystem;

int main() {
    std::cout << "|Railway system|" << std::endl;
    BranchingPoint branch1 = BranchingPoint(10, 10);
    BranchingPoint branch2 = BranchingPoint(0, 10);
    Signal signal1 = Signal(10, 10);

    DayTime t1 = DayTime(12, 34, 0);
    DayTime t2 = DayTime(13, 15, 0);

    DayTime t3 = DayTime(14, 24, 0);
    
    std::cout << t3.get_time() << std::endl;
    t3.set_date(1, 1, 2004);
    std::cout << t3.get_date() << std::endl;

    //    DayTime t4 = DayTime(13, 15, 0);

    ReachTime rt1;
    rt1.isReach = true;
    rt1.reach_time = t2;

    ReachTime rt2;
    rt2.isReach = false;


    RoutePoint r1 = RoutePoint(t1, rt1, &branch1);
    RoutePoint r2 = RoutePoint(t3, rt2, &branch2);

    Train train = Train(Passenger);
    train.set_position(5, 0);
    train.add_route_point(r1);
    train.add_route_point(r2);
    Train::print_number_of_trains();
    train.print_info();


    return 0;
}
