# operator==
* typeindex[meta header]
* std[meta namespace]
* type_index[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool operator==(const type_index& rhs) const noexcept;
```

## 概要
�値比較を行う


## 戻り値
`*target == *rhs.target`

※`target`は、`type_index`のメンバ変数として保持されている`type_info`オブジェクトへのポインタ(説明用)


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

  assert(t1 == t2);
  assert(t1 == typeid(int));
  assert(!(t1 == t3));
  assert(!(t1 == typeid(double)));
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017

