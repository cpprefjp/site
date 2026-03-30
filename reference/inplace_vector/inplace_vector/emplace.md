# emplace
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class... Args>
constexpr iterator emplace(const_iterator position, Args&&... args); // (1) C++26
```

## 概要
任意の位置に要素を直接構築で挿入する。

引数`args...`から直接構築した要素を`position`の前に挿入する。


## 戻り値
挿入された要素を指すイテレータ。


## 例外
[`size()`](size.md) `== N`の場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 計算量
挿入位置から[`end()`](end.md)までの要素数に対して線形時間。


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <string>
#include <utility>

int main()
{
  std::inplace_vector<std::pair<int, std::string>, 5> iv;

  iv.emplace(iv.begin(), 1, "one");
  iv.emplace(iv.end(), 3, "three");
  iv.emplace(iv.begin() + 1, 2, "two");

  for (const auto& [k, val] : iv) {
    std::println("{}:{}", k, val);
  }
}
```
* emplace[color ff0000]
* iv.begin()[link begin.md]
* iv.end()[link end.md]

### 出力
```
1:one
2:two
3:three
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
