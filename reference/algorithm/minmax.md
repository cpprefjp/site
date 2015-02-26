#minmax (C++11)
* algorithm[meta header]
* std[meta namespace]

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

##概要
同じ型の2つの値、もしくは[`initializer_list`](/reference/initializer_list.md)によるN個の値のうち、最小値と最大値の組を取得する。

最後の引数`comp`は、2項の述語関数オブジェクトであり、これを使用して比較演算をカスタマイズすることができる。


##要件
- 型`T`が`operator<`による比較が可能であること。
- [`initializer_list`](/reference/initializer_list.md)バージョンはそれに加えて、要素数が1以上であり、`T`がコピーコンストラクト可能であること。


##戻り値
`first`が最小値、`second`が最大値となる[`pair`](/reference/utility/pair.md)オブジェクト


##計算量
- 2値比較バージョンは1操作。
- `initializer_list`バージョンは高々`(3/2) * t.size()`回の述語適用。


##例
```cpp
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


###出力
```
```


##実装例
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


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [LWG2350 - min, max, and minmax should be constexpr](http://cplusplus.github.io/LWG/lwg-defects.html#2350)

