#rotate

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator rotate(ForwardIterator first, ForwardIterator middle, ForwardIterator last);
}
```

###概要
要素の並びを回転させる。


###効果
0 以上 `last - first` 未満の整数 `i` について、`first + i` の要素を `first + (i + (last - middle)) % (last - first)` の位置へ移動させる。


###戻り値
`first + (last - middle)`


###注意
これは left rotate である


###要件
`[first,middle)` と `[middle,last)` は有効な範囲である必要がある。
`ForwardIterator` は `ValueSwappable` の要件を満たしている必要がある。
`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


###計算量
最大で `last - first` 回 swap する。


###実装例
[std::rotate を読んでみた](http://www.kmonos.net/wlog/115.html#_0007101223)


###使用例
```cpp
#include <algorithm>
#include <iostream>
#include <string>
 
int main() {
  std::string str = "rotate";
 
  std::rotate(str.begin(), str.begin() + 2, str.end());

  std::cout << str << std::endl;
}
```
* rotate[color ff0000]

###出力
```
tatero
```

###swapをフックして可視化した例
```cpp
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
    std::string str("012345");
    seq.assign(str.begin(), str.end());
    std::rotate(seq.begin(), seq.begin() + 2, seq.end());
}
```
* rotate[color ff0000]

####実行結果

gcc-4.6.3 で確認。
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
