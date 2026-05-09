#include "chat_module.h"

QString ChatModule::formatUserMessage(const QString &message)
{
    return "<b>You:</b> " + message;
}

QString ChatModule::formatAIMessage(const QString &message)
{
    return "<b style='color:blue;'>AI:</b> " + message;
}