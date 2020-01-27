# swap (非メンバ関数)
* unordered_set[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Alloc>
  void swap(unordered_multiset<Key, Hash, Pred, Alloc>& x,
            unordered_multiset<Key, Hash, Pred, Alloc>& y);

  template <class Key, class Hash, class Pred, class Alloc>
  void swap(unordered_multiset<Key, Hash, Pred, Alloc>& x,
            unordered_multiset<Key, Hash, Pred, Alloc>& y)
    noexcept(noexcept(x.swap(y))); // C++17
}
```

## 概要
2 つの `unordered_multiset` オブジェクトの内容を入れ替える。


## 効果
`x.`[`swap`](swap.md)`(y)` と�価。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_set>
#include <iterator>
#include <algorithm>

template <class C>
void print(const std::string& label, const C& c, std::ostream& os = std::cout)
{
  os << label << ":";
  std::copy(std::begin(c), std::end(c), std::ostream_iterator<typename C::value_type>(os, ", "));
  os << std::endl;
}

int main()
{
  std::unordered_multiset<int> ums1{ 1, 2, 3, 1, 2, 3, };
  std::unordered_multiset<int> ums2{ 4, 5, 6, 4, 5, 6, };

  print("ums1 before", ums1);
  print("ums2 before", ums2);
  swap(ums1, ums2);
  print("ums1 after", ums1);
  print("ums2 after", ums2);
}
```
* swap[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]

### 出力
```
ums1 before:3, 3, 2, 2, 1, 1,
ums2 before:6, 6, 5, 5, 4, 4,
ums1 after:6, 6, 5, 5, 4, 4,
ums2 after:3, 3, 2, 2, 1, 1,
```

注：[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 実装例
```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Alloc>
  void swap(unordered_multiset<Key, Hash, Pred, Alloc>& x,
            unordered_multiset<Key, Hash, Pred, Alloc>& y)
  {
    x.swap(y);
  }
}
```
* swap[link swap.md]

## 関連項目


| 名前 | 説明 |
|----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| [`swap`](swap.md) | 内容の交換（メンバ関数） |
| [`operator=`](op_assign.md) | 代入演算� |
| [`operator==`](op_equal.md) | �値比較 |
| [`operator!=`](op_not_equal.md) | 非�値比較 |


## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
