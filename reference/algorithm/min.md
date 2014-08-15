#min
```cpp
namespace std {
  template <class T>
  const T& min(const T& a, const T& b);                         // (1)

  template <class T>
  constexpr const T& min(const T& a, const T& b);               // (1) C++14

  template <class T, class Compare>
  const T& min(const T& a, const T& b, Compare comp);           // (2)

  template <class T, class Compare>
  constexpr const T& min(const T& a, const T& b, Compare comp); // (2) C++14

  template <class T>
  T min(initializer_list<T> t);                                 // (3) C++11

  template <class T>
  constexpr T min(initializer_list<T> t);                       // (3) C++14

  template <class T, class Compare>
  T min(initializer_list<T> t, Compare comp);                   // (4) C++11

  template <class T, class Compare>
  constexpr T min(initializer_list<T> t, Compare comp);         // (4) C++14
}
```
* initializer_list[link /reference/initializer_list.md]

##概要
同じ型の2つの値、もしくは[`initializer_list`](/reference/initializer_list.md)によるN個の値のうち、最小値を取得する。

最後の引数`comp`は、2項の述語関数オブジェクトであり、これを使用して比較演算をカスタマイズすることができる。


##要件
- 型`T`が`operator<`による比較が可能であること。
- [`initializer_list`](/reference/initializer_list.md)バージョンはそれに加えて、要素数が1以上であり、`T`がコピーコンストラクト可能であること。


##戻り値
最小値


##例
```cpp
#include <cassert>
#include <algorithm>
#include <functional>

int main()
{
  int result1 = std::min(2, 3);
  assert(result1 == 2);

  int result2 = std::min(2, 3, std::greater<int>());
  assert(result2 == 3);

  int result3 = std::min({1, 2, 3});
  assert(result3 == 1);

  int result4 = std::min({1, 2, 3}, std::greater<int>());
  assert(result4 == 3);
}
```
* min[color ff0000]


###出力
```
```


##実装例
```cpp
template <class T>
const T& min(const T& a, const T& b)
{
  return a < b ? a : b;
}

template <class T, class Compare>
const T& min(const T& a, const T& b, Compare comp)
{
  return comp(a, b) ? a : b;
}

template <class T>
T min(std::initializer_list<T> t)
{
  return *std::min_element(t.begin(), t.end());
}

template <class T, class Compare>
T min(std::initializer_list<T> t, Compare comp)
{
  return *std::min_element(t.begin(), t.end(), comp);
}
```


##initializer_listバージョンの使用可能状況
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0(initializer_listバージョンが使用可能)
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp)

###備考
Windows環境においては、`<windows.h>`をインクルードすると`min`という名前の関数マクロが定義され、`std::min()`と衝突してしまうという問題がある。

この解決策として以下の2つの方法がある：

- `<windows.h>`をインクルードするまでに`#define NOMINMAX`を行う。これで`min`マクロがdefineされなくなる。
- `std::min()`を呼び出す際に、`(std::min)(a, b);`のように関数名をカッコで囲んで使用する。これで、名前解決において`std::min()`関数が必ず使用される。


##参照
- [LWG2350 - min, max, and minmax should be constexpr](http://cplusplus.github.io/LWG/lwg-defects.html#2350)

