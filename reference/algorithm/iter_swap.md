#iter_swap
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator1, class ForwardIterator2>
  void iter_swap(ForwardIterator1 a, ForwardIterator2 b);
}
```

##概要
2つのイテレータの要素を入れ替える。


###要件
- `a` と `b` は `Dereferenceable` でなければならない。
- `*a` は `*b` と `Swappable` でなければならない。


##効果
- C++03 : 2つのイテレータ`a`と`b`が指す値を入れ替える
- C++11 : [`swap`](/reference/utility/swap.md)`(*a, *b)`


##備考
C++03版の仕様は、以下の2点で問題があった：

1. `std::swap()`関数ではなく、汎用的な入れ替え操作を行うようにも読めるため、コンテナに特化した定数時間の入れ替え操作ではなく、線形時間の入れ替えが行われることを許可していた。
2. `std::vector<bool>::iterator`のような、参照のように動作するプロキシオブジェクトを指すイテレータを許可していなかった。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v1 = { 3,1,4 };
  std::vector<int> v2 = { 4,2,5 };

  std::iter_swap(v1.begin()+1, v2.begin()+2);

  std::cout << "v1: ";
  std::copy(v1.begin(), v1.end(), std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;

  std::cout << "v2: ";
  std::copy(v2.begin(), v2.end(), std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;
}
```
* iter_swap[color ff0000]

###出力
```
v1: 3,5,4,
v2: 4,2,1,
```


##実装例
```cpp
template <class ForwardIterator1, class ForwardIterator2>
void iter_swap(ForwardIterator1 a, ForwardIterator2 b) {
  swap(*a, *b);
}
```


##参照
- [LWG Issue 187. `iter_swap` underspecified](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#187)
    - C++03での効果を見直す経緯となったIssue

