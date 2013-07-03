#enable_shared_from_this(C++11)
```cpp
namespace std {
  template <class T>
  class enable_shared_from_this;
}
```

##概要
`shared_ptr`で管理しているクラスで、`this`ポインタを他の関数へ渡したりする場合がある。このような場面では`this`ポインタを直接渡すことは避けたい。できれば`shared_ptr`にして渡したい。
しかし、`this`ポインタを単純に `shared_ptr<T>(this);` などとしてしまうと、参照カウントが増えず、`delete`が2重に呼ばれてしまいバグを引き起こす。この詳細はサンプルコードを見ていただきたい。
`enable_shared_from_this`クラステンプレートは、そのような場合において`this`ポインタを安全に`shared_ptr`へ変換するための`public`メンバ関数を提供する。
対象とするクラス`T`に対して、public基底クラス`enable_shared_from_this<T>`という形で使用する。

###protectedメンバ関数

| 名前 | 説明 |
|-----------------|----------------|
| `(constructor)` | コンストラクタ |
| `(destructor)`  | デストラクタ |
| `operator=`     | 代入演算子 |

###publicメンバ関数

| 名前 | 説明 |
|--------------------|----------------------------------------|
| `shared_from_this` | `this`ポインタを`shared_ptr`に変換する |


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

