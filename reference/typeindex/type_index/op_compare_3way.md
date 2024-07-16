# operator<=>
* typeindex[meta header]
* std[meta namespace]
* type_index[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
strong_ordering operator<=>(const type_index& rhs) const noexcept; // (1) C++20
```

## 概要
三方比較を行う


## 効果
`type_index`のメンバ変数として保持されている[`type_info`](/reference/typeinfo/type_info.md)オブジェクトへのポインタ`target`があるとして、以下と等価：

```cpp
if (*target == *rhs.target) return strong_ordering::equal;
if (target->before(*rhs.target)) return strong_ordering::less;
return strong_ordering::greater;
```
* before[link /reference/typeinfo/type_info/before.md]


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <typeindex>

int main()
{
  std::type_index t1 = typeid(int);
  std::type_index t2 = typeid(int);
  std::type_index t3 = typeid(double);

  assert((t1 <=> t2) == 0);
  assert((t1 <=> typeid(int)) == 0);
  assert((t1 <=> t3) != 0);
  assert((t1 <=> typeid(double)) != 0);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
