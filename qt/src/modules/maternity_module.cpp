#include "maternity_module.h"

QString MaternityModule::getQuickQuestion(int index)
{
    switch (index)
    {
    case 0:
        return "What are danger signs during pregnancy?";
    case 1:
        return "What nutrition is required for pregnant women?";
    case 2:
        return "When should a pregnant woman visit a doctor?";
    default:
        return "Give general maternal health advice.";
    }
}