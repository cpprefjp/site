# begin
* ranges[meta header]
* std::ranges[meta namespace]
* reverse_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr reverse_iterator<iterator_t<V>> begin(); // (1) C++20

constexpr reverse_iterator<iterator_t<V>> begin()
  requires common_range<V>;                        // (2) C++20

constexpr auto begin() const
  requires common_range<const V>;                  // (3) C++20
```
* reverse_iterator[link /reference/iterator/reverse_iterator.md]

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) : キャッシュが空の場合、`cache_ = make_reverse_iterator(ranges::next(ranges::begin(base_), ranges::end(base_)))`を実行する。そうでなければ`return *cache_;`
- (2) : `return make_reverse_iterator(ranges::end(base_));`
- (3) : `return make_reverse_iterator(ranges::end(base_));`

## 備考

- (1)は、[`common_range`](../common_range.md)ではないRangeのために、終端位置をキャッシュして償却定数時間で返す

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  std::ranges::reverse_view rv(vec);
  
  auto it = rv.begin();
  
  // 逆順に出力
  std::cout << *it << std::endl;      // 5
  ++it;
  std::cout << *it << std::endl;      // 4
  
  // const版
  const auto& crv = rv;
  auto cit = crv.begin();
  std::cout << *cit << std::endl;     // 5
}
```
* begin[color ff0000]

### 出力
```
5
4
5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.6.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.reverse.view)