# minmax
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  pair<const T&, const T&> minmax(const T& a, const T& b);                         // (1) C++11

  template <class T>
  constexpr pair<const T&, const T&> minmax(const T& a, const T& b);               // (1) C++14

  template <class T, class Compare>
  pair<const T&, const T&> minmax(const T& a, const T& b, Compare comp);           // (2) C++11

  template <class T, class Compare>
  constexpr pair<const T&, const T&> minmax(const T& a, const T& b, Compare comp); // (2) C++14

  template <class T>
  pair<T, T> minmax(initializer_list<T> t);                                        // (3) C++11

  template <class T>
  constexpr pair<T, T> minmax(initializer_list<T> t);                              // (3) C++14

  template <class T, class Compare>
  pair<T, T> minmax(initializer_list<T> t, Compare comp);                          // (4) C++11

  template <class T, class Compare>
  constexpr pair<T, T> minmax(initializer_list<T> t, Compare comp);                // (4) C++14
}
```
* pair[link /reference/utility/pair.md]
* initializer_list[link /reference/initializer_list.md]

## 概要
同じ型の2つの値、もしくは[`initializer_list`](/reference/initializer_list.md)によるN個の値のうち、最小値と最大値の組を取得する。

最後の引数`comp`は、2項の述語関数オブジェクトであり、これを使用して比較演算をカスタマイズすることができる。


## 要件
- 型`T`が`operator<`による比較が可能であること。
- [`initializer_list`](/reference/initializer_list.md)バージョンはそれに加えて、要素数が1以上であり、`T`がコピーコンストラクト可能であること。


## 戻り値
`first`が最小値、`second`が最大値となる[`pair`](/reference/utility/pair.md)オブジェクト


## 計算量
- 2値比較バージョンは1操作。
- `initializer_list`バージョンは高々`(3/2) * t.size()`回の述語適用。

## 備考
- (1), (2) : 引数に右辺値を与えた場合、`minmax`の呼び出しを含む式の評価が終わった時点で、返された参照は寿命が切れている(ダングリング)ことに注意：
```cpp example
#include <cassert>
#include <algorithm>

int main()
{
  int x = 10;
  auto result1 = std::minmax(x, 11); // decltype(result1) == std::pair<const int&, const int&>
  assert(result1.first == 10);       // ok: result1.first は xを参照している
  //assert(result1.second == 11);    // 未定義動作 : result1.secondは寿命が尽きたオブジェクトを指しているため、
                                     // そのオブジェクトにアクセスしてはならない

  std::pair<int, int> result2 = std::minmax(x, 11);
  assert(result2.first == 10);       // ok: result2.first は xのコピーを持っている
  assert(result2.second == 11);      // ok: result2.second は 右辺値11のコピーを持っている
}
```

## 例
```cpp example
#include <cassert>
#include <algorithm>
#include <functional>

int main()
{
  std::pair<int, int> result1 = std::minmax(2, 3);
  assert(result1.first == 2 && result1.second == 3);

  std::pair<int, int> result2 = std::minmax(2, 3, std::greater<int>());
  assert(result2.first == 3 && result2.second == 2);

  std::pair<int, int> result3 = std::minmax({1, 2, 3});
  assert(result3.first == 1 && result3.second == 3);

  std::pair<int, int> result4 = std::minmax({1, 2, 3}, std::greater<int>());
  assert(result4.first == 3 && result4.second == 1);
}
```
* std::minmax[color ff0000]
* std::greater[link /reference/functional/greater.md]

### 出力
```
```


## 実装例
```cpp
template <class T>
std::pair<const T&, const T&> minmax(const T& a, const T& b)
{
  return a < b ?
            std::pair<const T&, const T&>(a, b) :
            std::pair<const T&, const T&>(b, a);
}

template <class T, class Compare>
std::pair<const T&, const T&> minmax(const T& a, const T& b, Compare comp)
{
  return comp(a, b) ?
            std::pair<const T&, const T&>(a, b) :
            std::pair<const T&, const T&>(b, a);
}

template <class T>
std::pair<T, T> minmax(std::initializer_list<T> init)
{
  std::pair<const T*, const T*> p = std::minmax_element(init.begin(), init.end());
  return std::make_pair(*p.first, *p.second);
}

template <class T, class Compare>
std::pair<T, T> minmax(std::initializer_list<T> init, Compare comp)
{
  std::pair<const T*, const T*> p = std::minmax_element(init.begin(), init.end(), comp);
  return std::make_pair(*p.first, *p.second);
}
```
* std::minmax_element[link minmax_element.md]
* init.begin()[link /reference/initializer_list/begin.md]
* init.end()[link /reference/initializer_list/end.md]


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013, 2015


## 参照
- [N1840 C++0x Proposal: Function template `std::minmax` and / or algorithm `std::minmax_element`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1840.pdf)
- [N1990 Proposed Text for `minmax` (N1840)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1990.htm)
- [N2551 A Variadic `std::min(T, ...)` for the C++ Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2551.pdf)
- [N2772 Variadic functions: Variadic templates or initializer lists? -- Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2772.pdf)
- [LWG2350 - min, max, and minmax should be constexpr](http://cplusplus.github.io/LWG/lwg-defects.html#2350)

