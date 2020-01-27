# 入れ�名前空間の定義
* cpp17[meta cpp]

## 概要
一度の定義だけで入れ�状になった名前空間を定義可能となる。

## 仕様

入れ�状にしたい名前空間指定�を `::` で結合して定義する。

## 例
```cpp example
#include <iostream>

// 新機能: C++17 で可能となる入れ�名前空間の定義
namespace aaa::bbb::ccc
{
  void f()
  { std::cout << "a new nested namespace definition is worked!\n"; }
}

// 比較用: C++14 までは入れ�状の名前空間を1つ1つ定義しなければならなかった。
namespace aaa
{
  namespace bbb
  {
    namespace ccc
    {
      void g()
      { std::cout << "a legacy nested namespace definition is workded.\n"; }
    }
  }
}

int main()
{
  aaa::bbb::ccc::f();
  aaa::bbb::ccc::g();
}
```

### 出力
```
a new nested namespace definition is worked!
a legacy nested namespace definition is workded.
```

## この機能が必要になった背景・経緯
多くのプ�グラマーが入れ�状の名前空間の定義について従来よりも簡潔な定義を行いたいと考えている事は言語機能に関してディスカッションのある主要なフォーラム�からも明らかで、特に近年では他の言語と比較してC++を�び始めたプ�グラマーも入れ�状の定義ができて当然と考えている状況すら見られた。
新たに言語仕様に入れ�名前空間の定義を追加する事で熟練されたプ�グラマーの文法上のタイプ数を抑えるだけでなく、C++言語の初�者に対しても入れ�名前空間の定義について混乱を排除できると考えられ、C++17に提案、採用された。

## 検討されたほかの選択肢
この機能はC++0x当時から提案されており、以前の提案�については以下参照されたい。

## 参照
- 言語仕様: §7.3.1 §A.6
- [N4230 Nested namespace definition (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4230.html)
    - [N1524 Nested Namespace Definition Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1524.htm)
    - [N2869 State of C++ Evolution (Post San Francisco 2008)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2869.html)
