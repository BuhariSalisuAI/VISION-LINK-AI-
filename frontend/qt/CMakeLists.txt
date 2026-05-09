cmake_minimum_required(VERSION 3.21)

project(VisionLinkAI LANGUAGES CXX)

# C++ Standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Qt Auto Features
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)

# 🔥 Fix for UI files in separate folders
set(CMAKE_AUTOUIC_SEARCH_PATHS
    ${CMAKE_CURRENT_SOURCE_DIR}/ui
    ${CMAKE_CURRENT_SOURCE_DIR}/ui/components
)

# Find Qt
find_package(Qt6 REQUIRED COMPONENTS Core Widgets Network)

qt_standard_project_setup()

# -----------------------
# Source Files
# -----------------------
set(SOURCES
    src/main.cpp
    src/mainwindow.cpp

    src/api/api_client.cpp

    src/components/chat_widget.cpp
    src/components/sidebar.cpp

    src/modules/chat_module.cpp
    src/modules/maternity_module.cpp
    src/modules/vitals_module.cpp

    src/utils/json_helper.cpp
)

# -----------------------
# Header Files
# -----------------------
set(HEADERS
    src/mainwindow.h

    src/api/api_client.h

    src/components/chat_widget.h
    src/components/sidebar.h

    src/modules/chat_module.h
    src/modules/maternity_module.h
    src/modules/vitals_module.h

    src/utils/json_helper.h
)

# -----------------------
# UI Files
# -----------------------
set(UI_FILES
    ui/mainwindow.ui
    ui/components/chat_widget.ui
    ui/components/sidebar.ui
)

# -----------------------
# Executable
# -----------------------
qt_add_executable(VisionLinkAI
    WIN32
    ${SOURCES}
    ${HEADERS}
    ${UI_FILES}
)

# -----------------------
# Libraries
# -----------------------
target_link_libraries(VisionLinkAI PRIVATE
    Qt6::Core
    Qt6::Widgets
    Qt6::Network
)

# -----------------------
# Include Paths
# -----------------------
target_include_directories(VisionLinkAI PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src
    ${CMAKE_CURRENT_SOURCE_DIR}/src/api
    ${CMAKE_CURRENT_SOURCE_DIR}/src/components
    ${CMAKE_CURRENT_SOURCE_DIR}/src/modules
    ${CMAKE_CURRENT_SOURCE_DIR}/src/utils
)

# -----------------------
# Install (optional)
# -----------------------
install(TARGETS VisionLinkAI
    RUNTIME DESTINATION bin
)