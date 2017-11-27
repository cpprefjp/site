# 整数に対する除算と剰余算の丸め結果を規定
* cpp11[meta cpp]

## 概要
整数`a`, `b`に対する除算`a/b`の結果(商)と剰余算`a%b`の結果(余り)について`(a/b)*b + a%b = a`という等式が成り立つことが規定されているが、C++03まで、少なくとも一方が負の数である場合の余りの符号は実装定義だった。このため先述の等式により商も実装定義となっていた。C++11ではC99に合わせて「商の小数部がゼロ方向に切り捨てられた結果となること」が規定された。

これにより、整数に対する除算と剰余算の結果が移植性のある値となるようになった。


## 仕様
C++03では、余りの符号が以下のように規定されていた：

「両方の項が非負である場合、余りは非負となる。片方もしくは両方の項が負数である場合、余りの符号は実装定義となる。注釈：現在作業中のISO Cのリビジョン(C99のこと)とISO/IEC 1539:1991で標準化されているFortranの規格ではいずれも、整数に対する除算の商は必ずゼロ方向に丸められる。」

C++11では、C99との互換性のために、上記規定を置き換えて、整数に対する除算の結果が以下のように規定された：

「整数型を項とする`/`演算子の結果は代数的な商から小数部を切り捨てたものとなる。注釈：これは「ゼロ方向への切り捨て(truncation towards zero)」とも呼ばれる。」


## 例
```cpp example
#include <cassert>

int main()
{
  assert(-7 / +2 == -3 && -7 % +2 == -1); // C++03 までは商 -4 余り +1 となる実装も規格適合
  assert(+7 / -2 == -3 && +7 % -2 == +1); // C++03 までは商 -4 余り -1 となる実装も規格適合
  assert(-7 / -2 == +3 && -7 % -2 == -1); // C++03 までは商 +4 余り +1 となる実装も規格適合
}
```
* assert[link /reference/cassert/assert.md]

### 出力
```
```


## 参照
- [CWG Issue 614. Results of integer `/` and `%`](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#614)
- [N2707 Expedited core issues handling](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2707.html)
- [N2730 Expedited core issues handling (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2730.html)
- [N2757 Expedited core issues handling (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2757.htm)
- [C++ における整数型の怪と "移植性のある" オーバーフローチェッカー (第1回 : 整数型の怪と対策の不足)](http://qiita.com/a4lg/items/541c9d9dd5d874eeef2f)

