# Additional clean files
cmake_minimum_required(VERSION 3.16)

if("${CONFIG}" STREQUAL "" OR "${CONFIG}" STREQUAL "Debug")
  file(REMOVE_RECURSE
  "CMakeFiles/appgeet_autogen.dir/AutogenUsed.txt"
  "CMakeFiles/appgeet_autogen.dir/ParseCache.txt"
  "appgeet_autogen"
  )
endif()
