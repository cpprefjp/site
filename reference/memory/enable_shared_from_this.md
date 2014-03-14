#enable_shared_from_this(C++11)
```cpp
namespace std {
  template <class T>
  class enable_shared_from_this;
}
```

##概要
`enable_shared_from_this`は、[`shared_ptr`](/reference/memory/shared_ptr.md)で関しているオブジェクトの`this`ポインタを、[`shared_ptr`](/reference/memory/shared_ptr.md)として扱うことを可能にするためのクラスである。

`this`ポインタを単純に`shared_ptr<T>(this)`としてしまうと、参照カウントが増えず、`delete`が2重に呼ばれてしまいバグを引き起こすことになるため、そうならないようにこのクラスを使用して`this`を扱う。

このクラスは、[`shared_ptr`](/reference/memory/shared_ptr.md)として管理するクラスの基本クラスとして使用する。このクラスから派生したクラスでpublicメンバ関数[`shared_from_this()`](./enable_shared_from_this/shared_from_this.md)を使用することで、`this`を指す[`shared_ptr`](reference/memory/shared_ptr.md)オブジェクトを取得できる。

このクラスを継承する際には、このクラスのテンプレート引数として、派生クラス(このクラスを継承するクラス自身)を指定すること。(このようにテンプレート引数を指定する方法を、[CRTP:Curiously Recurring Template Pattern](http://ja.wikibooks.org/wiki/More_C%2B%2B_Idioms/奇妙に再帰したテンプレートパターン(Curiously_Recurring_Template_Pattern))と言う)


###protectedメンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------|----------------|-------|
| [`(constructor)`](./enable_shared_from_this/enable_shared_from_this.md) | コンストラクタ | C++11 |
| [`(destructor)`](./enable_shared_from_this/-enable_shared_from_this.md) | デストラクタ   | C++11 |
| [`operator=`](./enable_shared_from_this/op_assign.md)                   | 代入演算子     | C++11 |


###publicメンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|----------------------------------------|-------|
| [`shared_from_this`](./enable_shared_from_this/shared_from_this.md) | `this`ポインタを`shared_ptr`に変換する | C++11 |


###例
```cpp
#include <memory>
#include <iostream>

struct good : std::enable_shared_from_this<good> {
  ~good() {
    std::cout << "good::~good" << std::endl;
  }
 
  std::shared_ptr<good> get_ptr() {
    // GOOD: shared_from_thisメンバ関数にてshared_ptrを取得
    return shared_from_this();
  }
};

struct bad {
  ~bad() {
    std::cout << "bad::~bad" << std::endl;
  }
 
  std::shared_ptr<bad> get_ptr() {
    // BAD: thisポインタからshared_ptrを直接構築
    return std::shared_ptr<bad>(this);
  }
};
 
int main() {
  std::shared_ptr<good> gp0(new good());
  auto gp1(gp0->get_ptr());
 
  std::shared_ptr<bad> bp0(new bad());
  auto bp1(bp0->get_ptr());
 
  std::cout << "\'good\' use count = " << gp0.use_count() << std::endl;
  std::cout << "\'bad\'  use count = " << bp0.use_count() << std::endl;
} // glibc detected! double free corruption
```
* std::enable_shared_from_this[color ff0000]

###出力例
```
'good' use count = 2
'bad' use count = 1
bad::~bad
bad::~bad

*** glibc detected *** ./prog: double free or corruption (fasttop): 0x0000000 ***
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


###参照

