# ローカル型と無名型を、テンプレート引数として使用することを許可
* cpp11[meta cpp]

## 概要
ローカルで定義した型と、名前のない型を、テンプレート引数として渡すことが許可された。

これにより、関数内で用意した列挙型と列挙子を、関数テンプレートやクラステンプレートに渡せるようになった。

```cpp
#include <iostream>

template <class T>
int to_int(T x) { return static_cast<int>(x); }

int main()
{
  enum { E1, E2 };

  int value = to_int(E2);
  std::cout << value << std::endl;

  int value2 = to_int<decltype(E2)>(E2);
  std::cout << value2 << std::endl;
}
```

出力：

```
1
1
```


## この機能が必要になった背景・経緯
この機能は主に、列挙型のためにサポートされた。列挙型は列挙子が列挙型のスコープを持たないため、列挙型自体は無名で定義する場合がある。関数内で、即興で列挙型を定義する場合もある。しかし、テンプレートに渡すために、非ローカルで名前付きにする必要があった。この状況を使いやすい形にするために、ローカルで定義した型と名前のない型を、テンプレート引数として渡すことが許可された。


## 参照
- [N1945 Names, Linkage, and Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1945.pdf)
- [N2187 Names, Linkage, and Templates (rev 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2187.pdf)
- [N2402 Names, Linkage, and Templates (rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2402.pdf)
- [N2635 Local and Unnamed Types as Template Arguments](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2635.html)
- [N2657 Local and Unnamed Types as Template Arguments](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2657.htm)

