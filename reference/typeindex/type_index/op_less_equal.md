# operator<=
* typeindex[meta header]
* std[meta namespace]
* type_index[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool operator<=(const type_index& rhs) const noexcept;
```

## 概要
左辺が右辺以下かの判定を行う。


## 戻り値
`!rhs.target->before(*target)`

※`target`は、`type_index`のメンバ変数として保持されている`type_info`オブジェクトへのポインタ(説明用)


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <typeindex>
#include <typeinfo>

int main()
{
  std::type_index a = typeid(int);
  std::type_index b = typeid(double);

  std::cout << std::boolalpha;

  // 同じ型を表すtype_index同士は等価なので、<=はtrueになる
  std::cout << (a <= a) << std::endl;

  // 異なる型を表すtype_index間の照合順序は処理系定義であるため、
  // どちらが前になるかは処理系によって異なる
  const std::type_index& lo = (a < b) ? a : b;
  const std::type_index& hi = (a < b) ? b : a;

  std::cout << (lo <= hi) << std::endl;
  std::cout << (hi <= lo) << std::endl;
}
```
* <=[color ff0000]

### 出力例
```
true
true
false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
