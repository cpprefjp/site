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
#include <memory_resource>

int main()
{
  std::pmr::memory_resource* def_mr = std::pmr::get_default_resource();
  std::pmr::memory_resource* nul_mr = std::pmr::null_memory_resource();

  std::cout << std::boolalpha;

  //引数として参照を取ることに注意
  std::cout << (*def_mr != *def_mr) << std::endl;
  std::cout << (*def_mr != *nul_mr) << std::endl;
}
```
* !=[color ff0000]
* get_default_resource[link /reference/memory_resource/get_default_resource.md]
* null_memory_resource[link /reference/memory_resource/null_memory_resource.md]

### 出力
```
false
true
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
- [`op_equal`](op_equal.md)