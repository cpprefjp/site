#weak_ptr
```cpp
namespace std {
  template <class T>
  class weak_ptr;
}
```

##概要
`shared_ptr`自身を保有する必要はないが、`shared_ptr`が管理するインスタンスが破棄された後にも参照する場合がある。その場合、`shared_ptr`が破棄されているのかを確認する術が欲しい。`weak_ptr`は、対象となる`shared_ptr`を監視し、`weak_ptr`から監視対象の`shared_ptr`の取得や、`shared_ptr`が全て破棄されインスタンスが無効化されたことの確認などができる。


###メンバ関数

| | |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `(constructor)` | `weak_ptr`オブジェクトを構築する。デフォルトコンストラクタおよび空のオブジェクトが渡された場合は、空の`weak_ptr`を構築する。それ以外の場合は渡されたオブジェクトを監視する。`weak_ptr`が渡された場合はその`shared_ptr`が監視する`shared_ptr`を監視する。 |
| `(destructor)` | 監視している`shared_ptr`オブジェクトに特に影響を与えずに`weak_ptr`オブジェクトを破棄する |
| `operator=` | `weak_ptr`に新しい監視対象のオブジェクトを渡す。`weak_ptr`が渡された場合はその`shared_ptr`が監視する`shared_ptr`を監視する |
| `swap` | 他の`weak_ptr`オブジェクトと、データを入れ替える |
| `reset` | 再初期化する |
| `use_count` | 監視している`shared_ptr`オブジェクトの`use_count()`値を返す |
| `expired` | `use_count() == 0`の場合`true`、そうでなければ`false`を返す |
| `lock` | 監視対象の`shared_ptr`オブジェクトを取得する |
| `owner_before` | `shared_ptr`で管理しているオブジェクトを連想コンテナで並べ替えるときに使用する |


###メンバ型

| | |
|---------------------------|----------------------------------------------------|
| `element_type` | 管理するインスタンスの型`T` |


###非メンバ関数

| | |
|-------------------|------------------------------------------------------------------|
| `swap` | 2つの`weak_ptr`オブジェクトを入れ替える |


##例
```cpp
#include <memory>
#include <iostream>
 
int main() {
  auto sp1 = std::make_shared<int>(42);
 
  std::weak_ptr<int> wp = sp1;
 
  if(auto i = wp.lock()) {
    std::cout << "get weak_ptr value : " << *i << std::endl;
  }
 
  sp1.reset();
  if(wp.expired()) {
    std::cout << "shared_ptr managed object deleted." << std::endl;
  }
}
```

###出力
```
get weak_ptr value : 42
shared_ptr managed object deleted.
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0

###参照

