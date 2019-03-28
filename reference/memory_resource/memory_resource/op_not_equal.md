# operator!=
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  bool operator!=(const memory_resource& a, const memory_resource& b) noexcept;
}
```

## 概要
2つの`memory_resource`オブジェクトを等値比較する。


## 戻り値
`!(a == b)`

結果が`true`となる場合、`a`で確保したメモリ領域を`b`で解放するのもその逆も行ってはならない。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

int main()
{
}
```
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`is_equal`](is_equal.md)