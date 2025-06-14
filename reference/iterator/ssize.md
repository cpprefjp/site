# ssize
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class C>
  constexpr auto ssize(const C& c)
    -> common_type_t<ptrdiff_t, make_signed_t<decltype(c.size())>>; // (1)

  template <class T, ptrdiff_t N>
  constexpr ptrdiff_t ssize(const T (&array)[N]) noexcept;          // (2)
}
```
* common_type_t[link /reference/type_traits/common_type.md]
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]
* make_signed_t[link /reference/type_traits/make_signed.md]

## 概要
コンテナの要素数を、符号付き整数型で取得する。

- (1) : コンテナの要素数を取得する
- (2) : 生配列の要素数を取得する

この関数の戻り値は、標準コンテナも含めて基本的には[`std::ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)型が返る。ただし、自作コンテナの`size()`メンバ関数が[`std::size_t`](/reference/cstddef/size_t.md)と異なる幅の型を返す場合は、それに対応する符号付き整数型が返る。


## 戻り値
- (1) : `return c.size();`
- (2) : `return N;`


## 例
```cpp example
#include <cassert>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};
  int ar[] = {1, 2, 3};

  // コンテナの要素数を取得。
  std::ptrdiff_t n1 = std::ssize(v);
  assert(n1 == 3);

  // 生配列の要素数を取得
  std::ptrdiff_t n2 = std::ssize(ar);
  assert(n2 == 3);
}
```
* std::ssize[color ff0000]
* std::ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.3.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++23 (符号付き)`size_t`リテラルのためのサフィックス](/lang/cpp23/literal_suffix_for_signed_size_t.md)
- [`std::cmp_less()`](/reference/utility/cmp_less.md)


## 参照
- [P1227: Signed `ssize()` functions, unsigned `size()` functions (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1227r2.html)
