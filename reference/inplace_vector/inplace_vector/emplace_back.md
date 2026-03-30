# emplace_back
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class... Args>
constexpr reference emplace_back(Args&&... args); // (1) C++26
```

## 概要
直接構築で新たな要素を末尾に追加する。

引数`args...`から直接構築して要素を末尾に追加する。


## 戻り値
構築した要素への参照。


## 例外
[`size()`](size.md) `== N`の場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <string>
#include <utility>

int main()
{
  std::inplace_vector<std::pair<int, std::string>, 5> iv;

  iv.emplace_back(1, "one");
  iv.emplace_back(2, "two");

  for (const auto& [k, val] : iv) {
    std::println("{}:{}", k, val);
  }
}
```
* emplace_back[color ff0000]

### 出力
```
1:one
2:two
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
