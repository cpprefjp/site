# コンストラクタ
* source_location[meta header]
* function[meta id-type]
* std[meta namespace]
* source_location[meta class]
* cpp20[meta cpp]

```cpp
constexpr source_location() noexcept;
```

## 概要

[`source_location`](../source_location.md)オブジェクトを構築する。各メンバの初期値は未規定。

## 事後条件

[`file_name`](file_name.md)`()`、[`function_name`](function_name.md)`()`の値は有効なヌル終端バイト文字列(NTBS)である。

## 例外
投げない。

## 例
```cpp example
#include <iostream>
#include <source_location>

int main()
{
  const std::source_location location;
  std::cout << location.line() << std::endl;
  std::cout << location.column() << std::endl;
  std::cout << location.file_name() << std::endl;
  std::cout << location.function_name() << std::endl;
}
```

### 出力例
```
0
0


```

## 実装例
```cpp
source_location()
  : line_(0)
  , column_(0)
  , file_name_("")
  , function_name_("")
{}
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [P1208R6 Adopt source_location for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1208r6.pdf)
