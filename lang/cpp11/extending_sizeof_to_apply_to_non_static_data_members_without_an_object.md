# sizeof演算�にクラスの非静的メンバを、オブジェクトを作らずに指定できるようにする
* cpp11[meta cpp]

## 概要
クラスの非静的メンバ変数のサイズを取得したい場合、そのクラスのオブジェクトを生成してから`sizeof`演算�にメンバを指定する必要があった。その制限が外され、クラスと非静的メンバ変数を、スコープ解決演算� `::` 区切りで`sizeof`演算�に指定できるようになった：

```cpp example
#include <iostream>

struct X {
  int m;
};

int main()
{
  const std::size_t size = sizeof(X::m);
  std::cout << size << std::endl;
}
```

これができなかったバージョンでは、`sizeof(((X*)0)->m)`のような回避�がとられていた。


## 参照
- [CWG Issue 198. Definition of "use" in local and nested classes](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#198)
- [CWG Issue 613. Unevaluated uses of non-static class members](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#613)
- [N2150 Extending sizeof to apply to non-static data members without an object](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2150.html)
- [N2253 Extending sizeof to apply to non-static data members without an object (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2253.html)

