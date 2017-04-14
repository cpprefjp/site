# make_pair
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T1, class T2>
  pair<V1, V2> make_pair(T1, T2);                   // C++03

  template <class T1, class T2>
  pair<V1, V2> make_pair(T1&& x, T2&& y);           // C++11

  template <class T1, class T2>
  constexpr pair<V1, V2> make_pair(T1&& x, T2&& y); // C++14
}
```
* pair[link /reference/utility/pair.md]

## 概要
pairクラスのオブジェクトを構築する。


C++03の場合、結果型の`V1`および`V2`は以下のような型となる：

- `V1` : `T1`
- `V2` : `T2`

C++11以降の場合、結果型の`V1`および`V2`は以下のような型となる：

`T1`と`T2`それぞれの型`T`において、

- `decay<T>::type`の結果型を使用し、
- かつ`T`が`reference_wrapper`型であった場合`T&`型を使用する


## 戻り値
```cpp
std::pair<V1, V2>(std::forward<T1>(x), std::forward<T2>(y));
```
* std::forward[link forward.md]


## 例
```cpp
#include <iostream>
#include <utility>
#include <functional>

int main()
{
  std::pair<int, char> p1 = std::make_pair(1, 'a');

  int ar[3] = {1, 2, 3};
  char c = 'b';

  // 配列はT*となり、reference_wrapper<T>はT&となる。
  std::pair<int*, char&> p2 = std::make_pair(ar, std::ref(c));
}
```
* std::make_pair[color ff0000]
* std::ref[link /reference/functional/ref.md]

### 出力
```
```

## 参照
- [N2244 Wording for `decay`, `make_pair` and `make_tuple`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2244.html)
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
