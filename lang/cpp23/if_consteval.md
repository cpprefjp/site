# if consteval
* cpp23[meta cpp]

## 概要
C++23では、`constexpr`関数がコンパイル時に呼ばれたかを判定するための構文として、`if consteval`を導入する。これは「consteval if文」と呼ばれる。

```cpp
constexpr double my_fma(double a, double b, double c) {
  if consteval {
    // コンパイル時に実行される文脈
    return a * b + c;
  }
  else {
    // 実行時に実行される文脈
    return __builtin_fma(a, b, c);
  }
}

#include <iostream>
int main() {
  constexpr double static_fma = my_fma(1.0, 2.0, 3.0);
  double dynamic_fma = my_fma(1.0, 2.0, 3.0);

  std::cout << static_fma << std::endl;
  std::cout << dynamic_fma << std::endl;
}
```

`if consteval`文内は即時関数 (`consteval`) の文脈であり、`consteval`関数を呼び出すことができる。

`if consteval`の逆条件として、実行時かを判定するためには、`if !consteval`を使用する (`consteval`の前に`!`)。

```cpp
constexpr double my_fma(double a, double b, double c) {
  if !consteval {
    // 実行時に実行される文脈
    return __builtin_fma(a, b, c);
  }
  else {
    // コンパイル時に実行される文脈
    return a * b + c;
  }
}
```

`if consteval`文は複合文でなければならない。

```cpp
constexpr double my_fma(double a, double b, double c) {
  if !consteval {
    return __builtin_fma(a, b, c);
  }
  else
    return a * b + c; // コンパイルエラー！複合文でなければならない
}
```

## この機能が必要になった背景・経緯
### constexprとconstevalの相互作用での問題
`consteval`を使用したプログラムを考える。

```cpp
consteval int f(int i) { return i; }

constexpr int g(int i) {
  if (std::is_constant_evaluated()) {
    return f(i) + 1; // <==
  } else {
    return 42;
  }
}

consteval int h(int i) {
  return f(i) + 1;
}
```
* std::is_constant_evaluated[link /reference/type_traits/is_constant_evaluated.md]

定数式評価時には、関数`g()`と関数`h()`は同じことをするが、実行時には関数`h()`を呼び出すことはできない。また、`if (std::is_constant_evaluated())`文内は定数式ではあるが即時関数の文脈ではないため、即時関数`f()`を呼び出すことはできず、`<==`コメントのところで不適格となる。この文脈では、`f(42)`を呼び出すことはできるが、`f(i)`を呼び出すことはできない。



### `if constexpr (std::is_constant_evaluated())`の問題
もうひとつの問題は、[`std::is_constant_evaluated()`](/reference/type_traits/is_constant_evaluated.md)固有の問題だが、この関数は`if`文と使わなければならないが、誤って`if constexpr`で使用してしまう場合である。

```cpp
constexpr size_t strlen(char const* s) {
  if constexpr (std::is_constant_evaluated()) {
    for (const char *p = s; ; ++p) {
      if (*p == '\0') {
        return static_cast<std::size_t>(p - s);
      }
    }
  } else {
    __asm__("SSE 4.2で計算…");
  }
}
```

この関数は常にコンパイル時の方の文脈が呼ばれてしまう。この使用間違いはコンパイラによっては警告を出力するが、誤用を防ぐのがむずかしいという問題があった。



## 関連項目
- [`std::is_constant_evaluated()`](/reference/type_traits/is_constant_evaluated.md)
- [C++20 即時関数](/lang/cpp20/immediate_functions.md)


## 参照
- [P1938R3 `if consteval`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1938r3.html)
