# unreachable
* utility[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  [[noreturn]] void unreachable();
}
```

## 概要
コード実行が本関数に到達しないことを表明する。


## 事前条件
`true`==`false`


## 備考
`std::unreachable`関数の事前条件は決して満たされない（恒偽式）となるため、関数呼び出しは常に未定義の動作を引き起こす。
C++コンパイラはこの情報を利用し、`std::unreachable`呼び出しを含まないコードパスのみが実行されうると仮定して、より高速に動作するプログラムを生成する可能性がある。


## 例
```cpp example
#include <iostream>
#include <utility>

int f(int x)
{
 switch (x) {
 case 0:
 case 1:
   return x;
 default:
   std::unreachable();
 }
}

int main()
{
  std::cout << f(0) << std::endl;
  std::cout << f(1) << std::endl;
  // f(2)呼び出しは未定義動作
}
```
* std::unreachable[color ff0000]

### 出力
```
0
1
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 15.0
- [GCC](/implementation.md#gcc): 12.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 `[[likely]]`, `[[unlikely]]`属性](/lang/cpp20/likely_and_unlikely_attributes.md)


## 参照
- [GCC Built-in Function: `__builtin_unreachable`](https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html)
- [Clang Builtin Function: `__builtin_unreachable`](https://clang.llvm.org/docs/LanguageExtensions.html)
- [MSVC Compiler intrinsics: `__assume`](https://learn.microsoft.com/en-us/cpp/intrinsics/assume)
- [P0627R6 Function to mark unreachable code](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0627r6.pdf)
