# try_append_range
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <container-compatible-range<T> R>
constexpr ranges::borrowed_iterator_t<R> try_append_range(R&& rg); // (1) C++26
```

## 概要
Rangeの要素を末尾へ追加を試みる。容量に収まる分だけ追加し、残りは追加しない。


## 効果
Range `rg`の先頭から順に要素を末尾に追加する。容量が満杯になった時点で追加を停止する。


## 戻り値
挿入されなかった最初の要素を指す`rg`のイテレータを返す。全要素が挿入された場合は`ranges::end(rg)`を返す。


## 計算量
実際に挿入された要素数に対して線形時間


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <vector>

int main()
{
  std::inplace_vector<int, 5> iv = {1, 2, 3};
  std::vector<int> src = {4, 5, 6, 7};

  auto it = iv.try_append_range(src);

  std::print("inserted: ");
  for (int x : iv) std::print("{} ", x);
  std::println("");

  std::print("remaining: ");
  for (; it != src.end(); ++it) std::print("{} ", *it);
  std::println("");
}
```
* try_append_range[color ff0000]

### 出力
```
inserted: 1 2 3 4 5 
remaining: 6 7 
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
