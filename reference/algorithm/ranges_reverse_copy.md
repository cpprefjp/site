# reverse_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O>
    requires indirectly_copyable<I, O>
  constexpr reverse_copy_result<I, O>
    reverse_copy(I first,
                 S last,
                 O result); // (1) C++20

  template <bidirectional_range R,
            weakly_incrementable O>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr reverse_copy_result<borrowed_iterator_t<R>, O>
    reverse_copy(R&& r,
                 O result); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            random_access_iterator O,
            sized_sentinel_for<O> OutS>
    requires indirectly_copyable<I, O>
  reverse_copy_truncated_result<I, O>
    reverse_copy(Ep&& exec,
                 I first,
                 S last,
                 O result,
                 OutS result_last); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            sized-random-access-range OutR>
    requires indirectly_copyable<iterator_t<R>, iterator_t<OutR>>
  reverse_copy_truncated_result<borrowed_iterator_t<R>, borrowed_iterator_t<OutR>>
    reverse_copy(Ep&& exec,
                 R&& r,
                 OutR&& result_r); // (4) C++26
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* reverse_copy_result[link ranges_in_out_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]
* reverse_copy_truncated_result[link ranges_in_in_out_result.md]

## 概要
要素の並びを逆にし、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定し、出力範囲の終端も指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 事前条件
`[first,last)` と `[result,result+(last-first))` は領域が重なっていてはならない。


## 効果
0 以上 `last - first` 未満の整数 `i` について、`*(result + (last - first) -1 - i) = *(first + i)` を行うことで、`[first,last)` の範囲を `[result,result+(last-first))` へコピーする。


## 戻り値
- (1), (2): `{ .in = last, .out = result + (last - first) }`
- (3), (4): 出力範囲が入力範囲より短い場合、出力範囲の末尾まで書き込み、`in1`と`in2`で入力範囲のどこまで処理されたかを示す。`in1`は常に`last`と等しく、`in2`は入力範囲内の停止点を指す。出力範囲が十分な場合は`in2 == first`となる


## 計算量
正確に `last - first` 回代入する


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <string>
#include <iterator>

int main() {
  std::string str = "reverse";

  std::ranges::reverse_copy(str, std::ostream_iterator<char>(std::cout, ""));
}
```
* std::ranges::reverse_copy[color ff0000]

#### 出力
```
esrever
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <execution>

int main() {
  std::vector<int> src = {1, 2, 3, 4, 5};
  std::vector<int> dst(src.size());

  // 並列に逆順コピーする
  auto result = std::ranges::reverse_copy(std::execution::par, src, dst);

  for (int x : dst) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::reverse_copy[color ff0000]

#### 出力
```
5 4 3 2 1
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
- [P3709R2 Reconsider parallel `ranges::rotate_copy` and `ranges::reverse_copy`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3709r2.html)
