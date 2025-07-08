# size
* ranges[meta header]
* std::ranges[meta namespace]
* zip_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<InnerView>;       // (1) C++23

constexpr auto size() const
  requires sized_range<const InnerView>; // (2) C++23
```

## 概要

要素数を取得する。

## 効果

- (1) : `return zip_.size();`
- (2) : `return zip_.size();`

ここで、`InnerView`は説明専用の[`zip_view`](../zip_view.md)`<Views...>`である。

## 備考

`zip_transform_view`のサイズは、内部で保持する`zip_view`のサイズと同じで、zipする各Rangeのサイズの最小値となる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <array>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::array<char, 5> a = {'a', 'b', 'c', 'd', 'e'};
  
  auto f = [](int n, char c) { return std::pair{n * 10, c}; };
  std::ranges::zip_transform_view ztv(f, v, a);
  
  // サイズは小さい方のサイズ（3）になる
  std::cout << "size: " << ztv.size() << std::endl;
  
  // const版も動作する
  const auto& cztv = ztv;
  std::cout << "const size: " << cztv.size() << std::endl;
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
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照
- [N4950 26.7.26 Zip transform view](https://timsong-cpp.github.io/cppwp/n4950/range.zip.transform)