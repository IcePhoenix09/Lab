#include "Train.h"
#include <iostream>

void DayTime::print_time() const {
    std::cout << hours << ":" << minutes << ":" << seconds << std::endl;
}

DayTime::DayTime() {
    day = 0;
    month = 0;
    year = 0;

    seconds = 0;
    minutes = 0;
    hours = 0;
}

DayTime::DayTime(int h, int m, int s) {
    day = 0;
    month = 0;
    year = 0;

    seconds = s;
    minutes = m;
    hours = h;
}

RoutePoint::RoutePoint(DayTime schedule_time, ReachTime reach_time, StaticElement* destination) {
    this->destination = destination;
    this->schedule_time = schedule_time;
    this->reach_time = reach_time;

}

std::string RoutePoint::get_type() const{
    return destination->type;
}

Position RoutePoint::get_position() {
    return destination->get_position();
}

void RoutePoint::print_info() const{
    std::cout << std::endl << "-----------------------------" << std::endl;

    std::cout << "Destination information" << std::endl;
    destination->print_info();

    std::cout << "Time information" << std::endl;
    std::cout << "Schedule_time - ";
    schedule_time.print_time();
    std::cout << std::endl;

    if (reach_time.isReach == true) {
        std::cout << "Reach_time - ";
        reach_time.reach_time.print_time();
        std::cout << std::endl;
    }
    else {
        std::cout << "Not Reach" << std::endl;
    }


    std::cout << "-----------------------------" << std::endl;
}


Train::Train(TrainType type) {
    speed = 0;
    _position.x = 0;
    _position.y = 0;
    this->type = type;

    _route = std::vector<RoutePoint>();
};

Position Train::get_position() const{
    return _position;
}

void Train::set_speed(int s) {
    speed = s;
}

void Train::set_position(int x, int y) {
    _position.x = x;
    _position.y = y;
}

void Train::add_route_point(RoutePoint r_point){
    _route.push_back(r_point);
}

void Train::print_info() const {
    switch (type) {
    case Passenger:
        std::cout << "Train type - passenger" << std::endl; break;
    case Freight:
        std::cout << "Train type - freight" << std::endl; break;
    case Undifinded:
        std::cout << "Train type - undefinded" << std::endl; break;
    }
    
    std::cout << "Position - " << _position.x << ", " << _position.y << std::endl;
    std::cout << "Speed -" << speed << std::endl;

    print_route();
}

void Train::print_route() const{
    int s = _route.size();
    for (int i = 0; i < s; i++) {
        _route[i].print_info();
    }
}
