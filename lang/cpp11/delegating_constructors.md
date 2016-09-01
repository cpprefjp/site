#移譲コンストラクタ
* cpp11[meta cpp]

##概要
「移譲コンストラクタ (delegating constructors)」は、コンストラクタから、同じクラスの他のコンストラクタに処理を移譲する機能である。

```cpp
class X {
  int i_;
public:
  X(int i) : i_(i) {} // (1) : int型のパラメータを受け取るコンストラクタ

  X() : X(42) {}      // (2) : デフォルトコンストラクタ。
                      //       (1)のコンストラクタに初期値を渡して初期化処理を移譲する
};
```

(2)のコンストラクタでの、`X(42)`の部分が移譲コンストラクタに当たる。(2)のコンストラクタから(1)のコンストラクタを呼び出し、初期化処理を(1)のコンストラクタに集約している。

この機能を使用することにより、複数のコンストラクタを作成・メンテナンスするコストが減り、コードの肥大化を抑えられる。


##仕様
- コンストラクタのメンバ初期化子(mem-initializer-list)は、他のコンストラクタに処理の移譲ができる
- 移譲コンストラクタによる直接的・間接的な再帰は許可しない。再帰が検出された場合、プログラムは不適格となる
- 移譲先のコンストラクタから例外が送出された場合、移譲先のコンストラクタの関数tryブロックのcatch節が呼び出され、そこから暗黙に再送出が行われ、移譲元の関数tryブロックのcatch節も呼び出される。


##例
```cpp
#include <iostream>
#include <string>

struct Parameter {
  int id;
  std::string name;
};

class X {
  int id_;
  std::string name_;
public:
  X(int id, const std::string& name) // (1)
    : id_(id), name_(name)
  {
    std::cout << "invoked (1) constructor" << std::endl;
  }

  X(const Parameter& param)          // (2)
    : X(param.id, param.name)        // 処理を他のコンストラクタに移譲する
  {
    std::cout << "invoked (2) constructor" << std::endl;
  }
};

int main()
{
  Parameter param;
  param.id = 3;
  param.name = "Alice";

  X x(param);
}
```

###出力
```
invoked (1) constructor
invoked (2) constructor
```


##この機能が必要になった背景・経緯
移譲コンストラクタがなかった頃、複数のコンストラクタで共通の処理を行うために、コンストラクタの本体(body)で共通処理の関数を呼び出していた。しかしこれは、コンストラクタでの初期化が完了したあとに行われる共通処理であるために、パフォーマンスを阻害していた。パフォーマンスを維持するためには、コンストラクタごとに同じ処理を書く必要があり、コードの肥大化が問題となった。

ECMA規格となっているC++/CLIには、この問題を解決するための、現在の移譲コンストラクタと同じ機能があった。その経験を標準C++に取り入れることとなった。


##参照
- [N1581 Delegating Constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1581.pdf)
- [N1618 Delegating Constructors (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1618.pdf)
- [N1895 Delegating Constructors (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1895.pdf)
- [N1986 Delegating Constructors (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1986.pdf)

