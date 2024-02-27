# advance
* ranges[meta header]
* std::ranges[meta namespace]
* subrange[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr subrange& advance(iter_difference_t<I> n);
```
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* subrange[link ../subrange.md]

## 概要
部分Rangeの先頭を前進または後退させる。引数が負の時は後退する。

## 効果

[`StoreSize`](op_constructor.md)が真のとき、

```cpp
auto d = n - ranges::advance(begin_, n, end_);
if (d >= 0)
  size_ -= to-unsigned-like(d);
else
  size_ += to-unsigned-like(-d);
return *this;
```
* ranges::advance[link /reference/iterator/ranges_advance.md]
* to-unsigned-like[link /reference/type_traits/make_unsigned.md]

それ以外のとき、

```cpp
ranges::advance(begin_, n, end_);
return *this;
```
* ranges::advance[link /reference/iterator/ranges_advance.md]

## 備考
- `subrange`の末端を超えて進めようとした場合、`subrange`の長さは0になる。
- `subrange`の先頭を後退させたとき、元の範囲でその位置に要素があればアクセスできる。

## 例
```cpp example
#include <ranges>
#include <iostream>

template<std::ranges::range R>
void print(const R& r) {
  for (int x : r) {
    std::cout << x << ',';
  }
  std::cout << '\n';
}

int main()
{
  constexpr int a[] = {1, 2, 3, 4, 5};
  std::ranges::subrange sub(a + 1, a + 4);

  print(sub);

  sub.advance(1);
  print(sub);

  sub.advance(1);
  print(sub);

  sub.advance(-3);
  print(sub);

  // これ以上後退すると、先頭が配列aの範囲を超えてしまう
  // sub.advance(-1);
  // print(sub);
}
```

### 出力
```
2,3,4,
3,4,
4,
1,2,3,4,
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
