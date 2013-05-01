#max
```cpp
namespace std {
  template<class T>
  const T& max(const T& a, const T& b);

  template<class T, class Compare>
  const T& max(const T& a, const T& b, Compare comp);

  // C++11から
  template<class T>
  T max(initializer_list<T> t);

  // C++11から
  template<class T, class Compare>
  T max(initializer_list<T> t, Compare comp);
}
```
* initializer_list[link /reference/initializer_list.md]

##概要

<b>同じ型の2つの値、もしくは[`initializer_list`](/reference/initializer_list.md)によるN個の値のうち、最大値を取得する。</b>
<b>最後の引数`comp`は、2項の述語関数オブジェクトであり、これを使用して比較演算をカスタマイズすることができる。</b>



##要件

型`T`が`operator<`による比較が可能であること。
[`initializer_list`](/reference/initializer_list.md)バージョンはそれに加えて、要素数が1以上であり、`T`がコピーコンストラクト可能であること。


##戻り値

最大値



##備考



##例

```cpp
#include <cassert>
#include <algorithm>
#include <functional>
```

int main()
{
  int result1 = std::<color=ff0000>max</color>(2, 3);
  assert(result1 == 3);

  int result2 = std::<color=ff0000>max</color>(2, 3, std::greater<int>());
  assert(result2 == 2);

  int result3 = std::<color=ff0000>max</color>({1, 2, 3});
  assert(result3 == 3);

  int result4 = std::<color=ff0000>max</color>({1, 2, 3}, std::greater<int>());
  assert(result4 == 1);
}




###出力

```cpp
```

##initializer_listバージョンの使用可能状況

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) <h4>備考</h4>
Windows環境においては、<windows.h>をインクルードすると`max`という名前の関数マクロが定義され、`std::max()`と衝突してしまうという問題がある。
この解決策として以下の2つの方法がある：
<ol>
- <windows.h>をインクルードするまでに`#define NOMINMAX`を行う。これで`max`マクロがdefineされなくなる。
- `std::max()`を呼び出す際に、`(std::max)(a, b);`のように関数名をカッコで囲んで使用する。これで、名前解決において`std::max()`関数が必ず使用される。</ol>
```
##実装例

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

##参照


