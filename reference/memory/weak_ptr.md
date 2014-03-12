#weak_ptr(C++11)
```cpp
namespace std {
  template <class T>
  class weak_ptr;
}
```

##概要
`shared_ptr`自身を保有する必要はないが、`shared_ptr`が管理するインスタンスが破棄された後にも参照する場合がある。その場合、`shared_ptr`が破棄されているのかを確認する術が欲しい。`weak_ptr`は、対象となる`shared_ptr`を監視し、`weak_ptr`から監視対象の`shared_ptr`の取得や、`shared_ptr`が全て破棄されインスタンスが無効化されたことの確認などができる。


###メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------|---------------------------------------|-------|
| [`(constructor)`](./weak_ptr/weak_ptr.md) | コンストラクタ | C++11 |
| [`(destructor)`](./weak_ptr/-weak_ptr.md) | デストラクタ   | C++11 |
| `operator=` | `weak_ptr`に新しい監視対象のオブジェクトを渡す。`weak_ptr`が渡された場合はその`shared_ptr`が監視する`shared_ptr`を監視する | C++11 |
| [`swap`](./weak_ptr/swap.md)           | 他の`weak_ptr`オブジェクトとデータを入れ替える                 | C++11 |
| [`reset`](./weak_ptr/reset.md)         | 監視対象をクリアする                                           | C++11 |
| [`use_count`](./weak_ptr/use_count.md) | 監視している`shared_ptr`オブジェクトの所有者数を取得する       | C++11 |
| [`expired`](./weak_ptr/expired.md)     | 監視している`shared_ptr`オブジェクトの寿命が切れたかを判定する | C++11 |
| [`lock`](./weak_ptr/lock.md)           | 監視している`shared_ptr`オブジェクトを取得する | C++11 |
| `owner_before` | `shared_ptr`で管理しているオブジェクトを連想コンテナで並べ替えるときに使用する | C++11 |


###メンバ型

| 名前           | 説明      | 対応バージョン |
|----------------|-----------|-------|
| `element_type` | 要素型`T` | C++11 |


###非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|-----------------------------------------|-------|
| [`swap`](./weak_ptr/swap_free.md) | 2つの`weak_ptr`オブジェクトを入れ替える | C++11 |


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

