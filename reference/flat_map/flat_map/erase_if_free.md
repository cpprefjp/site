# erase_if
* flat_map[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Key,
           class T,
           class Compare,
           class KeyContainer,
           class MappedContainer,
           class Predicate>
  typename flat_map<Key, T, Compare, KeyContainer, MappedContainer>::size_type
    erase_if(flat_map<Key, T, Compare, KeyContainer, MappedContainer>& c,
             Predicate pred); // (1) C++23
  template<class Key,
           class T,
           class Compare,
           class KeyContainer,
           class MappedContainer,
           class Predicate>
  constexpr typename flat_map<Key, T, Compare, KeyContainer, MappedContainer>::size_type
    erase_if(flat_map<Key, T, Compare, KeyContainer, MappedContainer>& c,
             Predicate pred); // (1) C++26
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。

述語関数オブジェクトには、キーではなく、要素全体 (キーと値の[`pair`](/reference/utility/pair.md)) が渡されるので注意。


## 事前条件
- `Key`と`T`がムーブ代入可能であること


## 効果
メンバ変数として保持しているコンテナ`c`の各要素`e`について、`bool(pred(pair<const Key&, const T&>(e)))`を`E`として、`E`が`true`であるすべての要素を削除する。


## 戻り値
削除した要素数を返す。


## 計算量
正確に[`size()`](size.md)回だけ述語適用する。


## 例
```cpp example
#include <iostream>
#include <flat_map>

int main()
{
  std::flat_map<int, char> fm = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  // コンテナfmから、キー1をもつ要素をすべて削除する
  std::erase_if(fm, [](const auto& x) { return x.first == 1; });

  for (const auto& [key, value] : fm) {
    std::cout << key << ':' << value << std::endl;
  }
}
```
* std::erase_if[color ff0000]

### 出力
```
3:a
4:c
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
