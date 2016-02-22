#整数に対する除算と剰余算の丸め結果を規定
* cpp11[meta cpp]

##概要
C++03まで、整数に対する除算と剰余算の結果は、実装定義だった。C++11ではC99に合わせて、「小数部の余りが切り捨てられた結果となること」、整数に対して`(a/b)*b + a%b = a`という式が成り立つことが規定された。

これにより、整数に対する除算と剰余算が、移植性のある結果であると言えるようになった。


##仕様
C++03では、整数に対する除算と剰余算は、以下のように規定されていた：

「式`a / b`および式`a % b`の両方の項が非負である場合、非負の結果となる。片方もしくは両方の項が負数である場合、結果は実装定義となる。注釈：現在作業中のISO Cのリビジョン(C99のこと)とISO/IEC 1539:1991で標準化されているFortranの規格ではいずれも、整数に対する除算の商は必ずゼロ方向に丸められる。」


C++11では、C99との互換性のために、整数に対する除算と剰余算の結果が以下のように規定された：

「整数型を項とする`operator/`による除算の結果として生じた小数部の商は破棄される。これは「ゼロ方向への切り捨て (truncation toward zero)」とも呼ばれる方式である。その型での`a / b`の結果として商が表現可能である場合、`(a/b)*b + a%b`は`a`と等しくなる。」


##例
```cpp
#include <cassert>

int main()
{
  // 負数に対する除算
  assert(-7 / +2 == -3); // -7 / +2は-3.5となり、ゼロ方向への切り捨てが行われて-3となる
  assert(+7 / -2 == -3); // +7 / -2は-3.5となり、ゼロ方向への切り捨てが行われて-3となる
  assert(-7 / -2 == +3); // -7 / -2は+3.5となり、ゼロ方向への切り捨てが行われて+3となる

  // 負数に対する剰余算
  assert(-7 % +2 == -1); // -7 / +2は-3となり、それに+2を掛けた値を-7から引いて-1となる
  assert(+7 % -2 == +1); // +7 / -2は-3となり、それに-2を掛けた値を+7から引いて+1となる
  assert(-7 % -2 == -1); // -7 / -2は+3となり、それに-2を掛けた値を-7から引いて-1となる
}
```
* assert[link /reference/cassert/assert.md]

###出力
```
```


##参照
- [CWG Issue 614. Results of integer `/` and `%`](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#614)
- [N2707 Expedited core issues handling](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2707.html)
- [N2730 Expedited core issues handling (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2730.html)
- [N2757 Expedited core issues handling (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2757.htm)

