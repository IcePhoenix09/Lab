#pragma once

#include <string>
#include <vector>

#include "Element.h"
#include "Position.h"

#ifndef LAB4_TRAIN_H
#define LAB4_TRAIN_H

using namespace Element;

namespace TrainSystem {
    static int number_of_trains = 0;

    //void UpdateCount() {
    //    number_of_trains++;
    //}


    class DayTime {
    private:
        unsigned short int seconds;
        unsigned short int minutes;
        unsigned short int hours;

        unsigned short int day;
        unsigned short int month;
        unsigned short int year;
    public:


        DayTime();
        DayTime(int h, int m, int s);

        void set_time(int hour, int minute, int second);
        void set_date(int day, int month, int yeah);
        std::string get_time();
        std::string get_date();


    };

    struct ReachTime {
        bool isReach{};
        DayTime reach_time;
    };

    class RoutePoint {
    private:
        StaticElement* destination;
    public:
        DayTime schedule_time{};
        ReachTime reach_time{};

        RoutePoint(DayTime schedule_time, ReachTime reach_time, StaticElement* destination);

        std::string get_type();
        Position get_position();
        void print_info();

    };

    enum TrainType {
        Freight,
        Passenger,
        Undifinded
    };

    class ITrain {
    public:
        virtual Position get_position() { return Position(); };
        virtual void print_info() {};
    };

    class Train : ITrain {
        Position _position;
        std::vector<RoutePoint> _route;
    public:

        int speed;
        TrainType type;
        Train(TrainType type);

        Position get_position();

        virtual void add_route_point(RoutePoint r_point);
        virtual void set_speed(int s);
        virtual void set_position(int x, int y);

        virtual void print_info();
        virtual void print_route();
        static void print_number_of_trains();
    };
}

#endif //LAB4_TRAIN_H

