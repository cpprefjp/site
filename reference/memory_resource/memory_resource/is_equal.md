# is_equal
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
bool is_equal(const memory_resource& other) const noexcept;
```

## 概要
今のオブジェクト（`this`）で確保（[`allocate`](allocate.md)）したメモリ領域が、`other`によって解放（[`deallocate`](deallocate.md)）でき、その逆も可能かをチェックする。

## 引数
- `other` -- チェックする`memory_resource`オブジェクト

## 戻り値
`return this->do_is_equal(other);`

`this->allocate()`で確保したメモリ領域を`other.deallocate()`で問題なく解放でき、その逆も可能な場合に`true`となる。

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
  std::cout << def_mr->is_equal(*def_mr) << std::endl;
  std::cout << def_mr->is_equal(*nul_mr) << std::endl;
}
```
* is_equal[color ff0000]
* get_default_resource[link /reference/memory_resource/get_default_resource.md]
* null_memory_resource[link /reference/memory_resource/null_memory_resource.md]

### 出力
```
true
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`do_is_equal`](do_is_equal.md)