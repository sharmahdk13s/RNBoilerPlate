if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/hardiksharma/.gradle/caches/8.10.2/transforms/55a7b16d59e8548044242e4097837c5e/transformed/hermes-android-0.77.0-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/hardiksharma/.gradle/caches/8.10.2/transforms/55a7b16d59e8548044242e4097837c5e/transformed/hermes-android-0.77.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

