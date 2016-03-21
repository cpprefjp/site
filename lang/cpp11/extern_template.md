#extern template
* cpp11[meta cpp]

##概要
`extern template`は、指定したテンプレートを、その翻訳単位でインスタンス化しないことを指示するための機能である。

これを使用することによって、複数の翻訳単位で同じテンプレートのインスタンス化が行われることを抑制できる。それによって、コンパイル速度が向上すること、およびオブジェクトファイルのサイズが膨れ上がるのを抑える効果が期待できる。

```cpp
// large_features.h

// インスタンス化すると巨大なサイズになるクラス・関数
template <class T>
class large_class {};

template <class T>
void large_function() {}
```

```cpp
// user1.cpp
#include "large_features.h"

void user1()
{
  // large_class<int>とlarge_function<int>()を
  // インスタンス化して使用する
  large_class<int> x;
  large_function<int>();
}
```

```cpp
// user2.cpp
#include "large_features.h"

// この翻訳単位では、large_class<int>とlarge_function<int>()を
// インスタンス化しない
extern template class large_class<int>;
extern template large_function<int>();

void user2()
{
  large_class<int> x;
  large_function<int>();
}
```

このように、同じテンプレート引数を指定するユーザーが複数の翻訳単位にいる場合、ひとつの翻訳単位だけがテンプレートをインスタンス化し、ほかの翻訳単位は`extern template`を使用して「テンプレートをインスタンス化しない」と指示することで、テンプレートのインスタンスがひとつで済むようになる。`extern template`を指定した翻訳単位では、そのテンプレートをインスタンス化はしないが、参照はできる。


##仕様
- `extern template`ディレクトティブがひとつの翻訳単位で現れた場合、他のいずれかの翻訳単位、もしくは同じ翻訳単位の`extern template`指定後に、そのエンティティをインスタンス化しなければならない。そのエンティティがインスタンス化されない場合、プログラムは不適格となる


##参照
- [N1448 Controling Implicit Template Instantiation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1448.pdf)
- [N1987 Adding "extern template" (version 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1987.htm)

