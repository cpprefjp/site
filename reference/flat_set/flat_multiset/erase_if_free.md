# erase_if
* flat_set[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Key,
           class Compare,
           class KeyContainer,
           class Predicate>
  typename flat_multiset<Key, Compare, KeyContainer>::size_type
    erase_if(flat_multiset<Key, Compare, KeyContainer>& c,
             Predicate pred); // (1) C++23
  template<class Key,
           class Compare,
           class KeyContainer,
           class Predicate>
  constexpr typename flat_multiset<Key, Compare, KeyContainer>::size_type
    erase_if(flat_multiset<Key, Compare, KeyContainer>& c,
             Predicate pred); // (1) C++26
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。


## 事前条件
- `Key`と`T`がムーブ代入可能であること


## 効果
メンバ変数として保持しているコンテナ`c`の各要素`e`について、`bool(pred(e))`を`E`として、`E`が`true`であるすべての要素を削除する。


## 戻り値
削除した要素数を返す。


## 計算量
正確に[`size()`](size.md)回だけ述語適用する。


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <string>

int main()
{
  std::flat_multiset<int> fs = {3, 1, 4, 1};

  // コンテナfsから、キーが1の要素をすべて削除する
  auto num = std::erase_if(fs, [](const auto& x) { return x == 1; });

  std::cout << num << std::endl
            << std::endl;

  for (int i : fs) {
    std::cout << i << std::endl;
  }
}
```
* std::erase_if[color ff0000]

### 出力
```
2

3
4
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
