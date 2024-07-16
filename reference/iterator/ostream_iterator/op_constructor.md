# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* ostream_iterator[meta class]
* function[meta id-type]

```cpp
ostream_iterator(ostream_type& s);                                       // (1)
ostream_iterator(ostream_type& s, const CharT* delimiter);               // (2)
ostream_iterator(const ostream_iterator<T, CharT, Traits>& x) = default; // (3)
```

## 概要
- (1) : 出力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。区切り文字列はヌルとなる。
- (2) : 出力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。区切り文字列を受け取り、メンバ変数に保持する。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <algorithm>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};

  // std::coutに出力。区切り文字列なし
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout));

  std::cout << std::endl;

  // std::coutに出力。区切り文字列は","
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, ","));
}
```

### 出力
```
123
1,2,3,
```

## 参照
- [LWG Issue 2576. `istream_iterator` and `ostream_iterator` should use `std::addressof`](https://wg21.cmeerw.net/lwg/issue2576)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2325R3 Views should not be required to be default constructible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2325r3.html)
