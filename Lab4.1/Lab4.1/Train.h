#pragma once

#include <string>
#include <vector>

#include "Element.h"
#include "Position.h"

#ifndef LAB4_TRAIN_H
#define LAB4_TRAIN_H

class DayTime {
public:
    unsigned short int seconds;
    unsigned short int minutes;
    unsigned short int hours;

    unsigned short int day;
    unsigned short int month;
    unsigned short int year;

    DayTime();
    DayTime(int h, int m, int s);

    void print_time() const;
};

struct ReachTime {
    bool isReach{};
    DayTime reach_time;
};

class RoutePoint {
    StaticElement* destination;
public:
    DayTime schedule_time{};
    ReachTime reach_time{};

    RoutePoint(DayTime schedule_time, ReachTime reach_time, StaticElement* destination);

    std::string get_type() const;
    Position get_position();
    void print_info() const;

};

enum TrainType{
    Freight,
    Passenger,
    Undifinded
};

class ITrain {
public:
    virtual Position get_position() const = 0;
    virtual void print_info() const = 0;
};

class Train : ITrain {
    Position _position;
    std::vector<RoutePoint> _route;
public:
    int speed;
    TrainType type;
    Train(TrainType type);

    Position get_position() const override;

    virtual void add_route_point(RoutePoint r_point);
    virtual void set_speed(int s);
    virtual void set_position(int x, int y);

    virtual void print_info() const override;
    virtual void print_route() const;
};


#endif //LAB4_TRAIN_H

