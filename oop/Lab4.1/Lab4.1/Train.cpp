#include "Train.h"
#include <iostream>

using namespace std;



std::string TrainSystem::DayTime::get_time(){
    return to_string(hours) + ":" + to_string(minutes) + ":" + to_string(seconds);
}

std::string TrainSystem::DayTime::get_date() {
    return to_string(day) + "-" + to_string(month) + "-" + to_string(year);
}

void TrainSystem::DayTime::set_time(int hour, int minute, int second) {
    if (hour <= 24 && hour >= 0 && minute <= 60 && minute >= 0 && second <= 60 && second >= 0) {
        this->hours = hour;
        this->minutes = minute;
        this->seconds = second;
    }
    else {
        cout << "Incorect time";
    }
}

void TrainSystem::DayTime::set_date(int day, int month, int year) {
    if (day <= 31 && day >= 1 && month <= 12 && month >= 1 && year >= 1970) {
        this->day = day;
        this->month = month;
        this->year = year;
    }
    else {
        cout << "Incorect date";
    }
}

TrainSystem::DayTime::DayTime() {
    day = 0;
    month = 0;
    year = 0;

    seconds = 0;
    minutes = 0;
    hours = 0;
}

TrainSystem::DayTime::DayTime(int h, int m, int s) {
    day = 0;
    month = 0;
    year = 0;

    seconds = s;
    minutes = m;
    hours = h;
}

TrainSystem::RoutePoint::RoutePoint(DayTime schedule_time, ReachTime reach_time, StaticElement* destination) {
    this->destination = destination;
    this->schedule_time = schedule_time;
    this->reach_time = reach_time;

}

std::string TrainSystem::RoutePoint::get_type() {
    return destination->type;
}

Position TrainSystem::RoutePoint::get_position() {
    return destination->get_position();
}

void TrainSystem::RoutePoint::print_info() {
    cout << endl << "-----------------------------" << endl;

    cout << "Destination information" << endl;
    destination->print_info();

    cout << "Time information" << endl;
    cout << "Schedule_time - ";
    cout << schedule_time.get_time();
    cout << endl;

    if (reach_time.isReach == true) {
        cout << "Reach_time - ";
        cout << reach_time.reach_time.get_time();
        cout << endl;
    }
    else {
        cout << "Not Reach" << endl;
    }


    cout << "-----------------------------" << endl;
}


TrainSystem::Train::Train(TrainType type) {
    number_of_trains++;
    //TrainSystem::UpdateCount();
    speed = 0;
    _position.x = 0;
    _position.y = 0;
    this->type = type;

    _route = std::vector<RoutePoint>();
};

Position TrainSystem::Train::get_position(){
    return this->_position;
}

void TrainSystem::Train::set_speed(int s) {
    speed = s;
}

void TrainSystem::Train::set_position(int x, int y) {
    _position.x = x;
    _position.y = y;
}

void TrainSystem::Train::add_route_point(RoutePoint r_point){
    _route.push_back(r_point);
}

void TrainSystem::Train::print_info(){
    switch (type) {
    case Passenger:
        cout << "Train type - passenger" << endl; break;
    case Freight:
        cout << "Train type - freight" << endl; break;
    case Undifinded:
        cout << "Train type - undefinded" << endl; break;
    }
    
    cout << "Position - " << _position.x << ", " << _position.y << endl;
    cout << "Speed -" << speed << endl;

    print_route();
}

void TrainSystem::Train::print_route(){
    int s = _route.size();
    for (int i = 0; i < s; i++) {
        _route[i].print_info();
    }
}
void TrainSystem::Train::print_number_of_trains(){
    cout << "Number of train: " << number_of_trains << endl;
}
