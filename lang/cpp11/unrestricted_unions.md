#共用体の制限解除
* cpp11[meta cpp]

##概要
共用体のメンバ変数として、クラスオブジェクトを保持できるようになった：

```cpp
#include <iostream>
#include <complex>
#include <string>

union X {
  int m1;
  std::complex<double> m2; // クラスオブジェクトを
  std::string m3;          // 保持できる

  X() : m1(0) {}
  ~X() {}
};

int main()
{
   X x;
   
   // int型の値を代入する
   x.m1 = 3;
   std::cout << x.m1 << std::endl;

   // std::complex<double>型のオブジェクトを代入する
   x.m2 = std::complex<double>(1.0, 2.0);
   std::cout << x.m2 << std::endl;

   // デストラクタを呼び出す必要がある型に対しては、
   // 配置new構文でコンストラクタを使用してオブジェクト代入し、
   // 明示的にデストラクタを呼び出すこと
   new(&x.m3) std::string("hello");
   std::cout << x.m3 << std::endl;
   x.m3.~basic_string<char>();
}
```
* std::complex[link /reference/complex.md]
* std::string[link /reference/string/basic_string.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

出力：

```
3
(1,2)
hello
```


##仕様
- 共用体の非静的メンバ変数が非自明な特殊メンバ関数を持っている場合、その共用体の対応する特殊メンバ関数はデフォルトで`delete`宣言される
- 共用体の非静的メンバ変数として定義されている非自明なコンストラクタおよびデストラクタを持つ型のオブジェクトに対しては、配置`new`構文でオブジェクトを構築し、明示的にデストラクタを呼び出す必要がある
- 共用体には、参照のメンバ変数は保持できない
- 共用体は、継承に関連する機能を使用できない
    - 共用体は基本クラスを持ってはならない
    - 共用体は基本クラスになってはならない
    - 共用体は仮想メンバ関数を持てない


##参照
- [N2430 Unrestricted Unions (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2430.pdf)
- [N2544 Unrestricted Unions (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2544.pdf)

