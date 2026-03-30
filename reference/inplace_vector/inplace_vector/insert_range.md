# insert_range
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <container-compatible-range<T> R>
constexpr iterator insert_range(const_iterator position, R&& rg); // (1) C++26
```

## 概要
Rangeの要素を任意の位置に挿入する。

Range `rg`の要素を`position`の前に挿入する。


## 戻り値
挿入された最初の要素を指すイテレータ。`rg`が空の場合は`position`を指すイテレータ。


## 例外
挿入後のサイズが`N`を超える場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 計算量
挿入される要素の数と挿入位置から[`end()`](end.md)までの要素数に対して線形時間。


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <vector>

int main()
{
  std::inplace_vector<int, 10> iv = {1, 2, 5, 6};

  std::vector<int> src = {3, 4};
  iv.insert_range(iv.begin() + 2, src);

  for (int x : iv) {
    std::println("{}", x);
  }
}
```
* insert_range[color ff0000]
* iv.begin()[link begin.md]

### 出力
```
1
2
3
4
5
6
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
