# rotate
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator>
  void
    rotate(ForwardIterator first,
           ForwardIterator middle,
           ForwardIterator last);  // (1) C++03

  template <class ForwardIterator>
  ForwardIterator
    rotate(ForwardIterator first,
           ForwardIterator middle,
           ForwardIterator last);  // (1) C++11

  template <class ForwardIterator>
  constexpr ForwardIterator
    rotate(ForwardIterator first,
           ForwardIterator middle,
           ForwardIterator last);  // (1) C++20

  template<class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    rotate(ExecutionPolicy&& exec,
           ForwardIterator first,
           ForwardIterator middle,
           ForwardIterator last);  // (2) C++17
}
```

## 概要
`middle`の要素が先�、`middle-1`の要素が末尾となるように、`[first,last)`の要素の並びを回転させる。


## 要件
- `[first,middle)` と `[middle,last)` は有効な範囲である必要がある。
- `ForwardIterator` は `ValueSwappable` の要件を満たしている必要がある。
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


## 効果
0 以上 `last - first` 未満の整数 `i` について、`first + i` の要素を `first + (i + (last - middle)) % (last - first)` の位置へ移動させる。


## 戻り値
- C++03 まで  
	無し
- C++11 から  
	回転前の先�の要素を指すイテレータ`first + (last - middle)`


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

  std::rotate(str.begin(), str.begin() + 2, str.end());
  std::cout << str << std::endl;
}
```
* std::rotate[color ff0000]
* str.begin()[link /reference/string/basic_string/begin.md]
* str.end()[link /reference/string/basic_string/end.md]

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
  std::copy(seq.begin(), seq.end(), std::ostream_iterator<char>(std::cout));
  std::cout << "\n\n";
}

int main()
{
  char str[] = "012345";
  seq.assign(str, str + sizeof(str) - 1);
  std::rotate(seq.begin(), seq.begin() + 2, seq.end());
}
```
* std::rotate[color ff0000]
* seq.begin()[link /reference/vector/vector/begin.md]
* seq.end[link /reference/vector/vector/end.md]
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

## 実装例
- [std::rotate を�んでみた](http://www.kmonos.net/wlog/115.html#_0007101223)


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2005, 2008, 2010, 2012, 2013, 2015
    - C++11への対応（戻り値の変更）は2010から。


## 参照
- [LWG DR488. rotate throws away useful information](http://cplusplus.github.io/LWG/lwg-defects.html#488)  
	戻り値が追加されるきっかけとなったレポート
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
