#コンストラクタ
* future[meta header]
* std[meta namespace]
* future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
future() noexcept;                  // (1)
future(future&& rhs) noexcept;      // (2)
future(const future& rhs) = delete; // (3)
```

##futureオブジェクトの構築
- (1) : デフォルトコンストラクタ。共有状態を持たない空の`future`オブジェクトを生成する。
- (2) : ムーブコンストラクタ。`rhs`オブジェクトが持つ共有状態を`*this`に移動する。
- `future(const future& rhs) = delete;`<br/>コピーコンストラクタ。コピー不可。


##事後条件
- (1) : [`valid()`](/reference/future/future/valid.md) `== false`
- (2) :
    - [`valid()`](valid.md)が、この関数実行前の`rhs.`[`valid()`](/reference/future/future/valid.md)と等価になること。
    - `rhs.`[`valid()`](valid.md) `== false`になること。


##例
```cpp
#include <future>

int main()
{
  // デフォルト構築
  {
    std::future<int> f;
  }

  // ムーブ構築
  {
    std::promise<int> p;
    std::future<int> f = p.get_future();
  }
}
```
* std::promise[link /reference/future/promise.md]
* p.get_future()[link /reference/future/promise/get_future.md]

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


