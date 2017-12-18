# max
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  const T& max(const T& a, const T& b);                         // (1)

  template <class T>
  constexpr const T& max(const T& a, const T& b);               // (1) C++14

  template <class T, class Compare>
  const T& max(const T& a, const T& b, Compare comp);           // (2)

  template <class T, class Compare>
  constexpr const T& max(const T& a, const T& b, Compare comp); // (2) C++14

  template <class T>
  T max(initializer_list<T> t);                                 // (3) C++11

  template <class T>
  constexpr T max(initializer_list<T> t);                       // (3) C++14

  template <class T, class Compare>
  T max(initializer_list<T> t, Compare comp);                   // (4) C++11

  template <class T, class Compare>
  constexpr T max(initializer_list<T> t, Compare comp);         // (4) C++14
}
```
* initializer_list[link /reference/initializer_list.md]

## 概要
同じ型の2つの値、もしくは[`initializer_list`](/reference/initializer_list.md)によるN個の値のうち、最大値を取得する。

最後の引数`comp`は、2項の述語関数オブジェクトであり、これを使用して比較演算をカスタマイズすることができる。


## 要件
- 型`T`が`operator<`による比較が可能であること。
- [`initializer_list`](/reference/initializer_list.md)バージョンはそれに加えて、要素数が1以上であり、`T`がコピーコンストラクト可能であること。


## 戻り値
最大値


## 備考
- 等値な要素が 2 つ以上あった場合には、最も左の要素を返す。
- 型 `T` が `operator<` による比較が可能であることが要件になっているが、(2) と (4) の形式では当該要件を満たさなくても問題ないものと思われる。


## 例
```cpp example
#include <cassert>
#include <algorithm>
#include <functional>

int main()
{
  int result1 = std::max(2, 3);
  assert(result1 == 3);

  int result2 = std::max(2, 3, std::greater<int>());
  assert(result2 == 2);

  int result3 = std::max({1, 2, 3});
  assert(result3 == 3);

  int result4 = std::max({1, 2, 3}, std::greater<int>());
  assert(result4 == 1);
}
```
* std::max[color ff0000]
* std::greater[link /reference/functional/greater.md]

### 出力
```
```


## 実装例
```cpp
template <class T>
const T& max(const T& a, const T& b)
{
  return b < a ? a : b;
}

template <class T, class Compare>
const T& max(const T& a, const T& b, Compare comp)
{
  return comp(b, a) ? a : b;
}

template <class T>
T max(std::initializer_list<T> t)
{
  return *std::max_element(t.begin(), t.end());
}

template <class T, class Compare>
T max(std::initializer_list<T> t, Compare comp)
{
  return *std::max_element(t.begin(), t.end(), comp);
}
```
* std::initializer_list[link ../initializer_list.md]
* std::max_element[link max_element.md]


## initializer_listバージョンの使用可能状況
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013, 2015

### 備考
Windows環境においては、`<windows.h>`をインクルードすると`max`という名前の関数マクロが定義され、`std::max()`と衝突してしまうという問題がある。

この解決策として以下の2つの方法がある：

- `<windows.h>`をインクルードするまでに`#define NOMINMAX`を行う。これで`max`マクロがdefineされなくなる。
- `std::max()`を呼び出す際に、`(std::max)(a, b);`のように関数名をカッコで囲んで使用する。これで、名前解決において`std::max()`関数が必ず使用される。


## 参照
- [N2551 A Variadic `std::min(T, ...)` for the C++ Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2551.pdf)
- [N2772 Variadic functions: Variadic templates or initializer lists? -- Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2772.pdf)
- [LWG2350 - min, max, and minmax should be constexpr](http://cplusplus.github.io/LWG/lwg-defects.html#2350)
