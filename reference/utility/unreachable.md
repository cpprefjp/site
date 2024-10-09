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
`false`==`true`


## 備考
`std::unreachable`関数の事前条件は決して満たされない（恒偽式）ため、関数呼び出しは常に未定義の動作を引き起こす。
C++コンパイラはこの情報を利用し、`std::unreachable`呼び出しを含まないコードパスのみが実行されうると仮定して、より高速に動作するプログラムを生成する可能性がある。


## 例
```cpp example
#include <iostream>
#include <utility>

int flip(int x)
{
  switch (x) {
  case 0:
    return 1;
  case 1:
    return 0;
  default:
    // C++コンパイラは引数 x が値0,1以外を取らないと
    // 仮定したコード生成を行う可能性がある。
    std::unreachable();
  }
}

int main()
{
  std::cout << flip(0) << std::endl;
  std::cout << flip(1) << std::endl;
  // 例えば f(2) 呼び出しは未定義動作を引き起こす。
}
```
* std::unreachable[color ff0000]

### 出力
```
1
0
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 15.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 `[[likely]]`, `[[unlikely]]`属性](/lang/cpp20/likely_and_unlikely_attributes.md)
- [C++23 `[[assume]]`属性](/lang/cpp23/portable_assumptions.md)


## 参照
- [GCC Built-in Function: `__builtin_unreachable`](https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html)
- [Clang Builtin Function: `__builtin_unreachable`](https://clang.llvm.org/docs/LanguageExtensions.html)
- [MSVC Compiler intrinsics: `__assume`](https://learn.microsoft.com/en-us/cpp/intrinsics/assume)
- [P0627R6 Function to mark unreachable code](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0627r6.pdf)
