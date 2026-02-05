# rotate
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S>
  constexpr subrange<I>
    rotate(I first,
           I middle,
           S last);               // (1) C++20

  template <forward_range R>
    requires permutable<iterator_t<R>>
  constexpr borrowed_subrange_t<R>
    rotate(R&& r,
           iterator_t<R> middle); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S>
    requires permutable<I>
  subrange<I>
    rotate(Ep&& exec,
           I first,
           I middle,
           S last);               // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R>
    requires permutable<iterator_t<R>>
  borrowed_subrange_t<R>
    rotate(Ep&& exec,
           R&& r,
           iterator_t<R> middle); // (4) C++26
}
```
* permutable[link /reference/iterator/permutable.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
`middle`の要素が先頭、`middle-1`の要素が末尾となるように、`[first,last)`の要素の並びを回転させる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## 事前条件
- `[first,middle)` と `[middle,last)` は有効な範囲である必要がある。


## 効果
0 以上 `last - first` 未満の整数 `i` について、`first + i` の要素を `first + (i + (last - middle)) % (last - first)` の位置へ移動させる。


## 戻り値
末尾を除く回転前の列を表す部分Range `{first + (last - middle), last}`


## 備考
これは左への回転である


## 計算量
最大で `last - first` 回 swap する。


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <string>

int main() {
  std::string str = "rotate";

  std::ranges::rotate(str, str.begin() + 2);
  std::cout << str << std::endl;
}
```
* std::ranges::rotate[color ff0000]
* str.begin()[link /reference/string/basic_string/begin.md]

#### 出力
```
tatero
```

### swapをフックして可視化した例
```cpp example
#include <iostream>
#include <algorithm>
#include <iterator>
#include <vector>
#include <utility>

class Elem
{
public:
  Elem() : c_('\0') {}
  explicit Elem(char c) : c_(c) {}
  Elem& operator=(const char c) { c_ = c; return *this; }
  operator char() const { return c_; }
private:
  char c_;
};

std::vector<Elem> seq;

void swap(Elem& lhs, Elem& rhs)
{
  // std::rotate内部で実行されるswapを可視化できる。
  // ライブラリの実装によってスワップの順番が異なることがある。
  std::cout << "swapping "
            << &lhs << "(" << lhs << ") <-> "
            << &rhs << "(" << rhs << ")" << std::endl;
  std::swap(lhs, rhs);
  std::ranges::copy(seq, std::ostream_iterator<char>(std::cout));
  std::cout << "\n\n";
}

int main()
{
  char str[] = "012345";
  seq.assign(str, str + sizeof(str) - 1);
  std::ranges::rotate(seq, seq.begin() + 2);
}
```
* std::ranges::rotate[color ff0000]
* std::ranges::copy[link ranges_copy.md]
* seq.begin()[link /reference/vector/vector/begin.md]
* seq.assign[link /reference/vector/vector/assign.md]
* std::swap[link /reference/utility/swap.md]

#### 出力例
```
swapping 0x1806040(0) <-> 0x1806042(2)
210345

swapping 0x1806041(1) <-> 0x1806043(3)
230145

swapping 0x1806042(0) <-> 0x1806044(4)
234105

swapping 0x1806043(1) <-> 0x1806045(5)
234501
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 並列に要素を回転させる (先頭から2つ目の要素が先頭に来る)
  std::ranges::rotate(std::execution::par, v, v.begin() + 2);

  for (int i : v) {
    std::cout << i << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::rotate[color ff0000]
* v.begin()[link /reference/vector/vector/begin.md]

#### 出力
```
3 4 5 1 2
```

## 実装例
- [std::rotate を読んでみた](http://www.kmonos.net/wlog/115.html#_0007101223)

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
