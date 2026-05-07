#ifndef SIDEBAR_H
#define SIDEBAR_H

#include <QWidget>

namespace Ui {
class Sidebar;
}

class Sidebar : public QWidget
{
    Q_OBJECT

public:
    explicit Sidebar(QWidget *parent = nullptr);
    ~Sidebar();

signals:
    void chatClicked();
    void maternityClicked();
    void vitalsClicked();

private:
    Ui::Sidebar *ui;
};

#endif