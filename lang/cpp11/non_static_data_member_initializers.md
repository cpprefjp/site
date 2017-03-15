# 非静的メンバ変数の初期化
* cpp11[meta cpp]

## 概要
非静的メンバ変数の定義時に、`=`演算子もしくは`{ }`波カッコ初期化子によるコンストラクタ構文で、初期化式を記述できる。

```cpp
#include <string>
#include <cassert>

struct Person {
  int id = 3;
  std::string name = "Alice";
  std::string description { "Hello everyone." };
};

int main()
{
  Person p;

  assert(p.id == 3);
  assert(p.name == "Alice");
  assert(p.description == "Hello everyone.");
}
```
* assert[link /reference/cassert/assert.md]


## 仕様
- 非静的メンバ変数の初期化子としては、`=`演算子によるコンストラクタ呼び出し、および`{ }`波カッコ構文によるコンストラクタ呼び出しのみを許可する。`( )`丸カッコ構文によるコンストラクタ呼び出しは、メンバ関数の宣言と曖昧になるために許可しない
- 非静的メンバ変数の初期化子は、コンストラクタが呼び出された際に、メンバ変数の定義順に実行される
- 非静的メンバ変数の型に`auto`プレースホルダは使用できない
    - 初期化子の結果としてメンバ変数の型が決定される場合、引数依存の名前探索(ADL : Argument dependent lookup)および2段階名前探索(Two-phase lookup)が完了するまで型の決定を遅らせなければならず、クラスのデータレイアウトを決めることが難しくなる。また、ヘッダのインクルード順によって型が変わる可能性がある、という問題も発生するために、`auto`キーワードでの非静的メンバ変数の初期化は許可しない
- コンストラクタのメンバ初期化子で明示的にメンバ変数の初期化が行われた場合、そのメンバ変数に対する非静的メンバ変数の初期化子で指定した初期化処理は実行されない：

    ```cpp
class X {
  int id_ = 3;
  std::string data_ = "hello";
public:
  // id_は4で初期化され、data_は"hello"で初期化される。
  // 「id_ = 3」の初期化式は実行されない
  X() : id_(4) {}

  // id_はパラメータidで初期化され、data_は"world"で初期化される。
  // 「id_ = 3」の初期化式は実行されない。
  // 「data_ = "hello"」の初期化式は実行されない
  X(int id)
    : id_(id), data_("world") {}
};
```


## 参照
- [N1959 Class member initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1959.pdf)
- [N2354 Class member initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2354.htm)
- [N2426 Class member initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2426.htm)
- [N2628 Non-static data member initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2628.html)

