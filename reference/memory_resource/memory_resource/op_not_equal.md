# operator!=
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  // operator==により、以下のオーバーロードが使用可能になる (C++20)
  bool operator!=(const memory_resource& a, const memory_resource& b) noexcept; // (1) C++17
}
```

## 概要
2つの`memory_resource`オブジェクトを等値比較する。


## 戻り値
`!(a == b)`

結果が`true`となる場合、`a`で確保したメモリ領域を`b`で解放するのもその逆も行ってはならない。

## 備考

この演算子はC++20以降、対応する[`==`を利用して導出](/lang/cpp20/consistent_comparison.md)される。

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
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`is_equal`](is_equal.md)
- [`op_equal`](op_equal.md)


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
