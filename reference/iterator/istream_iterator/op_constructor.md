# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* istream_iterator[meta class]
* function[meta id-type]

```cpp
istream_iterator();                                    // (1) C++03
constexpr istream_iterator();                          // (1) C++11

constexpr istream_iterator(default_sentinel_t);        // (2) C++20

istream_iterator(istream_type& s);                     // (3)

istream_iterator(const istream_iterator& x);           // (4) C++03
istream_iterator(const istream_iterator& x) = default; // (4) C++11
```
* default_sentinel_t[link /reference/iterator/default_sentinel_t.md]

## 概要
- (1) : デフォルトコンストラクタ。メンバ変数として保持する入力ストリームへのポインタをヌル初期化する。デフォルトコンストラクタで構築された`istream_iterator`オブジェクトは、イテレータの終端値として使用できる。
- (2) : [`default_sentinel`](/reference/iterator/default_sentinel_t.md)を受け取り、(1)と同等の構築をより明示的に行う。
- (3) : 入力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。`operator*()`で現在参照している値を返すために、この段階で入力ストリームから値を読み取り、メンバ変数に値を保持する。
- (4) : コピーコンストラクタ


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <sstream>
#include <algorithm>

int main()
{
  std::stringstream ss;
  ss << 1 << std::endl
     << 2 << std::endl
     << 3;

  std::istream_iterator<int> it(ss); // 入力ストリームオブジェクトへの参照を渡す
  std::istream_iterator<int> last;   // デフォルト構築。終端値として使用する

  std::for_each(it, last, [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md]

### 出力
```
1
2
3
```

## 参照
- [LWG Issue 2576. `istream_iterator` and `ostream_iterator` should use `std::addressof`](https://wg21.cmeerw.net/lwg/issue2576)
