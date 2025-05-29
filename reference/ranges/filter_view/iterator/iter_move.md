# iter_move
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend constexpr range_rvalue_reference_t<V>
  iter_move(const iterator& i)
    noexcept(noexcept(ranges::iter_move(i.current_))); // (1) C++20
```

## 概要
イテレータの要素を移動する。


## 効果
以下と等価：

```cpp
return ranges::iter_move(i.current_);
```


## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>
#include <string>

int main() {
  std::vector<std::string> v = {"apple", "banana", "cherry", "date"};
  auto is_long = [](const std::string& s) { return s.size() > 5; };

  std::ranges::filter_view fv{v, is_long};
  auto it = fv.begin();

  // iter_moveで要素をムーブ
  std::string s = iter_move(it);
  std::cout << s << std::endl; // banana

  // ムーブ後の元要素は空になる
  std::cout << std::boolalpha << v[1].empty() << std::endl; // true
}
```
* iter_move[color ff0000]

### 出力

```
banana
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
