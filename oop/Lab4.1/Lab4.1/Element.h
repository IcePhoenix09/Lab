
#include <string>
#include "Position.h"

#ifndef LAB4_ELEMENT_H
#define LAB4_ELEMENT_H
namespace Element {
    class StaticElement {
    protected:
        Position _pos{};
    public:
        bool state;
        std::string type;

        StaticElement();
        StaticElement(int x, int y);
        Position get_position();
        void print_info() const;
    };

    enum BranchState {
        STRAIGHT,
        DIVERGING
    };

    enum SignalState {
        RED,
        GREEN,
        YELLOW,
        OFF
    };


    class BranchingPoint : public StaticElement {
    public:
        BranchState state;
        BranchingPoint();
        BranchingPoint(int x, int y);
    };

    class Signal : StaticElement {
        SignalState state;
    public:
        Signal();
        Signal(int x, int y);
    };
}
#endif //LAB4_ELEMENT_H

