#コンストラクタ
* future[meta header]
* std[meta namespace]
* shared_future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shared_future() noexcept;                    // (1)
shared_future(const shared_future& rhs);     // (2)
shared_future(future<R>&&) noexcept;         // (3)
shared_future(shared_future&& rhs) noexcept; // (4)
```
* future[link /reference/future/future.md]

##shared_futureオブジェクトの構築
- (1) : デフォルトコンストラクタ。共有状態を持たない空の`shared_future`オブジェクトを生成する。
- (2) : コピーコンストラクタ。`rhs`と同じ共有状態を参照する`shared_future`オブジェクトを生成する。
- (3), (4) : ムーブコンストラクタ。`rhs`の共有状態への参照を`*this`に移動して`shared_future`オブジェクトを生成する。


##事後条件
- (1) :  [`valid()`](valid.md) `== false`
- (2) : [`valid()`](valid.md) `== rhs.`[`valid()`](valid.md)
- (3), (4) :
    - [`valid()`](valid.md)が、この関数実行前の`rhs.`[`valid()`](valid.md)と等価になること。
    - `rhs.`[`valid()`](valid.md) `== false`になること。


##例
```cpp
#include <cassert>
#include <future>
#include <utility>

int main()
{
  // デフォルト構築
  {
    std::shared_future<int> f;
  }

  // コピー構築(同じ共有状態を参照する)
  {
    std::promise<int> p;

    std::shared_future<int> f1 = p.get_future().share();
    std::shared_future<int> f2 = f1; // コピー

    // 1つのpromiseによって書き込まれた結果値を、
    // 複数のshared_futureオブジェクトで読み取る
    p.set_value(3);

    assert(f1.get() == 3);
    assert(f2.get() == 3);
  }

  // ムーブ構築(共有状態の移動)
  {
    std::promise<int> p;

    // futureからshared_futureに共有状態を移動。
    // fは共有状態を持たなくなる
    std::future<int> f = p.get_future();
    std::shared_future<int> f1 = std::move(f);

    // shared_futureから共有状態を移動
    // f1は共有状態を持たなくなる
    std::shared_future<int> f2 = std::move(f1);

    p.set_value(3);

    assert(f2.get() == 3);
  }
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


