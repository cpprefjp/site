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

## 概要
pairクラスのオブジェクトを構築する。

結果型の`V1`および`V2`は以下のような型となる：

- C++03 :
    - `V1` : `T1`
    - `V2` : `T2`
- C++11 : `T1`と`T2`それぞれの型`T`において、
    - [`std::decay`](/reference/type_traits/decay.md)`<T>::type`の結果型を使用し、
    - かつ型`T`が[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)型であった場合`T&`型を使用する
- C++20 : `T1`と`T2`それぞれの型`T`において、
    - [`std::unwrap_ref_decay_t`](/reference/type_traits/unwrap_ref_decay.md)`<T>`を適用した型


## 戻り値
```cpp
std::pair<V1, V2>(std::forward<T1>(x), std::forward<T2>(y));
```


## 例
```cpp example
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
- [P0318R1 `unwrap_ref_decay` and `unwrap_reference`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0318r1.pdf)
