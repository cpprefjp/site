# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* istream_iterator[meta class]
* function[meta id-type]

```cpp
istream_iterator();                                    // (1)
istream_iterator(istream_type& s);                     // (2)
istream_iterator(const istream_iterator& x) = default; // (3)
```

## 概要
- (1) : デフォルトコンストラクタ。メンバ変数として保持する入力ストリームへのポインタをヌル初期化する。デフォルトコンストラクタで構築された`istream_iterator`オブジェクトは、イテレータの終端値として使用できる。
- (2) : 入力ストリームオブジェクトへの参照を受け取り、メンバ変数にそのオブジェクトへのポインタを保持する。`operator*()`で現在参照している値を返すために、この段階で入力ストリームから値を�み取り、メンバ変数に値を保持する。
- (3) : コピーコンストラクタ


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
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

### 出力
```
1
2
3
```

## 参照
- [LWG Issue 2576. `istream_iterator` and `ostream_iterator` should use `std::addressof`](https://wg21.cmeerw.net/lwg/issue2576)
