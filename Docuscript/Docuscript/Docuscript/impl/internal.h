#pragma once

/*
* Compiler Macros
*/

#if defined(__clang__)
#define DScript_Compiler_Clang

#elif defined(__GNUC__) || defined(__GNUG__)
#define DScript_Compiler_GCC

#elif defined(_MSC_VER)
#define DScript_Compiler_MSCV

#endif

/*
* Platform Macros
*/

#if defined(_WIN32)
#define DSCRIPT_PLATFORM_WINDOWS

#elif defined(__APPLE__)
#define DSCRIPT_PLATFORM_MAC

#else
#define DSCRIPT_PLATFORM_UNIX

#endif

/*
* DScript Utilities
*/

typedef unsigned char byte;
typedef unsigned char u_char;
typedef unsigned short u_short;
typedef unsigned int u_int;
typedef unsigned long u_long;

#if defined(DScript_Compiler_Clang)
#define DScript_Inline inline
#define DScript_AlignOf(type) __alignof__(type)

#define DScript_Unreachable __builtin_unreachable()

#define DScript__Function__ __func__
#define DScript__File__ __FILE__
#define DScript__Line__ __LINE__

#elif defined(DScript_Compiler_GCC)
#define DScript_Inline inline __attribute__((always_inline))
#define DScript_AlignOf(type) __alignof__(type)

#define DScript_Unreachable __builtin_unreachable()

#define DScript__Function__ __func__
#define DScript__File__ __FILE__
#define DScript__Line__ __LINE__

#elif defined(DScript_Compiler_MSCV)
#define DScript_Inline __forceinline
#define DScript_AlignOf(type) _Alignof(type)

#define DScript_Unreachable __assume(0)

#define DScript__Function__ __FUNCTION__
#define DScript__File__ __FILE__
#define DScript__Line__ __LINE__

#endif