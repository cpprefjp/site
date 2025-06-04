# size
* ranges[meta header]
* std::ranges[meta namespace]
* zip_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size()
  requires (sized_range<Views> && ...);       // (1) C++23

constexpr auto size() const
  requires (sized_range<const Views> && ...); // (2) C++23
```

## 概要

要素数を取得する。

## 効果

以下と等価：

```cpp
return apply(
  [](auto... sizes) {
    using CT = make-unsigned-like-t<common_type_t<decltype(sizes)...>>;
    return ranges::min({CT(sizes)...});
  },
  tuple-transform(ranges::size, views_));
```
* apply[link /reference/tuple/apply.md]
* make-unsigned-like-t[link /reference/type_traits/make_unsigned.md]

ここで、`tuple-transform`は説明専用の関数テンプレートである。

## 備考

`zip_view`のサイズは、zipする各Rangeのサイズの最小値となる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <array>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::array<char, 5> a = {'a', 'b', 'c', 'd', 'e'};
  
  std::ranges::zip_view zv(v, a);
  
  // サイズは小さい方のサイズ（3）になる
  std::cout << "size: " << zv.size() << std::endl;
  
  // const版も動作する
  const auto& czv = zv;
  std::cout << "const size: " << czv.size() << std::endl;
}
```
* size[color ff0000]

### 出力
```
size: 3
const size: 3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 5 [mark verified]

## 参照
- [N4950 26.7.25 Zip view](https://timsong-cpp.github.io/cppwp/n4950/range.zip)